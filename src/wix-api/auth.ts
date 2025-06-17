import { env } from "@/env";
import { WixClient } from "@/lib/wix-client.base";

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
