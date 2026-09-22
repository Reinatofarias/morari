import { NextResponse } from 'next/server';
import { AGENDA_ADMIN_COOKIE, hasAgendaAdminSession } from '@/lib/agenda/admin-server';

export async function GET() {
  return NextResponse.json({ isAdmin: await hasAgendaAdminSession() });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(AGENDA_ADMIN_COOKIE);
  return response;
}
