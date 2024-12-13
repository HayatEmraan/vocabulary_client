import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { meApi } from "./services/commonApi/me.api";

const paths = [
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

  if (role) {
    if (url.pathname === "/auth/login" || url.pathname === "/auth/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (role === "user") {
    if (url.pathname !== "/lesson") {
      return NextResponse.redirect(new URL("/lesson", req.url));
    }
  }

  if (role === "admin") {
    if (!paths.some((path) => url.pathname.match(path))) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
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
  ],
};
