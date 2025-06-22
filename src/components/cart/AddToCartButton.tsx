import { useAddItemToCartMutation } from "@/hooks/cart/useAddItemToCartMutation";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
import LoadingButton from "../buttons/LoadingButton";
import { ButtonProps } from "./../ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const { mutate: addItemToCartMutate, isPending } = useAddItemToCartMutation();

  return (
    <LoadingButton
      onClick={() =>
        addItemToCartMutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      isLoading={isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon />
      Add to cart
    </LoadingButton>
  );
}
