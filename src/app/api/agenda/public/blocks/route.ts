import { NextResponse } from 'next/server';

import { getAgendaPublicClient, hhmm } from '@/lib/agenda/admin-server';
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
    const { data, error } = await getAgendaPublicClient()
      .from('blocks')
      .select('id, date, all_day, start_time, end_time, reason')
      .order('date');
    if (error) throw error;
    return NextResponse.json((data ?? []).map(block));
  } catch (error) {
    console.error('[agenda-public-blocks] GET failed', error);
    return NextResponse.json(
      { error: 'blocks_failed', detail: error instanceof Error ? error.message : 'unknown_error' },
      { status: 500 },
    );
  }
}
