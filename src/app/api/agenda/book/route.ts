import { NextResponse } from 'next/server';

import { describeAgendaError, getAgendaAdminClient, getAgendaPublicClient, hhmm } from '@/lib/agenda/admin-server';
import { createGoogleCalendarEvent, isGoogleCalendarSlotBusy } from '@/lib/agenda/google-calendar';
import { fromMinutes, toMinutes } from '@/lib/agenda/time';
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

async function removeAppointmentAfterCalendarFailure(id: string) {
  try {
    const { error } = await getAgendaAdminClient().from('appointments').delete().eq('id', id);
    if (error) {
      console.error('[agenda-book] failed to rollback appointment after calendar sync failure', describeAgendaError(error));
    }
  } catch (error) {
    console.error('[agenda-book] rollback exception after calendar sync failure', describeAgendaError(error));
  }
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

    try {
      const googleSlot = await isGoogleCalendarSlotBusy(input.date, input.start, fromMinutes(toMinutes(input.start) + 60));
      if (googleSlot.configured && googleSlot.busy) {
        return NextResponse.json({ error: 'calendar_slot_busy' }, { status: 409 });
      }
    } catch (calendarError) {
      console.error('[agenda-book] Google Calendar busy lookup failed', describeAgendaError(calendarError));
    }

    const { data, error } = await getAgendaPublicClient().rpc('book_appointment', {
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

    try {
      const calendar = await createGoogleCalendarEvent(appointment);
      if (!calendar.configured || !calendar.created) {
        await removeAppointmentAfterCalendarFailure(appointment.id);
        return NextResponse.json({ error: 'google_calendar_not_configured', appointmentRolledBack: true }, { status: 503 });
      }

      return NextResponse.json({ appointment, calendar });
    } catch (calendarError) {
      console.error('[agenda-book] Google Calendar sync failed', describeAgendaError(calendarError));
      await removeAppointmentAfterCalendarFailure(appointment.id);
      return NextResponse.json(
        {
          error: 'google_calendar_sync_failed',
          reason: describeAgendaError(calendarError),
          appointmentRolledBack: true,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error('[agenda-book] failed', error);
    return NextResponse.json({ error: 'booking_failed' }, { status: 500 });
  }
}
