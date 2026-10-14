// /src/proxy.ts
// French at the root (/contact), English under /en (/en/contact). Every
// page lives in app/[lang], so an unprefixed URL is rewritten to /fr
// internally; nobody sees /fr, and an /fr URL typed by hand redirects to
// the root version. No redirect by browser language: search engines and
// shared links always get the page they asked for.

import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (first === defaultLocale) {
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skips API routes, Next internals and any file with an extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
