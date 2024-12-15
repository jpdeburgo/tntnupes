import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authProtectedPages } from "./authProtectedPages";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only allow unauthenticated users to access specific pages
  console.log({ pathname });
  if (!authProtectedPages.includes(pathname)) {
    return NextResponse.next();
  }

  const cookieList = await cookies();
  const authUser = cookieList.get("authUser");
  const { uid } = JSON.parse(authUser.value);

  // Make an API call to verify user status
  const res = await fetch(`${req.nextUrl.origin}/api/verify-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid }), // Replace with actual UID logic
  });

  if (res.ok) {
    const text = await res.text(); // Use text() instead of json() to inspect the raw response
    const data = JSON.parse(text);
    console.log({ text, data });
    if (data.user?.verified) {
      return NextResponse.next();
    }
  }

  // Redirect unauthorized users to /signin
  return NextResponse.redirect(new URL("/signin", req.url));
}
