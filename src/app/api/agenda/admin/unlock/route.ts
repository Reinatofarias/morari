import { createHash, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { AGENDA_ADMIN_COOKIE, cleanEnv, createAdminSessionValue } from '@/lib/agenda/admin-server';

function safeEqual(left: string, right: string) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const { password } = (await request.json().catch(() => ({}))) as { password?: string };
    const expected = cleanEnv(process.env.ADMIN_PANEL_PASSWORD);

    if (!expected) {
      return NextResponse.json({ ok: false, reason: 'missing_config' });
    }

    if (!password || !safeEqual(password, expected)) {
      return NextResponse.json({ ok: false, reason: 'wrong_password' });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(AGENDA_ADMIN_COOKIE, createAdminSessionValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (error) {
    console.error('[agenda-admin-unlock] unexpected failure', error);
    return NextResponse.json({ ok: false, reason: 'unexpected_server_error' });
  }
}
