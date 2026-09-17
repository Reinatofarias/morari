import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { fromMinutes, toMinutes } from "./time";
import { CANONICAL_ZONE, canonicalToday, zonedToUtc } from "./timezone";
import type { Appointment, AppointmentKind, AppointmentStatus, Block, DayAvailability } from "./types";

/**
 * Camada de dados da agenda.
 *
 * Fonte única da verdade: banco de dados (Lovable Cloud).
 * Nenhum agendamento é guardado no navegador — localStorage/sessionStorage não
 * são usados em nenhum ponto deste fluxo.
 */

/** Duração interna do bloco de agenda (não é exibida ao cliente). */
export const SLOT_MINUTES = 60;

export class BookingError extends Error {}

const hhmm = (value: string) => value.slice(0, 5);

/* ------------------------------------------------------------------ *
 * Leituras
 * ------------------------------------------------------------------ */

export async function fetchAvailability(): Promise<DayAvailability[]> {
  const { data, error } = await supabase
    .from("availability")
    .select("weekday, enabled, start_time, end_time")
    .order("weekday");
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
    weekday: row.weekday,
    enabled: row.enabled,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
  }));
}

export async function fetchBlocks(): Promise<Block[]> {
  const { data, error } = await supabase
    .from("blocks")
    .select("id, date, all_day, start_time, end_time, reason")
    .order("date");
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    date: row.date,
    allDay: row.all_day,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    reason: row.reason ?? "",
  }));
}

export async function fetchBookedTimes(date: string): Promise<string[]> {
  const { data, error } = await supabase.rpc("booked_times", { p_date: date });
  if (error) throw new BookingError(error.message);
  return ((data as unknown as string[]) ?? []).map(hhmm);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("id, date, start_time, end_time, name, whatsapp, notes, kind, status, created_at")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    date: row.date,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    name: row.name,
    whatsapp: row.whatsapp,
    notes: row.notes ?? "",
    kind: ((row as { kind?: string }).kind ?? "Atendimento") as AppointmentKind,
    status: row.status as AppointmentStatus,
    createdAt: row.created_at,
  }));
}

/* ------------------------------------------------------------------ *
 * Slots
 * ------------------------------------------------------------------ */

export interface SlotInput {
  date: string;
  availability: DayAvailability[];
  blocks: Block[];
  booked: string[];
  /** id ignorado ao remarcar (mantém o horário atual selecionável) */
  keep?: string | undefined;
}

function isPast(date: string, start: string): boolean {
  // A data/hora salva é sempre do fuso canônico: comparamos instantes reais.
  return zonedToUtc(date, start, CANONICAL_ZONE).getTime() <= Date.now();
}

export interface DaySlot {
  time: string;
  available: boolean;
  /** motivo da indisponibilidade, quando houver */
  reason?: "ocupado" | "bloqueado" | "passado";
}

/** Todos os horários do dia, marcando quais estão livres, ocupados ou bloqueados. */
export function buildDaySlots({ date, availability, blocks, booked, keep }: SlotInput): DaySlot[] {
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).getDay();
  const day = availability.find((a) => a.weekday === weekday);
  if (!day || !day.enabled) return [];

  const dayBlocks = blocks.filter((b) => b.date === date);
  const dayEnd = toMinutes(day.end);
  const result: DaySlot[] = [];

  for (let cursor = toMinutes(day.start); cursor + SLOT_MINUTES <= dayEnd; cursor += SLOT_MINUTES) {
    const start = fromMinutes(cursor);
    const end = fromMinutes(cursor + SLOT_MINUTES);
    if (keep === start) {
      result.push({ time: start, available: true });
      continue;
    }
    if (booked.includes(start)) {
      result.push({ time: start, available: false, reason: "ocupado" });
      continue;
    }
    const blocked = dayBlocks.some(
      (b) => b.allDay || (toMinutes(start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(end)),
    );
    if (blocked) {
      result.push({ time: start, available: false, reason: "bloqueado" });
      continue;
    }
    if (isPast(date, start)) {
      result.push({ time: start, available: false, reason: "passado" });
      continue;
    }
    result.push({ time: start, available: true });
  }
  return result;
}

/** Horários livres ("HH:mm") de um dia, já descontando bloqueios e reservas. */
export function buildSlots({ date, availability, blocks, booked, keep }: SlotInput): string[] {
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).getDay();
  const day = availability.find((a) => a.weekday === weekday);
  if (!day || !day.enabled) return [];

  const dayBlocks = blocks.filter((b) => b.date === date);
  const dayEnd = toMinutes(day.end);
  const result: string[] = [];

  for (let cursor = toMinutes(day.start); cursor + SLOT_MINUTES <= dayEnd; cursor += SLOT_MINUTES) {
    const start = fromMinutes(cursor);
    const end = fromMinutes(cursor + SLOT_MINUTES);
    if (keep === start) {
      result.push(start);
      continue;
    }
    if (isPast(date, start)) continue;
    if (booked.includes(start)) continue;
    const blocked = dayBlocks.some(
      (b) => b.allDay || (toMinutes(start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(end)),
    );
    if (blocked) continue;
    result.push(start);
  }
  return result;
}

/* ------------------------------------------------------------------ *
 * Escritas
 * ------------------------------------------------------------------ */

export async function bookAppointment(input: {
  date: string;
  start: string;
  name: string;
  whatsapp: string;
  notes?: string | undefined;
  kind?: AppointmentKind | undefined;
}): Promise<Appointment> {
  const { data, error } = await supabase.rpc("book_appointment", {
    p_date: input.date,
    p_start: input.start,
    p_name: input.name,
    p_whatsapp: input.whatsapp,
    p_notes: input.notes ?? "",
    p_kind: input.kind ?? "Atendimento",
  });
  if (error) throw new BookingError(error.message);
  const row = (Array.isArray(data) ? data[0] : data) as {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    name: string;
    whatsapp: string;
    notes: string | null;
    kind: string | null;
    status: string;
    created_at: string;
  };
  if (!row) throw new BookingError("Não foi possível concluir o agendamento.");
  return {
    id: row.id,
    date: row.date,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    name: row.name,
    whatsapp: row.whatsapp,
    notes: row.notes ?? "",
    kind: (row.kind ?? "Atendimento") as AppointmentKind,
    status: row.status as AppointmentStatus,
    createdAt: row.created_at,
  };
}

export async function setAppointmentStatus(id: string, status: AppointmentStatus) {
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
  if (error) throw new BookingError(error.message);
}

export async function deleteAppointment(id: string) {
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw new BookingError(error.message);
}

export async function rescheduleAppointment(id: string, date: string, start: string) {
  const { error } = await supabase.rpc("reschedule_appointment", {
    p_id: id,
    p_date: date,
    p_start: start,
  });
  if (error) throw new BookingError(error.message);
}

export async function saveAvailability(rows: DayAvailability[]) {
  const { error } = await supabase.from("availability").upsert(
    rows.map((r) => ({
      weekday: r.weekday,
      enabled: r.enabled,
      start_time: r.start,
      end_time: r.end,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: "weekday" },
  );
  if (error) throw new BookingError(error.message);
}

export async function addBlock(input: Omit<Block, "id">) {
  if (!input.allDay && toMinutes(input.end) <= toMinutes(input.start)) {
    throw new BookingError("O horário final deve ser maior que o inicial.");
  }
  const { error } = await supabase.from("blocks").insert({
    date: input.date,
    all_day: input.allDay,
    start_time: input.allDay ? "00:00" : input.start,
    end_time: input.allDay ? "23:59" : input.end,
    reason: input.reason,
  });
  if (error) throw new BookingError(error.message);
}

export async function removeBlock(id: string) {
  const { error } = await supabase.from("blocks").delete().eq("id", id);
  if (error) throw new BookingError(error.message);
}

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */

export const keys = {
  availability: ["availability"] as const,
  blocks: ["blocks"] as const,
  appointments: ["appointments"] as const,
  booked: (date: string) => ["booked", date] as const,
};

export function useAvailability() {
  return useQuery({ queryKey: keys.availability, queryFn: fetchAvailability });
}

export function useBlocks() {
  return useQuery({ queryKey: keys.blocks, queryFn: fetchBlocks });
}

export function useAppointments() {
  return useQuery({ queryKey: keys.appointments, queryFn: fetchAppointments });
}

export function useBookedTimes(date: string | null) {
  return useQuery({
    queryKey: keys.booked(date ?? "none"),
    queryFn: () => fetchBookedTimes(date!),
    enabled: !!date,
  });
}

export function useRefreshAgenda() {
  const qc = useQueryClient();
  return () => {
    void qc.invalidateQueries({ queryKey: keys.appointments });
    void qc.invalidateQueries({ queryKey: ["booked"] });
    void qc.invalidateQueries({ queryKey: keys.blocks });
    void qc.invalidateQueries({ queryKey: keys.availability });
  };
}

export function useAgendaMutation<TArgs>(fn: (args: TArgs) => Promise<unknown>) {
  const refresh = useRefreshAgenda();
  return useMutation({ mutationFn: fn, onSuccess: () => refresh() });
}

/** Hoje segundo o fuso canônico da agenda. */
export function todayKey(): string {
  return canonicalToday();
}
