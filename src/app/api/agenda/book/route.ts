import { NextResponse } from 'next/server';

import { getAgendaAdminClient, hhmm } from '@/lib/agenda/admin-server';
import { createGoogleCalendarEvent } from '@/lib/agenda/google-calendar';
import type { Appointment, AppointmentKind, AppointmentStatus } from '@/lib/agenda/types';

export const runtime = 'nodejs';

function appointmentFromRow(row: any): Appointment {
  return {
    id: row.id,
    date: row.date,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    name: row.name,
    whatsapp: row.whatsapp,
    notes: row.notes ?? '',
    kind: (row.kind ?? 'Atendimento') as AppointmentKind,
    status: row.status as AppointmentStatus,
    createdAt: row.created_at,
  };
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as {
      date?: string;
      start?: string;
      name?: string;
      whatsapp?: string;
      notes?: string;
      kind?: AppointmentKind;
    };

    if (!input.date || !input.start || !input.name || !input.whatsapp) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    const { data, error } = await getAgendaAdminClient().rpc('book_appointment', {
      p_date: input.date,
      p_start: input.start,
      p_name: input.name,
      p_whatsapp: input.whatsapp,
      p_notes: input.notes ?? '',
      p_kind: input.kind ?? 'Atendimento',
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      return NextResponse.json({ error: 'booking_failed' }, { status: 500 });
    }

    const appointment = appointmentFromRow(row);
    let calendar = { configured: false, created: false };

    try {
      calendar = await createGoogleCalendarEvent(appointment);
    } catch (calendarError) {
      console.error('[agenda-book] Google Calendar sync failed', calendarError);
    }

    return NextResponse.json({ appointment, calendar });
  } catch (error) {
    console.error('[agenda-book] failed', error);
    return NextResponse.json({ error: 'booking_failed' }, { status: 500 });
  }
}
