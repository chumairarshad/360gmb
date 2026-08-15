import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = '360gmb_session';

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || '360gmb-development-fallback-session-key-32chars!';
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(sessionCookie, secretKey, {
      algorithms: ['HS256'],
    });

    if (!payload.sub || typeof payload.sub !== 'string') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/agency/:path*',
    '/settings/:path*',
    '/reviews/:path*',
    '/seo/:path*',
    '/keywords/:path*',
    '/competitors/:path*',
    '/ai-content/:path*',
    '/automation/:path*',
    '/analytics/:path*',
    '/reports/:path*',
    '/businesses/:path*',
    '/billing/:path*',
    '/google-business/:path*',
  ],
};
