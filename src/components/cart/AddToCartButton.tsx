import { wixBrowserClient } from "@/lib/wix-browser.base";
import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";
import LoadingButton from "../buttons/LoadingButton";
import { Button, ButtonProps } from "./../ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  return (
    <LoadingButton
      onClick={() =>
        addToCart(wixBrowserClient, { product, selectedOptions, quantity })
      }
      isLoading={false}
      {...props}
    >
      Add to cart
    </LoadingButton>
  );
}
