import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { encryptToken } from '@/lib/encryption';
import { GoogleMyBusinessService } from '@/services/google-mybusiness.service';

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || '360gmb-development-fallback-session-key-32chars!';
  return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // 1. Check for OAuth error or cancellation
  if (error) {
    console.error('Google OAuth error response:', error);
    return NextResponse.redirect(new URL('/dashboard?error=oauth_denied', request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/dashboard?error=missing_code_or_state', request.url));
  }

  // 2. Cryptographically verify the state parameter to recover the authenticated 360 GMB userId
  let targetUserId: string;
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(state, secretKey, { algorithms: ['HS256'] });

    if (!payload.userId || typeof payload.userId !== 'string') {
      return NextResponse.redirect(new URL('/dashboard?error=invalid_state', request.url));
    }
    targetUserId = payload.userId;
  } catch (err) {
    console.error('OAuth state verification failed:', err);
    return NextResponse.redirect(new URL('/dashboard?error=invalid_or_expired_state', request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(new URL('/dashboard?error=missing_credentials', request.url));
  }

  try {
    // 3. Exchange authorization code with Google OAuth endpoint
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Token exchange failure:', tokenData.error_description || tokenData.error);
      return NextResponse.redirect(new URL('/dashboard?error=token_exchange_failed', request.url));
    }

    // 4. Fetch Google User Identity (email)
    const userProfile = await GoogleMyBusinessService.fetchUserProfile(tokenData.access_token);
    const googleEmail = userProfile?.email || 'google.account@connected.com';

    // 5. Encrypt tokens before storing in database
    const encryptedAccessToken = encryptToken(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token ? encryptToken(tokenData.refresh_token) : null;
    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 3600) * 1000);

    // 6. Safe logging
    console.log('Google OAuth successful.');
    console.log('Google User Email identified:', googleEmail);
    console.log('Access token received & encrypted: true');
    console.log('Refresh token received & encrypted:', Boolean(encryptedRefreshToken));

    // 7. Upsert GoogleConnection in Prisma for the exact authenticated user
    const connection = await prisma.googleConnection.upsert({
      where: {
        userId_googleEmail: {
          userId: targetUserId,
          googleEmail,
        },
      },
      create: {
        userId: targetUserId,
        googleEmail,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
        isConnected: true,
        connectedAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        accessToken: encryptedAccessToken,
        ...(encryptedRefreshToken ? { refreshToken: encryptedRefreshToken } : {}),
        expiresAt,
        isConnected: true,
        updatedAt: new Date(),
      },
    });

    // 8. Attempt initial discovery of Google Business Accounts & Locations
    try {
      await GoogleMyBusinessService.syncConnection(connection.id, tokenData.access_token);
    } catch (syncErr) {
      console.warn('Initial background location sync warning (will retry on demand):', syncErr);
    }

    // 9. Redirect back to Google Integration settings page with success indicator
    return NextResponse.redirect(new URL('/settings/integrations/google?status=connected', request.url));
  } catch (err) {
    console.error('Error during Google OAuth callback completion:', err);
    return NextResponse.redirect(new URL('/dashboard?error=server_error', request.url));
  }
}
