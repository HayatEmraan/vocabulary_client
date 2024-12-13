import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { meApi } from "./services/commonApi/me.api";

const adminPaths = [
  "/lessons",
  "/lessons/:path*",
  "/users",
  "/vocabulary",
  "/vocabulary/:path*",
];

export async function middleware(req: NextRequest) {
  const me = await meApi();
  const url = req.nextUrl.clone();

  if (!me?.success) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const { role } = me?.data;

  if (["/auth/login", "/auth/register"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (role === "admin") {
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/users", req.url));
    }

    if (!adminPaths.some((path) => url.pathname.match(path))) {
      return NextResponse.redirect(new URL("/users", req.url));
    }
  } else if (role === "user") {
    if (adminPaths.some((path) => url.pathname.match(path))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname !== "/lesson") {
      return NextResponse.redirect(new URL("/lesson", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/lessons/:path*",
    "/lesson",
    "/users/:path*",
    "/vocabulary/:path*",
    "/auth/login",
    "/auth/register",
    "/",
  ],
};
