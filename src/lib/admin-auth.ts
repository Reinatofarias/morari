import { createHash, createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

// Credenciais e segredo vêm das variáveis de ambiente (Vercel). Nada sensível fica no código.
//   ADMIN_EMAIL            e-mail de acesso (padrão: admin@matheusmorari.com.br)
//   ADMIN_PASSWORD         senha de acesso (se ausente, usa ADMIN_PANEL_PASSWORD da agenda)
//   ADMIN_SESSION_SECRET   segredo para assinar a sessão (recomendado; string longa e aleatória)

export const SESSION_COOKIE_NAME = 'admin_session_token';
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function cleanEnv(value: string | undefined) {
  const cleaned = value?.trim().replace(/^['"]|['"]$/g, '');
  return cleaned ? cleaned : undefined;
}

export function getAdminEmail() {
  return (cleanEnv(process.env.ADMIN_EMAIL) ?? 'admin@matheusmorari.com.br').toLowerCase();
}

function getAdminPassword() {
  return cleanEnv(process.env.ADMIN_PASSWORD) ?? cleanEnv(process.env.ADMIN_PANEL_PASSWORD);
}

function getSessionSecret() {
  const explicit = cleanEnv(process.env.ADMIN_SESSION_SECRET);
  if (explicit) return explicit;
  const password = getAdminPassword();
  const serviceKey =
    cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ??
    cleanEnv(process.env.SUPABASE_SERVICE_KEY) ??
    cleanEnv(process.env.SUPABASE_SECRET_KEY);
  if (!password) return undefined;
  return `${password}:${serviceKey ?? ''}`;
}

export function isAdminLoginConfigured() {
  return !!getAdminPassword() && !!getSessionSecret();
}

function safeEqual(left: string, right: string) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export function checkAdminCredentials(email: unknown, password: unknown) {
  const expectedPassword = getAdminPassword();
  if (!expectedPassword || typeof email !== 'string' || typeof password !== 'string') return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), getAdminEmail());
  const passwordOk = safeEqual(password, expectedPassword);
  return emailOk && passwordOk;
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionToken(email: string): string {
  const secret = getSessionSecret();
  if (!secret) throw new Error('admin_login_not_configured');
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${Buffer.from(email.toLowerCase()).toString('base64url')}.${expires}.${randomUUID()}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 4) return false;
  const [emailPart, expires, nonce, signature] = parts;
  const payload = `${emailPart}.${expires}.${nonce}`;

  const expected = Buffer.from(sign(payload, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;

  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  try {
    return Buffer.from(emailPart, 'base64url').toString('utf-8') === getAdminEmail();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
