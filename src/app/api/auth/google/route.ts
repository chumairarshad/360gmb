import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { SignJWT } from 'jose';
import crypto from 'crypto';

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || '360gmb-development-fallback-session-key-32chars!';
  return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
  // 1. Verify authenticated 360 GMB session
  const session = await getSession();
  if (!session || !session.userId) {
    const loginUrl = new URL('/login?error=login_required', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Google OAuth environment variables are missing (GOOGLE_CLIENT_ID or GOOGLE_REDIRECT_URI).' },
      { status: 500 }
    );
  }

  // 2. Generate cryptographically secure signed state JWT bound to current user
  const secretKey = getSecretKey();
  const stateToken = await new SignJWT({
    userId: session.userId,
    nonce: crypto.randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m') // 15 minutes validity for OAuth flow
    .sign(secretKey);

  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: redirectUri,
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: 'openid email https://www.googleapis.com/auth/business.manage',
    state: stateToken,
  };

  const qs = new URLSearchParams(options);

  return NextResponse.redirect(`${rootUrl}?${qs.toString()}`);
}
