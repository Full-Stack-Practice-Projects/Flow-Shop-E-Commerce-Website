import { wixBrowserClient } from "@/lib/wix-browser.base";
import { getCheckoutUrlForCurrentCart } from "@/wix-api/checkout";
import { useState } from "react";
import { toast } from "sonner";

export function useCartCheckout() {
  const [isPending, setIsPending] = useState<boolean>(false);

  /**
   * I decided to not use useMutation because we want to handle our loading state that sets to true until the redirect is over.
   */
  async function startCheckoutFlow() {
    setIsPending(true);
    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setIsPending(false);
      console.error(error);
      toast.error("Failed to start checkout.", {
        description: "Failed to start checkout. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return { startCheckoutFlow, isPending };
}
