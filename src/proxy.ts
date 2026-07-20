import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALE_COOKIE_NAME,
  LOCALES,
} from '@/constants/locales';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE = 'admin_session';

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookie && hasLocale(cookie)) return cookie;

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase())
    .find((s) => s.startsWith('ko') || s.startsWith('en'));
  if (preferred?.startsWith('en')) return 'en';
  if (preferred?.startsWith('ko')) return 'ko';

  return DEFAULT_LOCALE;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  const locale = pathnameHasLocale ? pathname.split('/')[1] : getLocale(request);

  const isAdminPath = pathnameHasLocale
    ? pathname.startsWith(`/${locale}/admin`)
    : pathname.startsWith('/admin');

  if (isAdminPath) {
    const isAdmin = Boolean(
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    );
    if (!isAdmin) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon|images|fonts).*)'],
};
