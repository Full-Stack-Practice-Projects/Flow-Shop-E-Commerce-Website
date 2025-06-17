import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";
import { wixBrowserClient } from "@/lib/wix-browser.base";
import { generateOAuthData, getLoginUrl, getLogoutUrl } from "@/wix-api/auth";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const SECONDS_IN_MINUTES = 60;
const NUMBER_OF_MINUTES = 10;
const MILI_SECONDS_IN_SECOND = 1000;

export function useAuth() {
  const pathname = usePathname();

  /** TODO: We can use mutation ... */

  async function login() {
    try {
      /** For ex if you are in product details (pathname) page so you can to login and then redirect to the same page that you explored. */
      const oAuthData = await generateOAuthData(wixBrowserClient, pathname);

      /** We need js-cookie beacuse this is happen client side. */
      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(
          Date.now() +
            SECONDS_IN_MINUTES * NUMBER_OF_MINUTES * MILI_SECONDS_IN_SECOND,
        ),
      });

      const redirectUrl = await getLoginUrl(wixBrowserClient, oAuthData);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast("Failed to login.", {
        description: "Failed to login. Please try again.",
      });
    }
  }

  async function logout() {
    try {
      const logoutUrl = await getLogoutUrl(wixBrowserClient);
      Cookies.remove(WIX_SESSION_COOKIE);
      window.location.href = logoutUrl;
    } catch (error) {
      console.error(error);
      toast("Failed to logout.", {
        description: "Failed to logout. Please try again.",
      });
    }
  }

  return { login, logout };
}
