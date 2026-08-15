import { NextResponse } from 'next/server';
import { getSession, clearSessionCookie } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        planType: true,
        avatarUrl: true,
        agencyId: true,
        googleConns: {
          select: {
            id: true,
            googleEmail: true,
            isConnected: true,
            connectedAt: true,
          },
        },
      },
    });

    if (!user) {
      await clearSessionCookie();
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching current session user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
