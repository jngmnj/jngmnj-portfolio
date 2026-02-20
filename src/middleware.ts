import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['ko', 'en'] as const;
const defaultLocale = 'ko';

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && locales.includes(cookie as (typeof locales)[number]))
    return cookie;

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase())
    .find((s) => s.startsWith('ko') || s.startsWith('en'));
  if (preferred?.startsWith('en')) return 'en';
  if (preferred?.startsWith('ko')) return 'ko';

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon|images|fonts).*)'],
};
