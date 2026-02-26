import { adminAuth } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS,
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      idToken?: string;
    };

    if (!body.idToken) {
      return NextResponse.json({ message: 'Missing idToken.' }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(body.idToken);
    if (!decoded.admin) {
      return NextResponse.json(
        { message: 'Admin access required.' },
        { status: 403 }
      );
    }

    const sessionCookie = await adminAuth.createSessionCookie(body.idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, getCookieOptions());
    return response;
  } catch {
    return NextResponse.json(
      { message: 'Invalid or expired token.' },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    ...getCookieOptions(),
    maxAge: 0,
  });
  return response;
}
