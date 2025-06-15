import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { WIX_SESSION_COOKIE } from "./lib/constants";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID }),
});

const MILI_SECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const NUMBER_OF_DAYS = 14;

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE);

  /** Get the token out from the cookie */
  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie?.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  /** Check if the token is in the past */
  if (
    sessionTokens.accessToken.expiresAt <
    Math.floor(Date.now() / MILI_SECONDS_IN_SECOND)
  ) {
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      );
    } catch (error) {
      console.error(error);
      /** It might throw an error becasue refreshToken is expired */
      /** Get a new refresh and access token */
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  }
  /** Add to the current incoming request */
  request.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens));

  const res = NextResponse.next({ request });

  // for future requests
  // You should pass a maxAge otherwise it will be expired immediately
  // secure mean this cookie will work on production http, otherwise false because it is in localhost
  res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge:
      SECONDS_IN_MINUTES * MINUTES_IN_HOUR * HOURS_IN_DAY * NUMBER_OF_DAYS,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}

// To configure where this middleware is executed for what pages.
export const config = {
  /*
     Trigger this middleware for all page expects 
     * _next/static|_next/image:  static files like images and not for favicon.ico
     */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
