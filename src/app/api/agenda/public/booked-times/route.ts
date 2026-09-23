import { NextResponse } from 'next/server';

import { describeAgendaError, getAgendaPublicClient, hhmm } from '@/lib/agenda/admin-server';
import { getGoogleCalendarBusyTimes } from '@/lib/agenda/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const date = new URL(request.url).searchParams.get('date');
    if (!date) return NextResponse.json({ error: 'invalid_date' }, { status: 400 });

    const { data, error } = await getAgendaPublicClient().rpc('booked_times', { p_date: date });
    if (error) {
      return NextResponse.json(
        { error: 'booked_times_rpc_failed', detail: describeAgendaError(error) },
        { status: 500 },
      );
    }
    const supabaseTimes = ((data as string[] | null) ?? []).map(hhmm);
    let google = { times: [] as string[] };
    try {
      google = await getGoogleCalendarBusyTimes(date);
    } catch (googleError) {
      console.error('[agenda-public-booked-times] Google Calendar busy lookup failed', googleError);
    }
    return NextResponse.json([...new Set([...supabaseTimes, ...google.times])].sort());
  } catch (error) {
    console.error('[agenda-public-booked-times] GET failed', error);
    return NextResponse.json({ error: 'booked_times_failed', detail: describeAgendaError(error) }, { status: 500 });
  }
}
