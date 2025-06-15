import { wixBrowserClient } from "@/lib/wix-browser.base";
import { getCart } from "@/wix-api/cart";
import { useQuery } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";

export function useCartQuery(initialData: currentCart.Cart | null) {
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(wixBrowserClient),
    initialData,
  });

  return cartQuery;
}
