import { NextResponse } from 'next/server';
import { getAgendaAdminClient, requireAgendaAdmin } from '@/lib/agenda/admin-server';
import { fromMinutes, toMinutes } from '@/lib/agenda/time';

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export async function POST(request: Request) {
  try {
    await requireAgendaAdmin();
    const { id, date, start } = (await request.json()) as { id?: string; date?: string; start?: string };
    if (!id || !date || !start) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });

    const supabase = getAgendaAdminClient();
    const end = fromMinutes(toMinutes(start) + 60);
    const { error } = await supabase
      .from('appointments')
      .update({ date, start_time: start, end_time: end, status: 'confirmado' })
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-reschedule] failed', error);
    return NextResponse.json({ error: 'reschedule_failed' }, { status: 500 });
  }
}
