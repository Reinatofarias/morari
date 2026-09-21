import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function safeEqual(left: string, right: string) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const { password } = (await request.json().catch(() => ({}))) as { password?: string };
    const expected = process.env.ADMIN_PANEL_PASSWORD;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const email = process.env.ADMIN_PANEL_EMAIL ?? 'painel@matheusmorari.com.br';

    if (!expected || !url || !serviceKey) {
      return NextResponse.json({ ok: false, reason: 'missing_config' });
    }

    if (!password || !safeEqual(password, expected)) {
      return NextResponse.json({ ok: false, reason: 'wrong_password' });
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

    const link = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });
    if (link.error || !link.data.properties?.hashed_token) {
      console.error('[agenda-admin-unlock] generateLink failed', link.error?.message);
      return NextResponse.json({ ok: false, reason: 'magiclink_failed' });
    }

    return NextResponse.json({ ok: true, email, tokenHash: link.data.properties.hashed_token });
  } catch (error) {
    console.error('[agenda-admin-unlock] unexpected failure', error);
    return NextResponse.json({ ok: false, reason: 'unexpected_server_error' });
  }
}
