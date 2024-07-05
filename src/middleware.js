import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { JWTVerify } from "./Helper/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = cookies().get("Token");
  const Verified = await JWTVerify(token?.value);
  console.log("This is the token", Verified);

  if (!Verified) {
      return NextResponse.redirect(new URL("/", request.url));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};
