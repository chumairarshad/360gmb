import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getValidGoogleAccessToken } from '@/lib/google-token';
import { GoogleMyBusinessService } from '@/services/google-mybusiness.service';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tokenResult = await getValidGoogleAccessToken({ userId: session.userId });

    if (!tokenResult || !tokenResult.accessToken) {
      return NextResponse.json(
        { error: 'No active Google Business Profile connection found for this user.' },
        { status: 400 }
      );
    }

    const syncResult = await GoogleMyBusinessService.syncConnection(
      tokenResult.connectionId,
      tokenResult.accessToken
    );

    return NextResponse.json({
      success: true,
      googleEmail: tokenResult.googleEmail,
      accountsCount: syncResult.accountsCount,
      locationsCount: syncResult.locationsCount,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error during Google Business sync:', error);
    return NextResponse.json(
      { error: 'Failed to synchronize with Google Business Profile API.' },
      { status: 500 }
    );
  }
}
