'use client';

import { useCallback, useEffect, useState } from 'react';

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

async function adminJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new BookingError('Sessao expirada ou operacao nao autorizada.');
  return (await response.json()) as T;
}

async function jsonRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new BookingError(data.error ?? 'Operacao nao concluida.');
  return data;
}

async function read<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    throw error instanceof Error ? error : new BookingError('Nao foi possivel carregar a agenda.');
  }
}

export async function fetchAvailability(): Promise<DayAvailability[]> {
  return jsonRequest<DayAvailability[]>('/api/agenda/public/availability');
}

export async function fetchBlocks(): Promise<Block[]> {
  return jsonRequest<Block[]>('/api/agenda/public/blocks');
}

export async function fetchBookedTimes(date: string): Promise<string[]> {
  return jsonRequest<string[]>(`/api/agenda/public/booked-times?date=${encodeURIComponent(date)}`);
}

export async function fetchBookedTimesForDates(dates: string[]): Promise<Record<string, string[]>> {
  const entries = await Promise.all(dates.map(async (date) => [date, await fetchBookedTimes(date)] as const));
  return Object.fromEntries(entries);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  return adminJson<Appointment[]>('/api/agenda/admin/appointments');
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
  const result = await jsonRequest<{ appointment: Appointment }>('/api/agenda/book', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return result.appointment;
}

export async function setAppointmentStatus(id: string, status: AppointmentStatus) {
  await adminJson('/api/agenda/admin/appointments', {
    method: 'PATCH',
    body: JSON.stringify({ id, status }),
  });
}

export async function deleteAppointment(id: string) {
  await adminJson(`/api/agenda/admin/appointments?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function rescheduleAppointment(id: string, date: string, start: string) {
  await adminJson('/api/agenda/admin/appointments/reschedule', {
    method: 'POST',
    body: JSON.stringify({ id, date, start }),
  });
}

export async function saveAvailability(rows: DayAvailability[]) {
  await adminJson('/api/agenda/admin/availability', {
    method: 'PUT',
    body: JSON.stringify(rows),
  });
}

export async function addBlock(input: Omit<Block, 'id'>) {
  if (!input.allDay && toMinutes(input.end) <= toMinutes(input.start)) {
    throw new BookingError('O horario final deve ser maior que o inicial.');
  }
  await adminJson('/api/agenda/admin/blocks', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function removeBlock(id: string) {
  await adminJson(`/api/agenda/admin/blocks?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
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

export function useBookedTimesForDates(dates: string[]) {
  const key = dates.join('|');
  return useAsyncData(() => fetchBookedTimesForDates(dates), dates.length > 0, [key]);
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
