import { wixBrowserClient } from "@/lib/wix-browser.base";
import { UpdateCartItemQuantity, updateCartItemQuantity } from "@/wix-api/cart";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["cart"];

  const updateCartItemQuantityMutation = useMutation({
    mutationFn: (values: UpdateCartItemQuantity) =>
      updateCartItemQuantity(wixBrowserClient, values),
    onMutate: async (values: UpdateCartItemQuantity) => {
      // values is same as vales passed to mutation function
      // - `onMutate`: called when we start mutation before call `mutationFn`.
      const { productId, newQuantity } = values;

      await queryClient.cancelQueries({ queryKey });

      /** If our update fails we want to roll back to old value */
      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      /** Optimistic update */
      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => {
        // New data that we want to put it in cache.
        const newLineItems = oldData?.lineItems?.map((lineItem) => {
          const isProductToUpdate = lineItem._id === productId;
          if (isProductToUpdate) {
            /* Spread all exisitng info */
            const updatedLineItem = {
              ...lineItem,
              quantity: newQuantity,
            };
            return updatedLineItem;
          }
          /** Otherwise keep the lineItem */
          return lineItem;
        });

        const updatedCacheData = {
          ...oldData,
          lineItems: newLineItems,
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
      toast.error("Faild to update cart item Quantity", {
        description: "Somthing went wrong, Please try again.",
      });
    },
  });

  return updateCartItemQuantityMutation;
}
