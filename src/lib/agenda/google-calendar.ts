import { createSign } from 'crypto';

import { cleanEnv } from '@/lib/agenda/admin-server';
import type { Appointment } from '@/lib/agenda/types';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_CALENDAR_TIMEZONE = 'America/Sao_Paulo';

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
