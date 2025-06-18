// after login succfull we got directed to our callback route that we configure.
// API Endpoints runs on our server.

import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { getWixServerClient } from "@/lib/wix-server.base";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const NUMBER_OF_DAYS = 14;

// without default keyword because it will not work (we cant have defualt export from our route handlers)
export async function GET(request: NextRequest) {
  // We prev set the responseMode: query, this means that wix will send us a bunch of data in the search params.

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const error_description =
    request.nextUrl.searchParams.get("error_description");

  if (error) {
    return new Response(error_description, {
      status: 400,
    });
  }
  /** In our oAuth hook we stored the oauth data in the cookie */
  /** We are in server side we do not use js-cookie we use nextjs cookie */
  const oAuthData: OauthData = JSON.parse(
    (await cookies()).get(WIX_OAUTH_DATA_COOKIE)?.value || "{}",
  );

  if (!code || !state || !oAuthData) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  const wixClient = await getWixServerClient();

  const memberTokens = wixClient.auth.getMemberTokens(code, state, oAuthData);

  (await cookies()).delete(WIX_OAUTH_DATA_COOKIE);
  (await cookies()).set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
    maxAge:
      SECONDS_IN_MINUTES * MINUTES_IN_HOUR * HOURS_IN_DAY * NUMBER_OF_DAYS,
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(null, {
    // Redirect status
    status: 302,
    headers: {
      Location: oAuthData.originalUri || "/",
    },
  });
}
