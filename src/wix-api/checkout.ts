import { env } from "@/env";
import { WixClient } from "@/lib/wix-client.base";
import { checkout } from "@wix/ecom";

export async function getCheckoutUrlForCurrentCart(wixClient: WixClient) {
  const { checkoutId } =
    await wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: checkout.ChannelType.WEB,
    });

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      // Where we want to redirect if checkout is over (done).
      // Where we get redirected to if abort (cancle) checkout.
      postFlowUrl: window.location.href,
      thankYouPageUrl: `${env.NEXT_PUBLIC_BASE_URL}/checkout-success`,
    },
  });

  if (!redirectSession) {
    throw Error("Failed to create redirect session.");
  }

  if (!redirectSession.fullUrl) {
    throw Error("No fullUrl for this redirect session.");
  }

  return redirectSession.fullUrl;
}
