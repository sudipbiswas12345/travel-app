// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const role = req.cookies.get("role");

  const url = req.nextUrl.clone();

  // No token → redirect to login
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Admin routes → admin role only
  if (url.pathname.startsWith("/admin") && role?.value !== "admin") {
    url.pathname = "/destinations";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/blogs/:path*",
    "/contact/:path*",
    "/destinations/:path*",
    "/user/:path*",
    "/bookings/:path*",
  ],
};
