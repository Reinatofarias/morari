import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logout realizado' });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
