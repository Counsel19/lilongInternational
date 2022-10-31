import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

export default async function middleware(req) {
  const jwt = req.cookies.get("token");

  const { pathname } = req.nextUrl;

  if (pathname.includes("/login") || pathname.includes("/register")) {
    return NextResponse.next();
  }

  if (
    pathname.includes("admin") ||
    pathname.includes("/cart") ||
    pathname.includes("/saved") ||
    pathname.includes("/checkout")
  ) {
    if (jwt === undefined) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));

      return NextResponse.next();
    } catch (error) {
      console.log(error, "error");
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}
