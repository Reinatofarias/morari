import { NextResponse } from 'next/server';
import { getAgendaAdminClient, hhmm, requireAgendaAdmin } from '@/lib/agenda/admin-server';
import type { DayAvailability } from '@/lib/agenda/types';

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export async function GET() {
  try {
    await requireAgendaAdmin();
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
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-availability] GET failed', error);
    return NextResponse.json({ error: 'availability_failed' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAgendaAdmin();
    const rows = (await request.json()) as DayAvailability[];
    const { error } = await getAgendaAdminClient().from('availability').upsert(
      rows.map((row) => ({
        weekday: row.weekday,
        enabled: row.enabled,
        start_time: row.start,
        end_time: row.end,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'weekday' },
    );
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-availability] PUT failed', error);
    return NextResponse.json({ error: 'availability_save_failed' }, { status: 500 });
  }
}
