import { env } from "@/env";
import { WixClient } from "@/lib/wix-client.base";
import { OauthData } from "@wix/sdk";

/**
 * We need to store OAuthData in the cookie and this work diffrently on browser and server so so i had to sperate these functions because the caller of this function had to set the cookie.
 */

export async function generateOAuthData(
  wixClient: WixClient,
  originPath?: string,
) {
  /**
   * orginalUri: where we are coming from, and wanaa (where we will handle auth after we get redirected from the wix login page.)
   * redirectUri : where we wanna to redirect
   */
  const oauthData = wixClient.auth.generateOAuthData(
    `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/wix`,
    `${env.NEXT_PUBLIC_BASE_URL}/${originPath || ""}`,
  );
  return oauthData;
}

export async function getLoginUrl(wixClient: WixClient, oAuthData: OauthData) {
  /** This is the url to the login page */
  const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData, {
    responseMode: "query",
  });
  return authUrl;
}

export async function getLogoutUrl(wixClient: WixClient) {
  const { logoutUrl } = await wixClient.auth.logout(env.NEXT_PUBLIC_BASE_URL);
  return logoutUrl;
}
