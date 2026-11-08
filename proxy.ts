import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_HEADER, resolveLocaleRequest } from "./lib/routes";

export function proxy(request: NextRequest) {
  const resolution = resolveLocaleRequest(request.nextUrl.pathname);
  if (resolution.action === "skip") return NextResponse.next();

  const headers = new Headers(request.headers);
  if (resolution.action === "redirect") {
    const url = request.nextUrl.clone();
    url.pathname = resolution.to;
    return NextResponse.redirect(url);
  }

  headers.set(LOCALE_HEADER, resolution.locale);
  if (resolution.action === "rewrite") {
    const url = request.nextUrl.clone();
    url.pathname = resolution.to;
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|brand/).*)"],
};
