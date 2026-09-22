import { NextResponse } from 'next/server';
import { getAgendaAdminClient, hhmm, requireAgendaAdmin } from '@/lib/agenda/admin-server';
import type { AppointmentKind, AppointmentStatus } from '@/lib/agenda/types';

function appointment(row: any) {
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

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export async function GET() {
  try {
    await requireAgendaAdmin();
    const { data, error } = await getAgendaAdminClient()
      .from('appointments')
      .select('id, date, start_time, end_time, name, whatsapp, notes, kind, status, created_at')
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });
    if (error) throw error;
    return NextResponse.json((data ?? []).map(appointment));
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-appointments] GET failed', error);
    return NextResponse.json({ error: 'appointments_failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAgendaAdmin();
    const { id, status } = (await request.json()) as { id?: string; status?: AppointmentStatus };
    if (!id || !status) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    const { error } = await getAgendaAdminClient().from('appointments').update({ status }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-appointments] PATCH failed', error);
    return NextResponse.json({ error: 'appointment_update_failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAgendaAdmin();
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    const { error } = await getAgendaAdminClient().from('appointments').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    if ((error as Error).message === 'unauthorized') return unauthorized();
    console.error('[agenda-admin-appointments] DELETE failed', error);
    return NextResponse.json({ error: 'appointment_delete_failed' }, { status: 500 });
  }
}
