import { NextResponse } from 'next/server';

import { getAgendaAdminClient, hhmm } from '@/lib/agenda/admin-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await getAgendaAdminClient()
      .from('availability')
      .select('weekday, enabled, start_time, end_time')
      .order('weekday');
    if (error) throw error;
    return NextResponse.json(
      (data ?? []).map((row) => ({
        weekday: row.weekday,
        enabled: row.enabled,
        start: hhmm(row.start_time),
        end: hhmm(row.end_time),
      })),
    );
  } catch (error) {
    console.error('[agenda-public-availability] GET failed', error);
    return NextResponse.json({ error: 'availability_failed' }, { status: 500 });
  }
}
