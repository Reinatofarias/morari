import { NextResponse } from 'next/server';

import { getAgendaAdminClient, hhmm } from '@/lib/agenda/admin-server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const date = new URL(request.url).searchParams.get('date');
    if (!date) return NextResponse.json({ error: 'invalid_date' }, { status: 400 });

    const { data, error } = await getAgendaAdminClient().rpc('booked_times', { p_date: date });
    if (error) throw error;
    return NextResponse.json(((data as string[] | null) ?? []).map(hhmm));
  } catch (error) {
    console.error('[agenda-public-booked-times] GET failed', error);
    return NextResponse.json({ error: 'booked_times_failed' }, { status: 500 });
  }
}
