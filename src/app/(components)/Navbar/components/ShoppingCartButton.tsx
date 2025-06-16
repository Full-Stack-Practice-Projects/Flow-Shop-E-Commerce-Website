"use client";

import { Button } from "@/components/ui/button";
import { useCartQuery } from "@/hooks/cart/useQueryCart";
import { currentCart } from "@wix/ecom";
import { ShoppingCartIcon } from "lucide-react";
import { useMemo, useState } from "react";
import CartSheet from "./cartSheet/CartSheet";

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}
const INITIAL_QUANTITY = 0;

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const { data, isSuccess, isPending, isError, error } =
    useCartQuery(initialData);

  const cart = useMemo(() => {
    return {
      cartData: data,
      isSuccess,
      isPending,
      error,
      isError,
    };
  }, [data, isSuccess, isPending, error, isError]);

  const totalQuantity =
    data?.lineItems?.reduce((acc, item) => {
      const itemQuantity = item.quantity || 0;
      return acc + itemQuantity;
    }, INITIAL_QUANTITY) || 0;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
        <ShoppingCartIcon />
        <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {totalQuantity < 10 ? totalQuantity : "9+"}
        </span>
      </Button>
      <CartSheet
        cart={cart}
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        totalQuantity={totalQuantity}
      />
    </div>
  );
}
