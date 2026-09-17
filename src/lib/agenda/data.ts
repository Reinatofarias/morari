'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAgendaSupabase } from '@/lib/agenda/supabase-client';
import { fromMinutes, toMinutes } from '@/lib/agenda/time';
import { CANONICAL_ZONE, canonicalToday, zonedToUtc } from '@/lib/agenda/timezone';
import type { Appointment, AppointmentKind, AppointmentStatus, Block, DayAvailability } from '@/lib/agenda/types';

export const SLOT_MINUTES = 60;

export class BookingError extends Error {}

export type AsyncState<T> = {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const hhmm = (value: string) => value.slice(0, 5);

async function read<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    throw error instanceof Error ? error : new BookingError('Nao foi possivel carregar a agenda.');
  }
}

export async function fetchAvailability(): Promise<DayAvailability[]> {
  const { data, error } = await getAgendaSupabase()
    .from('availability')
    .select('weekday, enabled, start_time, end_time')
    .order('weekday');
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
    weekday: row.weekday,
    enabled: row.enabled,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
  }));
}

export async function fetchBlocks(): Promise<Block[]> {
  const { data, error } = await getAgendaSupabase()
    .from('blocks')
    .select('id, date, all_day, start_time, end_time, reason')
    .order('date');
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    date: row.date,
    allDay: row.all_day,
    start: hhmm(row.start_time),
    end: hhmm(row.end_time),
    reason: row.reason ?? '',
  }));
}

export async function fetchBookedTimes(date: string): Promise<string[]> {
  const { data, error } = await getAgendaSupabase().rpc('booked_times', { p_date: date });
  if (error) throw new BookingError(error.message);
  return ((data as string[] | null) ?? []).map(hhmm);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await getAgendaSupabase()
    .from('appointments')
    .select('id, date, start_time, end_time, name, whatsapp, notes, kind, status, created_at')
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });
  if (error) throw new BookingError(error.message);
  return (data ?? []).map((row) => ({
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
  }));
}

export interface SlotInput {
  date: string;
  availability: DayAvailability[];
  blocks: Block[];
  booked: string[];
  keep?: string;
}

export interface DaySlot {
  time: string;
  available: boolean;
  reason?: 'ocupado' | 'bloqueado' | 'passado';
}

function isPast(date: string, start: string): boolean {
  return zonedToUtc(date, start, CANONICAL_ZONE).getTime() <= Date.now();
}

export function buildDaySlots({ date, availability, blocks, booked, keep }: SlotInput): DaySlot[] {
  const [y, m, d] = date.split('-').map(Number);
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
      result.push({ time: start, available: false, reason: 'ocupado' });
      continue;
    }
    const blocked = dayBlocks.some(
      (b) => b.allDay || (toMinutes(start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(end)),
    );
    if (blocked) {
      result.push({ time: start, available: false, reason: 'bloqueado' });
      continue;
    }
    if (isPast(date, start)) {
      result.push({ time: start, available: false, reason: 'passado' });
      continue;
    }
    result.push({ time: start, available: true });
  }
  return result;
}

export function buildSlots(input: SlotInput): string[] {
  return buildDaySlots(input)
    .filter((slot) => slot.available)
    .map((slot) => slot.time);
}

export async function bookAppointment(input: {
  date: string;
  start: string;
  name: string;
  whatsapp: string;
  notes?: string;
  kind?: AppointmentKind;
}): Promise<Appointment> {
  const { data, error } = await getAgendaSupabase().rpc('book_appointment', {
    p_date: input.date,
    p_start: input.start,
    p_name: input.name,
    p_whatsapp: input.whatsapp,
    p_notes: input.notes ?? '',
    p_kind: input.kind ?? 'Atendimento',
  });
  if (error) throw new BookingError(error.message);
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new BookingError('Nao foi possivel concluir o agendamento.');
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

export async function setAppointmentStatus(id: string, status: AppointmentStatus) {
  const { error } = await getAgendaSupabase().from('appointments').update({ status }).eq('id', id);
  if (error) throw new BookingError(error.message);
}

export async function deleteAppointment(id: string) {
  const { error } = await getAgendaSupabase().from('appointments').delete().eq('id', id);
  if (error) throw new BookingError(error.message);
}

export async function rescheduleAppointment(id: string, date: string, start: string) {
  const { error } = await getAgendaSupabase().rpc('reschedule_appointment', {
    p_id: id,
    p_date: date,
    p_start: start,
  });
  if (error) throw new BookingError(error.message);
}

export async function saveAvailability(rows: DayAvailability[]) {
  const { error } = await getAgendaSupabase().from('availability').upsert(
    rows.map((row) => ({
      weekday: row.weekday,
      enabled: row.enabled,
      start_time: row.start,
      end_time: row.end,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: 'weekday' },
  );
  if (error) throw new BookingError(error.message);
}

export async function addBlock(input: Omit<Block, 'id'>) {
  if (!input.allDay && toMinutes(input.end) <= toMinutes(input.start)) {
    throw new BookingError('O horario final deve ser maior que o inicial.');
  }
  const { error } = await getAgendaSupabase().from('blocks').insert({
    date: input.date,
    all_day: input.allDay,
    start_time: input.allDay ? '00:00' : input.start,
    end_time: input.allDay ? '23:59' : input.end,
    reason: input.reason,
  });
  if (error) throw new BookingError(error.message);
}

export async function removeBlock(id: string) {
  const { error } = await getAgendaSupabase().from('blocks').delete().eq('id', id);
  if (error) throw new BookingError(error.message);
}

function useAsyncData<T>(loader: () => Promise<T>, enabled: boolean, deps: readonly unknown[]): AsyncState<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(enabled);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    if (!enabled) return;
    setIsFetching(true);
    setError(null);
    try {
      setData(await read(loader));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Falha ao carregar.'));
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [enabled, ...deps]);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    void refetch();
  }, [refetch, enabled]);

  return { data, isLoading, isFetching, isError: !!error, error, refetch };
}

export function useAvailability() {
  return useAsyncData(fetchAvailability, true, []);
}

export function useBlocks() {
  return useAsyncData(fetchBlocks, true, []);
}

export function useAppointments() {
  return useAsyncData(fetchAppointments, true, []);
}

export function useBookedTimes(date: string | null) {
  return useAsyncData(() => fetchBookedTimes(date ?? ''), !!date, [date]);
}

export function useAgendaMutation<TArgs, TResult>(
  fn: (args: TArgs) => Promise<TResult>,
): {
  isPending: boolean;
  mutate: (
    args: TArgs,
    callbacks?: { onSuccess?: (result: TResult) => void; onError?: (error: Error) => void },
  ) => Promise<void>;
} {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    async (args: TArgs, callbacks?: { onSuccess?: (result: TResult) => void; onError?: (error: Error) => void }) => {
      setIsPending(true);
      try {
        const result = await fn(args);
        callbacks?.onSuccess?.(result);
      } catch (error) {
        callbacks?.onError?.(error instanceof Error ? error : new Error('Operacao nao concluida.'));
      } finally {
        setIsPending(false);
      }
    },
    [fn],
  );

  return { isPending, mutate };
}

export function todayKey(): string {
  return canonicalToday();
}
