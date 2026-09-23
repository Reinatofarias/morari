import { createSign } from 'crypto';

import { cleanEnv } from '@/lib/agenda/admin-server';
import { fromDateKey, fromMinutes, toDateKey, toMinutes } from '@/lib/agenda/time';
import type { Appointment } from '@/lib/agenda/types';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_CALENDAR_TIMEZONE = 'America/Sao_Paulo';
const SLOT_MINUTES = 60;

type GoogleCredentials = {
  clientEmail: string;
  privateKey: string;
  privateKeyId?: string;
};

type GoogleOAuthCredentials = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function readServiceAccountCredentials(): GoogleCredentials | null {
  const rawJson = cleanEnv(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  if (rawJson) {
    const parsed = JSON.parse(rawJson) as {
      client_email?: string;
      private_key?: string;
      private_key_id?: string;
    };
    if (parsed.client_email && parsed.private_key) {
      return {
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key.replace(/\\n/g, '\n'),
        privateKeyId: parsed.private_key_id,
      };
    }
  }

  const clientEmail = cleanEnv(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  const privateKey = cleanEnv(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)?.replace(/\\n/g, '\n');
  const privateKeyId = cleanEnv(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID);

  if (!clientEmail || !privateKey) return null;
  return { clientEmail, privateKey, privateKeyId };
}

function readOAuthCredentials(): GoogleOAuthCredentials | null {
  const clientId = cleanEnv(process.env.GOOGLE_CLIENT_ID);
  const clientSecret = cleanEnv(process.env.GOOGLE_CLIENT_SECRET);
  const refreshToken = cleanEnv(process.env.GOOGLE_REFRESH_TOKEN);

  if (!clientId || !clientSecret || !refreshToken) return null;
  return { clientId, clientSecret, refreshToken };
}

async function getServiceAccountAccessToken(credentials: GoogleCredentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
    ...(credentials.privateKeyId ? { kid: credentials.privateKeyId } : {}),
  };
  const claimSet = {
    iss: credentials.clientEmail,
    scope: GOOGLE_CALENDAR_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claimSet))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${base64url(signer.sign(credentials.privateKey))}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description ?? data.error ?? 'google_token_failed');
  }

  return data.access_token;
}

async function getOAuthAccessToken(credentials: GoogleOAuthCredentials) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      refresh_token: credentials.refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = (await response.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description ?? data.error ?? 'google_oauth_token_failed');
  }

  return data.access_token;
}

async function getAccessToken() {
  const oauthCredentials = readOAuthCredentials();
  if (oauthCredentials) {
    return getOAuthAccessToken(oauthCredentials);
  }

  const serviceAccountCredentials = readServiceAccountCredentials();
  if (serviceAccountCredentials) {
    return getServiceAccountAccessToken(serviceAccountCredentials);
  }

  return null;
}

function nextDateKey(date: string) {
  const next = fromDateKey(date);
  next.setDate(next.getDate() + 1);
  return toDateKey(next);
}

function eventDateTime(value: { date?: string; dateTime?: string } | undefined) {
  if (!value) return null;
  if (value.dateTime) return value.dateTime;
  if (value.date) return `${value.date}T00:00:00${GOOGLE_CALENDAR_TIMEZONE === 'America/Sao_Paulo' ? '-03:00' : ''}`;
  return null;
}

function zonedDateTime(instant: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: GOOGLE_CALENDAR_TIMEZONE,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(instant);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
  const hour = get('hour') === '24' ? '00' : get('hour');
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${hour}:${get('minute')}` };
}

function minutesInsideDate(instant: Date, date: string, edge: 'start' | 'end') {
  const local = zonedDateTime(instant);
  if (local.date < date) return 0;
  if (local.date > date) return 24 * 60;
  if (edge === 'end' && local.time === '00:00') return 24 * 60;
  return toMinutes(local.time);
}

function busyRangeToSlots(date: string, start: string, end: string) {
  const startAt = new Date(start);
  const endAt = new Date(end);
  if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime())) return [];

  const startMinute = minutesInsideDate(startAt, date, 'start');
  const endMinute = minutesInsideDate(endAt, date, 'end');
  const slots = new Set<string>();

  for (let cursor = Math.floor(startMinute / SLOT_MINUTES) * SLOT_MINUTES; cursor < endMinute; cursor += SLOT_MINUTES) {
    if (cursor >= 0 && cursor < 24 * 60) slots.add(fromMinutes(cursor));
  }

  return [...slots];
}

export async function getGoogleCalendarBusyTimes(date: string) {
  const calendarId = cleanEnv(process.env.GOOGLE_CALENDAR_ID);
  const token = await getAccessToken();

  if (!calendarId || !token) {
    return { configured: false, times: [] as string[] };
  }

  const params = new URLSearchParams({
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: `${date}T00:00:00-03:00`,
    timeMax: `${nextDateKey(date)}T00:00:00-03:00`,
    maxResults: '250',
  });

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`,
    { headers: { authorization: `Bearer ${token}` } },
  );

  const data = (await response.json()) as {
    items?: Array<{
      status?: string;
      transparency?: string;
      start?: { date?: string; dateTime?: string };
      end?: { date?: string; dateTime?: string };
    }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(data.error?.message ?? 'google_calendar_busy_failed');
  }

  const times = new Set<string>();
  for (const event of data.items ?? []) {
    if (event.status === 'cancelled' || event.transparency === 'transparent') continue;
    const start = eventDateTime(event.start);
    const end = eventDateTime(event.end);
    if (!start || !end) continue;
    for (const slot of busyRangeToSlots(date, start, end)) {
      times.add(slot);
    }
  }

  return { configured: true, times: [...times].sort() };
}

export async function isGoogleCalendarSlotBusy(date: string, start: string, end: string) {
  const busy = await getGoogleCalendarBusyTimes(date);
  if (!busy.configured) return { configured: false, busy: false };
  const startMinute = toMinutes(start);
  const endMinute = toMinutes(end);
  return {
    configured: true,
    busy: busy.times.some((time) => {
      const busyStart = toMinutes(time);
      const busyEnd = busyStart + SLOT_MINUTES;
      return startMinute < busyEnd && busyStart < endMinute;
    }),
  };
}

export async function createGoogleCalendarEvent(appointment: Appointment) {
  const calendarId = cleanEnv(process.env.GOOGLE_CALENDAR_ID);
  const token = await getAccessToken();

  if (!calendarId || !token) {
    return { configured: false, created: false };
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        summary: `${appointment.kind} - ${appointment.name}`,
        description: [
          `Nome: ${appointment.name}`,
          `WhatsApp: ${appointment.whatsapp}`,
          `Tipo: ${appointment.kind}`,
          appointment.notes ? `Observacao: ${appointment.notes}` : null,
          '',
          `Origem: matheusmorari.com.br/agenda`,
          `ID do agendamento: ${appointment.id}`,
        ]
          .filter(Boolean)
          .join('\n'),
        start: {
          dateTime: `${appointment.date}T${appointment.start}:00`,
          timeZone: GOOGLE_CALENDAR_TIMEZONE,
        },
        end: {
          dateTime: `${appointment.date}T${appointment.end}:00`,
          timeZone: GOOGLE_CALENDAR_TIMEZONE,
        },
        transparency: 'opaque',
        extendedProperties: {
          private: {
            appointmentId: appointment.id,
            source: 'matheusmorari-site',
          },
        },
      }),
    },
  );

  const data = (await response.json()) as { id?: string; htmlLink?: string; error?: { message?: string } };
  if (!response.ok) {
    throw new Error(data.error?.message ?? 'google_calendar_event_failed');
  }

  return { configured: true, created: true, id: data.id, htmlLink: data.htmlLink };
}
