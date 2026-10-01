import { NextResponse } from 'next/server';

import { describeAgendaError, requireAgendaAdmin } from '@/lib/agenda/admin-server';
import { getGoogleCalendarDiagnostics } from '@/lib/agenda/google-calendar';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAgendaAdmin();
    return NextResponse.json(await getGoogleCalendarDiagnostics());
  } catch (error) {
    if (error instanceof Error && error.message === 'unauthorized') {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    console.error('[agenda-admin-google-calendar-status] failed', describeAgendaError(error));
    return NextResponse.json({ error: 'google_calendar_diagnostics_failed' }, { status: 500 });
  }
}
