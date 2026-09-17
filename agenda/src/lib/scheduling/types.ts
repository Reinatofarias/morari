export type AppointmentStatus = "confirmado" | "cancelado" | "concluido";

/** Tipo de encontro escolhido pelo cliente. */
export type AppointmentKind = "Atendimento" | "Alinhamento" | "Reunião";

export const APPOINTMENT_KINDS: AppointmentKind[] = ["Atendimento", "Alinhamento", "Reunião"];

export interface DayAvailability {
  /** 0 = domingo ... 6 = sábado */
  weekday: number;
  enabled: boolean;
  /** "HH:mm" */
  start: string;
  /** "HH:mm" */
  end: string;
}

export interface Block {
  id: string;
  /** "yyyy-MM-dd" */
  date: string;
  allDay: boolean;
  start: string;
  end: string;
  reason: string;
}

export interface Appointment {
  id: string;
  /** "yyyy-MM-dd" */
  date: string;
  /** "HH:mm" */
  start: string;
  /** "HH:mm" */
  end: string;
  name: string;
  whatsapp: string;
  notes: string;
  kind: AppointmentKind;
  status: AppointmentStatus;
  createdAt: string;
}
