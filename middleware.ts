import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSessionToken } from "./lib/auth/entry";
const protectedRoutes = ["/user", "/profile", "/settings"];
const loginUrl = "/login";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { url } = request;
  const path = new URL(url).pathname;
  //see if it is a protected route, and starts with protected route
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    const session = request.cookies.get("session");
    if (!session) {
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
    validateSessionToken(session.value)
      .then((result) => {
        if (!result.user) {
          return NextResponse.redirect(new URL(loginUrl, request.url));
        }
        return NextResponse.next();
      })
      .catch((error) => {
        console.error(error);
        return NextResponse.redirect(new URL(loginUrl, request.url));
      });
  }
  if (path.startsWith("/test/") && process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/test/:test*", ...protectedRoutes],
};
