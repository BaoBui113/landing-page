import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = Boolean(req.cookies.get("access_token"));
  const { pathname } = req.nextUrl;

  if (isLoggedIn && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (
    !isLoggedIn &&
    (pathname === "/admin/settings" || pathname === "/admin")
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/settings", "/admin/login", "/admin"],
};
