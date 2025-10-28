import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    // Routes yang bisa diakses tanpa login
    const publicRoutes = ["/auth/login", "/auth/register", "/api/auth"];

    // Routes yang harus diabaikan proxy
    const ignoredRoutes = [
      "/_next",
      "/favicon.ico",
      "/api/health",
      "/.well-known",
    ];

    // Skip proxy untuk ignored routes
    if (ignoredRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
    const isRoot = pathname === "/";

    // Special handling for sign-out - clear cookie and redirect
    if (pathname === "/api/auth/sign-out") {
      const response = NextResponse.next();
      response.cookies.delete("access_token");
      return response;
    }

    // Kalau belum login dan bukan public route
    if (!token && !isPublic && !isRoot) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Kalau root, arahkan berdasarkan status login
    if (isRoot) {
      return NextResponse.redirect(
        new URL(token ? "/dashboard" : "/auth/login", request.url)
      );
    }

    // Kalau sudah login dan coba akses halaman public
    if (token && isPublic) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Log error tapi tetap lanjutkan request
    console.error("Proxy error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api/health|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
