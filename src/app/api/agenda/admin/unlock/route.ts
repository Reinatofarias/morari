import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function safeEqual(left: string, right: string) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

function cleanEnv(value: string | undefined) {
  return value?.trim().replace(/^['"]|['"]$/g, '');
}

function classifyUnexpected(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/invalid url|failed to parse url/i.test(message)) return 'invalid_supabase_url';
  if (/fetch failed|network|econnreset|etimedout|enotfound/i.test(message)) return 'supabase_connection_failed';
  return 'unexpected_server_error';
}

export async function POST(request: Request) {
  try {
    const { password } = (await request.json().catch(() => ({}))) as { password?: string };
    const expected = cleanEnv(process.env.ADMIN_PANEL_PASSWORD);
    const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const serviceKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
    const email = cleanEnv(process.env.ADMIN_PANEL_EMAIL) ?? 'painel@matheusmorari.com.br';

    if (!expected || !url || !serviceKey) {
      return NextResponse.json({ ok: false, reason: 'missing_config' });
    }

    if (!password || !safeEqual(password, expected)) {
      return NextResponse.json({ ok: false, reason: 'wrong_password' });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ ok: false, reason: 'invalid_supabase_url' });
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const existing = await supabase.auth.admin.listUsers();
    if (existing.error) {
      console.error('[agenda-admin-unlock] listUsers failed', existing.error.message);
      return NextResponse.json({ ok: false, reason: 'supabase_admin_key_invalid' });
    }

    let user = existing.data.users.find((item) => item.email?.toLowerCase() === email.toLowerCase()) ?? null;

    if (!user) {
      const created = await supabase.auth.admin.createUser({ email, email_confirm: true });
      if (created.error || !created.data.user) {
        console.error('[agenda-admin-unlock] createUser failed', created.error?.message);
        return NextResponse.json({ ok: false, reason: 'create_user_failed' });
      }
      user = created.data.user;
    }

    const currentRole = await supabase.from('user_roles').select('id').eq('user_id', user.id).eq('role', 'admin').maybeSingle();
    if (currentRole.error) {
      console.error('[agenda-admin-unlock] read role failed', currentRole.error.message);
      return NextResponse.json({ ok: false, reason: 'agenda_schema_missing' });
    }

    const role = currentRole.data ? { error: null } : await supabase.from('user_roles').insert({ user_id: user.id, role: 'admin' });
    if (role.error) {
      console.error('[agenda-admin-unlock] insert role failed', role.error.message);
      return NextResponse.json({ ok: false, reason: 'create_role_failed' });
    }

    const tempPassword = randomBytes(32).toString('base64url');
    const credentials = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true,
      password: tempPassword,
    });
    if (credentials.error) {
      console.error('[agenda-admin-unlock] update temporary password failed', credentials.error.message);
      return NextResponse.json({ ok: false, reason: 'temporary_password_failed' });
    }

    return NextResponse.json({ ok: true, email, tempPassword });
  } catch (error) {
    console.error('[agenda-admin-unlock] unexpected failure', error);
    return NextResponse.json({ ok: false, reason: classifyUnexpected(error) });
  }
}
