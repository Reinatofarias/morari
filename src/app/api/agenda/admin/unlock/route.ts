import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function safeEqual(left: string, right: string) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const email = process.env.ADMIN_PANEL_EMAIL ?? 'painel@matheusmorari.com.br';

  if (!expected || !url || !serviceKey) {
    return NextResponse.json({ ok: false, reason: 'missing_config' }, { status: 500 });
  }

  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existing } = await supabase.auth.admin.listUsers();
  let user = existing.users.find((item) => item.email?.toLowerCase() === email.toLowerCase()) ?? null;

  if (!user) {
    const created = await supabase.auth.admin.createUser({ email, email_confirm: true });
    if (created.error || !created.data.user) {
      return NextResponse.json({ ok: false, reason: created.error?.message ?? 'create_user_failed' }, { status: 500 });
    }
    user = created.data.user;
  }

  const role = await supabase.from('user_roles').upsert({ user_id: user.id, role: 'admin' }, { onConflict: 'user_id,role' });
  if (role.error) {
    return NextResponse.json({ ok: false, reason: role.error.message }, { status: 500 });
  }

  const link = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
  });
  if (link.error || !link.data.properties?.hashed_token) {
    return NextResponse.json({ ok: false, reason: link.error?.message ?? 'magiclink_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, email, tokenHash: link.data.properties.hashed_token });
}
