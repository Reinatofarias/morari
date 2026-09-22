import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export const AGENDA_ADMIN_COOKIE = 'mm_agenda_admin';

export function cleanEnv(value: string | undefined) {
  return value?.trim().replace(/^['"]|['"]$/g, '');
}

function sessionSecret() {
  return `${cleanEnv(process.env.ADMIN_PANEL_PASSWORD) ?? ''}:${cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ?? ''}`;
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
  const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) throw new Error('missing_supabase_config');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function requireAgendaAdmin() {
  if (!(await hasAgendaAdminSession())) {
    throw new Error('unauthorized');
  }
}

export function hhmm(value: string) {
  return value.slice(0, 5);
}
