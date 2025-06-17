import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { currentCart } from "@wix/ecom";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import ShoppingCartItem from "./components/ShoppingCartItem";

interface CartSheet {
  cartData: currentCart.Cart | null;
  isSuccess: boolean;
  isPending: boolean;
  isFetching: boolean;
  error: Error | null;
  isError: boolean;
}

interface CartSheetProps {
  sheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  totalQuantity: number;
  cart: CartSheet;
}

export default function CartSheet({
  sheetOpen,
  setSheetOpen,
  totalQuantity,
  cart,
}: CartSheetProps) {
  const { isPending, cartData, isFetching, isError, error, isSuccess } = cart;

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="flex flex-col p-5 sm:max-w-lg">
        <SheetHeader className="p-5">
          <SheetTitle>
            Your cart{" "}
            <span className="text-base">
              ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex grow flex-col space-y-5 overflow-y-auto pt-1">
          <ul className="space-y-5">
            {cartData?.lineItems?.map((item) => {
              return <ShoppingCartItem key={item._id} item={item} />;
            })}
          </ul>
          {isPending && <Loader2 className="mx-auto animate-spin" />}
          {isError && <p className="">{error?.message}</p>}
          {isSuccess && !cartData?.lineItems?.length && (
            <div className="flex items-center justify-center text-center">
              <div className="space-y-1.5">
                <p className="text-lg font-semibold"> Your cart is empty</p>
                <Link
                  href={``}
                  className="text-primary hover:underline"
                  onClick={() => setSheetOpen(false)}
                >
                  Start shopping now
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-0.5">
            <p className="text-sm">Subtotal amount:</p>
            {/* @ts-expect-error: subtotal exists in the API response but is missing from the Wix SDK types */}
            <p className="font-bold">{cartData?.subtotal?.formattedAmount}</p>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
          </div>
          {/** Disable button if it currently updating or fetching data */}
          <Button size="lg" disabled={!totalQuantity || isFetching}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
