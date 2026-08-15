import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ isConnected: false }, { status: 401 });
    }

    const connection = await prisma.googleConnection.findFirst({
      where: { userId: session.userId, isConnected: true },
      include: {
        locations: {
          select: {
            id: true,
            gmbLocationId: true,
            locationName: true,
            address: true,
            phone: true,
            website: true,
            category: true,
            syncStatus: true,
            lastSyncedAt: true,
          },
        },
      },
      orderBy: { connectedAt: 'desc' },
    });

    if (!connection) {
      return NextResponse.json({
        isConnected: false,
        googleEmail: null,
        locationsCount: 0,
        locations: [],
      });
    }

    return NextResponse.json({
      isConnected: true,
      googleEmail: connection.googleEmail,
      connectedAt: connection.connectedAt,
      updatedAt: connection.updatedAt,
      locationsCount: connection.locations.length,
      locations: connection.locations,
    });
  } catch (error) {
    console.error('Error fetching Google connection status:', error);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
