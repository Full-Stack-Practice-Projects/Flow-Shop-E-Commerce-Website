import { getWixClient } from "@/lib/wix-client.base";

type WixErrorType = {
  details: {
    applicationError: {
      code: string;
    };
  };
};

export async function getCart() {
  try {
    const wixClient = getWixClient();
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
