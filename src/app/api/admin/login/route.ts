import { NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, SESSION_COOKIE_NAME, createSessionToken } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, error: 'E-mail ou senha incorretos' },
        { status: 401 }
      );
    }

    const token = await createSessionToken(email);

    const response = NextResponse.json({ success: true, message: 'Autenticado com sucesso' });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
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
