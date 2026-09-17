export type AppointmentStatus = 'confirmado' | 'cancelado' | 'concluido';
export type AppointmentKind = 'Atendimento' | 'Alinhamento' | 'Reunião';

export const APPOINTMENT_KINDS: AppointmentKind[] = ['Atendimento', 'Alinhamento', 'Reunião'];

export interface DayAvailability {
  weekday: number;
  enabled: boolean;
  start: string;
  end: string;
}

export interface Block {
  id: string;
  date: string;
  allDay: boolean;
  start: string;
  end: string;
  reason: string;
}

export interface Appointment {
  id: string;
  date: string;
  start: string;
  end: string;
  name: string;
  whatsapp: string;
  notes: string;
  kind: AppointmentKind;
  status: AppointmentStatus;
  createdAt: string;
}
