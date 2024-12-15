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

  // If not authenticated, redirect to login
  if (!me?.success) {
    if (url.pathname === "/auth/register") {
      return NextResponse.next();
    } else if (url.pathname !== "/auth/login") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  const { role } = me.data;

  // Redirect logged-in users away from auth pages
  if (["/auth/login", "/auth/register"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Admin logic
  if (role === "admin") {
    // Redirect to /users if at root
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/users", req.url));
    }

    // Redirect admins away from non-admin paths
    if (
      !adminPaths.some((path) =>
        new RegExp(`^${path.replace(":path*", ".*")}$`).test(url.pathname)
      )
    ) {
      return NextResponse.redirect(new URL("/users", req.url));
    }
  }

  // User logic
  if (role === "user") {
    // Redirect users away from admin paths
    if (
      adminPaths.some((path) =>
        new RegExp(`^${path.replace(":path*", ".*")}$`).test(url.pathname)
      )
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect users to /lesson if not already there
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
