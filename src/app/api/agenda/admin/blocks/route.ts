import { NextResponse } from 'next/server';
import { getAgendaAdminClient, hhmm, requireAgendaAdmin } from '@/lib/agenda/admin-server';
import type { Block } from '@/lib/agenda/types';

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

function block(row: any): Block {
  return {
    id: row.id,
    date: row.date,
    allDay: row.all_day,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    reason: row.reason ?? '',
  };
}

export async function GET() {
  try {
    await requireAgendaAdmin();
    const { data, error } = await getAgendaAdminClient()
      .from('blocks')
      .select('id, date, all_day, start_time, end_time, reason')
      .order('date');
    if (error) throw error;
    return NextResponse.json((data ?? []).map(block));
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-blocks] GET failed', error);
    return NextResponse.json({ error: 'blocks_failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAgendaAdmin();
    const input = (await request.json()) as Omit<Block, 'id'>;
    const { error } = await getAgendaAdminClient().from('blocks').insert({
      date: input.date,
      all_day: input.allDay,
      start_time: input.allDay ? '00:00' : input.start,
      end_time: input.allDay ? '23:59' : input.end,
      reason: input.reason,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-blocks] POST failed', error);
    return NextResponse.json({ error: 'block_create_failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAgendaAdmin();
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    const { error } = await getAgendaAdminClient().from('blocks').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-blocks] DELETE failed', error);
    return NextResponse.json({ error: 'block_delete_failed' }, { status: 500 });
  }
}
