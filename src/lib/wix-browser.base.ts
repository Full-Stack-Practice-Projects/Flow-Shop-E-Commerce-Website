import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";

const tokens: Tokens = JSON.parse(Cookies.get(WIX_SESSION_COOKIE) || "{}");

/**
 * We can do it like this.
 * The browser is not shared btw all users.
 * The server (backend) is shared btw users.
 */

/**
 * No need to a context to be shared btw all components
 * because when wix client is changed we do not need to change any component.
 * In fact the client is not changed (fixed with modules).
 */

export const wixBrowserClient = getWixClient(tokens);
