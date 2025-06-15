import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";

export async function getWixServerClient() {
  let tokens: Tokens | undefined;

  try {
    tokens = JSON.parse(
      (await cookies()).get(WIX_SESSION_COOKIE)?.value || "{}",
    );
  } catch (error) {
    console.error(error);
  }

  return getWixClient(tokens);
}

/**
 * We cant do export const wixServerClient= getWixServerClient() and reuse it every where we need.
 * This is wrong !!!
 *  because if we run our server on VPS server where we have one backend server process then it would use the same cookies for all request on the server.
 *  but different users have different cookies so each user needs their own client with the current cookies
 */
