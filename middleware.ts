import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get("user");

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// These are the protected routes this middleware applies to
export const config = {
    matcher: ["/create", "/delete/:path*"],
};
