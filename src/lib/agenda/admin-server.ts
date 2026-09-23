import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export const AGENDA_ADMIN_COOKIE = 'mm_agenda_admin';

export function cleanEnv(value: string | undefined) {
  return value?.trim().replace(/^['"]|['"]$/g, '');
}

function supabaseUrl() {
  return cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? cleanEnv(process.env.SUPABASE_URL);
}

function serviceRoleKey() {
  return (
    cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ??
    cleanEnv(process.env.SUPABASE_SERVICE_KEY) ??
    cleanEnv(process.env.SUPABASE_SECRET_KEY)
  );
}

function publishableKey() {
  return (
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ??
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ??
    cleanEnv(process.env.SUPABASE_PUBLISHABLE_KEY) ??
    cleanEnv(process.env.SUPABASE_ANON_KEY) ??
    cleanEnv(process.env.VITE_SUPABASE_PUBLISHABLE_KEY) ??
    cleanEnv(process.env.VITE_SUPABASE_ANON_KEY)
  );
}

function sessionSecret() {
  return `${cleanEnv(process.env.ADMIN_PANEL_PASSWORD) ?? ''}:${serviceRoleKey() ?? ''}`;
}

function sign(value: string) {
  return createHmac('sha256', sessionSecret()).update(value).digest('hex');
}

export function createAdminSessionValue() {
  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const payload = `${expires}.${randomUUID()}`;
  return `${payload}.${sign(payload)}`;
}

export async function hasAgendaAdminSession() {
  const store = await cookies();
  const value = store.get(AGENDA_ADMIN_COOKIE)?.value;
  if (!value) return false;

  const parts = value.split('.');
  if (parts.length !== 3) return false;

  const [expires, nonce, signature] = parts;
  const payload = `${expires}.${nonce}`;
  if (!expires || !nonce || !signature || Number(expires) <= Date.now()) return false;

  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function getAgendaAdminClient() {
  const url = supabaseUrl();
  const key = serviceRoleKey();
  if (!url || !key) throw new Error('missing_supabase_config');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getAgendaPublicClient() {
  const url = supabaseUrl();
  const key = publishableKey() ?? serviceRoleKey();
  if (!url || !key) throw new Error('missing_supabase_public_config');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getAgendaConfigState() {
  return {
    hasSupabaseUrl: !!supabaseUrl(),
    hasPublishableKey: !!publishableKey(),
    hasServiceRoleKey: !!serviceRoleKey(),
  };
}

export function describeAgendaError(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const record = error as { message?: unknown; code?: unknown; details?: unknown; hint?: unknown };
    const detail = {
      message: typeof record.message === 'string' ? record.message : undefined,
      code: typeof record.code === 'string' ? record.code : undefined,
      details: typeof record.details === 'string' ? record.details : undefined,
      hint: typeof record.hint === 'string' ? record.hint : undefined,
    };
    if (detail.message || detail.code || detail.details || detail.hint) return detail;
    try {
      return JSON.stringify(error);
    } catch {
      return 'unserializable_error';
    }
  }
  return 'unknown_error';
}

export async function requireAgendaAdmin() {
  if (!(await hasAgendaAdminSession())) {
    throw new Error('unauthorized');
  }
}

export function hhmm(value: string) {
  return value.slice(0, 5);
}
