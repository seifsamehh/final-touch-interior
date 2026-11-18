import { NextResponse, type NextRequest } from "next/server";

// Paths without a language get one: Arabic browsers land on /ar, everyone else on /en.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|ar)(\/|$)/.test(pathname) || pathname.includes(".")) return NextResponse.next();
  const ar = pathname === "/" && /^ar\b/i.test(req.headers.get("accept-language") ?? "");
  const url = req.nextUrl.clone();
  url.pathname = `/${ar ? "ar" : "en"}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|work/).*)"] };
