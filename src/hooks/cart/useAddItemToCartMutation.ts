import { wixBrowserClient } from "@/lib/wix-browser.base";
import { addToCart, AddToCartValues } from "@/wix-api/cart";
import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddItemToCartMutation() {
  const queryClient: QueryClient = useQueryClient();
  const queryKey: QueryKey = ["cart"];

  const addItemToCartMutation = useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess(data) {
      toast.success("Item addedd to cart", {
        description: "Item addedd to cart successfully.",
      });

      /** Cancel running queries on this query key to avoid race condtion to ensure that no running queries edit on our fresh cache at this moment. */
      queryClient.cancelQueries({ queryKey });

      /* We need query key to identify cache entry*/
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to add item to cart.", {
        description: "Failed to add item to cart. Please try again.",
      });
    },
  });

  return addItemToCartMutation;
}
