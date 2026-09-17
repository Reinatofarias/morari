import { useCallback, useEffect, useState } from "react";

/**
 * Fusos horários.
 *
 * O banco guarda cada agendamento como data + hora no fuso canônico
 * (America/Sao_Paulo). Isso representa UM único instante real. Na exibição,
 * o instante é convertido para o fuso do usuário usando timezone IANA —
 * nunca somando/subtraindo horas manualmente.
 */

export const CANONICAL_ZONE = "America/Sao_Paulo";

export interface ZoneOption {
  id: string;
  label: string;
  short: string;
}

export const BRAZIL_ZONES: ZoneOption[] = [
  { id: "America/Sao_Paulo", label: "Brasília (UTC−3)", short: "Brasília" },
  { id: "America/Porto_Velho", label: "Rondônia (UTC−4)", short: "Rondônia" },
  { id: "America/Rio_Branco", label: "Acre (UTC−5)", short: "Acre" },
];

const STORAGE_KEY = "mm-timezone";
const CHANGE_EVENT = "mm-timezone-change";

/** Deslocamento (em minutos) do fuso em relação ao UTC, num instante dado. */
function zoneOffsetMinutes(zone: string, instant: Date): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second"),
  );
  return (asUtc - Math.floor(instant.getTime() / 1000) * 1000) / 60000;
}

/** Converte "yyyy-MM-dd" + "HH:mm" de um fuso IANA para o instante real (UTC). */
export function zonedToUtc(dateKey: string, time: string, zone: string): Date {
  const [y, m, d] = dateKey.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0);
  let offset = zoneOffsetMinutes(zone, new Date(guess));
  let utc = guess - offset * 60000;
  offset = zoneOffsetMinutes(zone, new Date(utc));
  utc = guess - offset * 60000;
  return new Date(utc);
}

/** Converte um instante real para data/hora locais de um fuso IANA. */
export function utcToZoned(instant: Date, zone: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${hour}:${get("minute")}`,
  };
}

/** Mesma data/hora de parede convertida entre dois fusos IANA. */
export function convertWallTime(
  dateKey: string,
  time: string,
  from: string,
  to: string,
): { date: string; time: string } {
  if (from === to) return { date: dateKey, time };
  return utcToZoned(zonedToUtc(dateKey, time, from), to);
}

/** Converte um horário salvo (fuso canônico) para o fuso de exibição. */
export function toViewer(dateKey: string, time: string, zone: string) {
  const result = convertWallTime(dateKey, time, CANONICAL_ZONE, zone);
  return { ...result, sameDay: result.date === dateKey };
}

/** Converte um horário escolhido no fuso do usuário para o fuso canônico. */
export function toCanonical(dateKey: string, time: string, zone: string) {
  return convertWallTime(dateKey, time, zone, CANONICAL_ZONE);
}

export function zoneLabel(zone: string): string {
  return BRAZIL_ZONES.find((z) => z.id === zone)?.label ?? zone;
}

export function zoneShort(zone: string): string {
  return BRAZIL_ZONES.find((z) => z.id === zone)?.short ?? zone;
}

/** Hoje no fuso canônico (base de todas as datas salvas). */
export function canonicalToday(): string {
  return utcToZoned(new Date(), CANONICAL_ZONE).date;
}

/** Detecta o fuso do navegador e escolhe o fuso brasileiro correspondente. */
export function detectZone(): string {
  try {
    const browser = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BRAZIL_ZONES.some((z) => z.id === browser)) return browser;
    const now = new Date();
    const offset = zoneOffsetMinutes(browser, now);
    const match = BRAZIL_ZONES.find((z) => zoneOffsetMinutes(z.id, now) === offset);
    return match?.id ?? CANONICAL_ZONE;
  } catch {
    return CANONICAL_ZONE;
  }
}

function readStored(): string | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved && BRAZIL_ZONES.some((z) => z.id === saved) ? saved : null;
}

/**
 * Fuso ativo do usuário: detectado pelo navegador, com opção de ajuste manual.
 * A preferência é apenas de exibição — nenhum agendamento é guardado aqui.
 */
export function useTimezone() {
  const [zone, setZoneState] = useState<string>(CANONICAL_ZONE);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const stored = readStored();
    setManual(!!stored);
    setZoneState(stored ?? detectZone());
    const sync = () => {
      const next = readStored();
      setManual(!!next);
      setZoneState(next ?? detectZone());
    };
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
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

  return { zone, manual, setZone, resetZone, label: zoneLabel(zone), short: zoneShort(zone) };
}
