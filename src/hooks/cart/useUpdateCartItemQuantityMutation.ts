import { wixBrowserClient } from "@/lib/wix-browser.base";
import { UpdateCartItemQuantity, updateCartItemQuantity } from "@/wix-api/cart";
import {
  MutationKey,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

export function useUpdateCartItemQuantityMutationMutation() {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["cart"];

  const mutationKey: MutationKey = ["useUpdateCartItemQuantityMutation"];

  const updateCartItemQuantityMutation = useMutation({
    mutationKey: mutationKey,
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
    onSettled: () => {
      /** runs after the request completes, whether it was successful (onSuccess) or it failed (onError) */

      /*
       * Check if mutating is in progress
       * queryClient.isMutating(): returns a number how often this key is mutating at a moment.
       * only if it mutating ones invalidate cache (tell react to update cache by fetching the fresh data).
       * If there is multiple operation in progress we want to wait until there is one left before we invalidate query.
       *
       * */
      if (queryClient.isMutating({ mutationKey }) === 1) {
        // This line tells the React Query fetch the data from the server again.
        queryClient.invalidateQueries({ queryKey });

        /** Without these lines we might get a race condtion.
         * Sometimes an older requests finishes later after newer request.
         */
      }
    },
  });

  return updateCartItemQuantityMutation;
}
