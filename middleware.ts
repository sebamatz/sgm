import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Only handle root path redirects
  if (pathname === "/") {
    let defaultLang = "en";

    // Domain-based language detection
    if (hostname.includes("sgmsoftware.gr")) {
      defaultLang = "el";
    } else if (hostname.includes("sgmsoftware.com")) {
      defaultLang = "en";
    }
    // For other hosts (Vercel previews, localhost), default to 'en'

    return NextResponse.redirect(new URL(`/${defaultLang}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg).*)",
  ],
};
