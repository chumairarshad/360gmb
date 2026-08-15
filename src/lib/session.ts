import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = '360gmb_session';
const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || '360gmb-development-fallback-session-key-32chars!';
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  sub: string; // userId
  iat?: number;
  exp?: number;
}

/**
 * Signs a new session JWT with { sub: userId }
 */
export async function signSessionToken(userId: string): Promise<string> {
  const secretKey = getSecretKey();
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRATION_SECONDS}s`)
    .sign(secretKey);
}

/**
 * Verifies a session JWT and returns the payload or null
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });

    if (!payload.sub || typeof payload.sub !== 'string') {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Sets the 360gmb_session HttpOnly cookie in the current response context
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRATION_SECONDS,
  });
}

/**
 * Clears the 360gmb_session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Creates and sets a new session cookie for the specified user ID
 */
export async function createSession(userId: string): Promise<string> {
  const token = await signSessionToken(userId);
  await setSessionCookie(token);
  return token;
}

/**
 * Reads and verifies the current session from cookies
 */
export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  const payload = await verifySessionToken(sessionCookie);
  if (!payload || !payload.sub) return null;

  return { userId: payload.sub };
}

/**
 * Throws an error or returns the authenticated session user ID
 */
export async function requireSession(): Promise<{ userId: string }> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}
