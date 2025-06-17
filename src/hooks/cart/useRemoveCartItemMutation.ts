import { wixBrowserClient } from "@/lib/wix-browser.base";
import { removeCartItem } from "@/wix-api/cart";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["cart"];

  const removeCartItemMutation = useMutation({
    mutationFn: (productId: string) =>
      removeCartItem(wixBrowserClient, productId),
    onMutate: async (productId: string) => {
      // - `onMutate`: called when we start mutation before call `mutationFn`.
      await queryClient.cancelQueries({ queryKey });

      /** If our update fails we want to roll back to old value */
      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      /** Optimistic update */
      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => {
        // New data that we want to put it in cache.
        const lineItemsAfterRemovingProduct = oldData?.lineItems?.filter(
          (lineItem) => lineItem._id !== productId,
        );
        const updatedCacheData = {
          ...oldData,
          lineItems: lineItemsAfterRemovingProduct,
        };
        return updatedCacheData;
      });

      /** We have to return prevState as an object, so we can override onError function to rollback to prevState if an error happens */
      return { previousState };
    },
    onError: (error, variables, context) => {
      /** Roll back to the prevState using the context var */
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error("Faild to remove item from cart.", {
        description: "Somthing went wrong, Please try again.",
      });
    },
    onSettled: () => {
      /** runs after the request completes, whether it was successful (onSuccess) or it failed (onError) */

      // This line tells the React Query fetch the data from the server again (for total quantity..).
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return removeCartItemMutation;
}
