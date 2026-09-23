import { NextResponse } from 'next/server';

import { getAgendaConfigState } from '@/lib/agenda/admin-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getAgendaConfigState());
}
