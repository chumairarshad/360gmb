import { prisma } from '@/lib/prisma';
import { encryptToken, decryptToken } from '@/lib/encryption';

export interface ValidGoogleTokenResult {
  accessToken: string;
  googleEmail: string;
  connectionId: string;
  userId: string;
}

/**
 * Retrieves a valid, decrypted Google Access Token for the specified connection or user.
 * Automatically handles token expiration and performs refresh token exchanges.
 */
export async function getValidGoogleAccessToken(
  identifier: { connectionId?: string; userId?: string }
): Promise<ValidGoogleTokenResult | null> {
  const connection = await prisma.googleConnection.findFirst({
    where: {
      ...(identifier.connectionId ? { id: identifier.connectionId } : {}),
      ...(identifier.userId ? { userId: identifier.userId } : {}),
      isConnected: true,
    },
    orderBy: { connectedAt: 'desc' },
  });

  if (!connection) {
    return null;
  }

  const now = new Date();
  const expiresAt = connection.expiresAt ? new Date(connection.expiresAt) : null;
  const isExpiredOrClose = !expiresAt || expiresAt.getTime() - now.getTime() < 5 * 60 * 1000; // 5 minute buffer

  let accessToken = decryptToken(connection.accessToken);

  // If token is expired and we have a refresh token, perform refresh exchange
  if (isExpiredOrClose && connection.refreshToken) {
    const refreshToken = decryptToken(connection.refreshToken);
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (clientId && clientSecret && refreshToken) {
      try {
        const res = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          }),
        });

        const data = await res.json();

        if (res.ok && data.access_token) {
          accessToken = data.access_token;
          const newExpiresAt = new Date(Date.now() + (data.expires_in || 3600) * 1000);

          await prisma.googleConnection.update({
            where: { id: connection.id },
            data: {
              accessToken: encryptToken(accessToken),
              expiresAt: newExpiresAt,
              updatedAt: new Date(),
            },
          });
        } else {
          console.error('Failed to refresh Google access token:', data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error during Google token refresh:', err);
      }
    }
  }

  return {
    accessToken,
    googleEmail: connection.googleEmail,
    connectionId: connection.id,
    userId: connection.userId,
  };
}
