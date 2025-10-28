import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/auth/login", "/auth/register"];

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  const isRoot = pathname === "/";

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
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
