import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

async function fetchUserRole(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1] || "";

  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://your-api.com/get-user-role", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.role;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  // const role = await fetchUserRole(req);
  // const url = req.nextUrl.clone();

  // if (!role) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (role === "user") {
  //   if (url.pathname !== "/lesson") {
  //     return NextResponse.redirect(new URL("/lesson", req.url));
  //   }
  // }

  // if (role === "admin") {
  //   if (
  //     !url.pathname.startsWith("/lesson") &&
  //     !url.pathname.startsWith("/admin") &&
  //     !url.pathname.startsWith("/users") &&
  //     !url.pathname.startsWith("/vocabulary")
  //   ) {
  //     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lesson", "/admin/:path*", "/users/:path*", "/vocabulary/:path*"],
};
