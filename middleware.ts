import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { url } = request;
  // remove domain from url and leave just the path
  const path = new URL(url).pathname;
  // if path is /test/* && in dev then return response
  console.log("path", path);
  if (path.startsWith("/test/") && process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/test/:test*",
};
