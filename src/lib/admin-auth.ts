import { cookies } from 'next/headers';

export const ADMIN_CREDENTIALS = {
  email: 'admin@matheusmorari.com.br',
  password: 'matheus@2026',
};

export const SESSION_COOKIE_NAME = 'admin_session_token';

// Secret payload to create a token signature
const SESSION_SECRET = 'mm_admin_super_secret_key_2026_secure';

export async function createSessionToken(email: string): Promise<string> {
  const data = `${email}:${Date.now()}:${SESSION_SECRET}`;
  if (typeof window !== 'undefined') {
    return btoa(data);
  }
  return Buffer.from(data).toString('base64');
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const decoded = typeof window !== 'undefined' ? atob(token) : Buffer.from(token, 'base64').toString('utf-8');
    const [email, timestamp, secret] = decoded.split(':');

    if (email !== ADMIN_CREDENTIALS.email || secret !== SESSION_SECRET) {
      return false;
    }

    // Optional: session expiration (e.g. 7 days)
    const tokenTime = parseInt(timestamp, 10);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (isNaN(tokenTime) || Date.now() - tokenTime > sevenDaysInMs) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
