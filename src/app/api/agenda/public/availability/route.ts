import { NextResponse } from 'next/server';

import { describeAgendaError, getAgendaPublicClient, hhmm } from '@/lib/agenda/admin-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = getAgendaPublicClient();
    const { data, error } = await client
      .from('availability')
      .select('weekday, enabled, start_time, end_time')
      .order('weekday');
    if (error) {
      return NextResponse.json(
        { error: 'availability_select_failed', detail: describeAgendaError(error) },
        { status: 500 },
      );
    }
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
    return NextResponse.json({ error: 'availability_failed', detail: describeAgendaError(error) }, { status: 500 });
  }
}
