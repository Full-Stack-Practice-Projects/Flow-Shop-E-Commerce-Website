import { useCartCheckout } from "@/hooks/checkout/useCartCheckout";
import React from "react";
import { ButtonProps } from "../ui/button";
import LoadingButton from "./LoadingButton";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, isPending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} isLoading={isPending} {...props}>
      Checkout
    </LoadingButton>
  );
}
