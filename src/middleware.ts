import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'ar', 'zh', 'vi'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname.startsWith(`/${l}`))) return NextResponse.next();
  // Auto-detect from Accept-Language, default English
  const al = req.headers.get('accept-language') ?? '';
  const detected = LOCALES.find((l) => al.toLowerCase().startsWith(l)) ?? 'en';
  return NextResponse.redirect(new URL(`/${detected}${pathname}`, req.url));
}

export const config = { matcher: ['/((?!api|_next|images|logo|favicon.svg).*)'] };
