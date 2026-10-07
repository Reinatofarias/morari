import { NextResponse } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  checkAdminCredentials,
  createSessionToken,
  getAdminEmail,
  isAdminLoginConfigured,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    if (!isAdminLoginConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Login não configurado. Defina ADMIN_PASSWORD nas variáveis de ambiente da Vercel.' },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { email, password } = body as { email?: unknown; password?: unknown };

    if (!checkAdminCredentials(email, password)) {
      // Pequeno atraso para dificultar tentativas em massa.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json(
        { success: false, error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    const token = createSessionToken(getAdminEmail());

    const response = NextResponse.json({ success: true, message: 'Autenticado com sucesso' });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar login' },
      { status: 500 }
    );
  }
}
