import { NextResponse } from 'next/server';

import { describeAgendaError, getAgendaPublicClient, hhmm } from '@/lib/agenda/admin-server';
import type { Block } from '@/lib/agenda/types';

export const dynamic = 'force-dynamic';

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
    const client = getAgendaPublicClient();
    const { data, error } = await client
      .from('blocks')
      .select('id, date, all_day, start_time, end_time, reason')
      .order('date');
    if (error) {
      return NextResponse.json({ error: 'blocks_select_failed', detail: describeAgendaError(error) }, { status: 500 });
    }
    return NextResponse.json((data ?? []).map(block));
  } catch (error) {
    console.error('[agenda-public-blocks] GET failed', error);
    return NextResponse.json({ error: 'blocks_failed', detail: describeAgendaError(error) }, { status: 500 });
  }
}
