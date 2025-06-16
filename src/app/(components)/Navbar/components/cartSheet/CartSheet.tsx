import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { currentCart } from "@wix/ecom";
import ShoppingCartItem from "./components/ShoppingCartItem";

interface CartSheetProps {
  sheetOpen: boolean;
  toggleSheetOpen: (value: boolean) => void;
  totalQuantity: number;
  cartData: currentCart.Cart | null;
}

export default function CartSheet({
  sheetOpen,
  toggleSheetOpen,
  totalQuantity,
  cartData,
}: CartSheetProps) {
  return (
    <Sheet open={sheetOpen} onOpenChange={toggleSheetOpen}>
      <SheetContent className="flex flex-col p-5 sm:max-w-lg">
        <SheetHeader className="p-5">
          <SheetTitle>
            Your cart{" "}
            <span className="text-base">
              ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex grow flex-col space-y-5 overflow-y-auto">
          <ul className="space-y-5">
            {cartData?.lineItems?.map((item) => {
              return <ShoppingCartItem key={item._id} item={item} />;
            })}
          </ul>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-0.5">
            <p className="text-sm">Subtotal amount</p>
            {/* @ts-expect-error: subtotal exists in the API response but is missing from the Wix SDK types */}
            <p className="font-bold">{cartData?.subtotal?.formattedAmount}</p>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
          </div>
          <Button size="lg">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
