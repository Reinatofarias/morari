'use client';

import { useCallback, useEffect, useState } from 'react';

export const CANONICAL_ZONE = 'America/Sao_Paulo';

export const BRAZIL_ZONES = [
  { id: 'America/Sao_Paulo', label: 'Brasília (UTC-3)', short: 'Brasília' },
  { id: 'America/Porto_Velho', label: 'Rondônia (UTC-4)', short: 'Rondônia' },
  { id: 'America/Rio_Branco', label: 'Acre (UTC-5)', short: 'Acre' },
];

const STORAGE_KEY = 'mm-timezone';
const CHANGE_EVENT = 'mm-timezone-change';

function zoneOffsetMinutes(zone: string, instant: Date): number {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
  return (asUtc - Math.floor(instant.getTime() / 1000) * 1000) / 60000;
}

export function zonedToUtc(dateKey: string, time: string, zone: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const guess = Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0);
  let offset = zoneOffsetMinutes(zone, new Date(guess));
  let utc = guess - offset * 60000;
  offset = zoneOffsetMinutes(zone, new Date(utc));
  utc = guess - offset * 60000;
  return new Date(utc);
}

export function utcToZoned(instant: Date, zone: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  const hour = get('hour') === '24' ? '00' : get('hour');
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${hour}:${get('minute')}` };
}

function convertWallTime(dateKey: string, time: string, from: string, to: string) {
  if (from === to) return { date: dateKey, time };
  return utcToZoned(zonedToUtc(dateKey, time, from), to);
}

export function toViewer(dateKey: string, time: string, zone: string) {
  const result = convertWallTime(dateKey, time, CANONICAL_ZONE, zone);
  return { ...result, sameDay: result.date === dateKey };
}

export function zoneLabel(zone: string): string {
  return BRAZIL_ZONES.find((z) => z.id === zone)?.label ?? zone;
}

export function canonicalToday(): string {
  return utcToZoned(new Date(), CANONICAL_ZONE).date;
}

function detectZone(): string {
  try {
    const browser = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BRAZIL_ZONES.some((z) => z.id === browser)) return browser;
    const now = new Date();
    const offset = zoneOffsetMinutes(browser, now);
    return BRAZIL_ZONES.find((z) => zoneOffsetMinutes(z.id, now) === offset)?.id ?? CANONICAL_ZONE;
  } catch {
    return CANONICAL_ZONE;
  }
}

function readStored(): string | null {
  if (typeof window === 'undefined') return null;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved && BRAZIL_ZONES.some((z) => z.id === saved) ? saved : null;
}

export function useTimezone() {
  const [zone, setZoneState] = useState(CANONICAL_ZONE);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = readStored();
      setManual(!!next);
      setZoneState(next ?? detectZone());
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const setZone = useCallback((next: string) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const resetZone = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return {
    zone,
    manual,
    setZone,
    resetZone,
    label: zoneLabel(zone),
    short: BRAZIL_ZONES.find((z) => z.id === zone)?.short ?? zone,
  };
}
