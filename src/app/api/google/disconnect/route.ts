import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mark GoogleConnection as disconnected for this user
    await prisma.googleConnection.updateMany({
      where: { userId: session.userId, isConnected: true },
      data: { isConnected: false, updatedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: 'Google account disconnected successfully.',
    });
  } catch (error) {
    console.error('Error during Google disconnect:', error);
    return NextResponse.json({ error: 'Failed to disconnect Google account.' }, { status: 500 });
  }
}
