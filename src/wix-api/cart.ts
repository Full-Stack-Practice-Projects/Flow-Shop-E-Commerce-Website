import { WIX_STORES_APP_ID } from "@/lib/constants";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

type WixErrorType = {
  details: {
    applicationError: {
      code: string;
    };
  };
};

export async function getCart(wixClient: WixClient) {
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    console.dir(error, { depth: null });
    const errorCode = (error as WixErrorType).details.applicationError.code;
    console.log({ errorCode });
    console.log(errorCode === "OWNED_CART_NOT_FOUND");
    if (errorCode === "OWNED_CART_NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export async function addToCart(
  wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? { variantId: selectedVariant._id }
            : {
                options: selectedOptions,
              },
        },
        quantity: quantity,
      },
    ],
  });
}
