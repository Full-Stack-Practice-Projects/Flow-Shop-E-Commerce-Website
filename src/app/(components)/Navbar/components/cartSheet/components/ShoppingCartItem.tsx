import { Button } from "@/components/ui/button";
import WixImage from "@/components/WixImage/WixImage";
import { useRemoveCartItemMutation } from "@/hooks/cart/useRemoveCartItemMutation";
import { useUpdateCartItemQuantityMutationMutation } from "@/hooks/cart/useUpdateCartItemQuantityMutation";
import { currentCart } from "@wix/ecom";
import { X } from "lucide-react";
import Link from "next/link";

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

export default function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const itemUrlParts = item.url?.split("/");
  const slug = itemUrlParts?.pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  const hasDiscount =
    item.fullPrice && item.fullPrice.amount !== item.price?.amount;

  const { mutate: updateCartItemQuantityMutate } =
    useUpdateCartItemQuantityMutationMutation();

  const { mutate: removeCartItemMutate } = useRemoveCartItemMutation();

  const productId = item._id;

  if (!productId) {
    return null;
  }

  return (
    <li className="flex items-center gap-3">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <WixImage
            mediaIdentifier={item.image}
            width={110}
            height={110}
            alt={item.productName?.translated || "Product image"}
            className="flex-none bg-secondary"
          />
        </Link>
        <button
          className="absolute -right-1 -top-1 rounded-full border bg-background p-0.5"
          onClick={() => removeCartItemMutate(productId)}
        >
          <X className="size-3" />
        </button>
      </div>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <p className="font-bold">{item.productName?.translated || "Item"}</p>
        </Link>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map((line) => {
                // line.colorInfo?.translated  if it undfined thats mean its not a color options its a list like.
                return line.colorInfo?.translated || line.plainText?.translated;
              })
              .join(", ")}
          </p>
        )}
        <div className="flex items-center gap-2">
          {item.quantity} x {item.price?.formattedConvertedAmount}
          {hasDiscount && (
            <span className="text-muted-foreground line-through">
              {item.price?.formattedConvertedAmount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            disabled={item.quantity === 1}
            onClick={() =>
              updateCartItemQuantityMutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={quantityLimitReached}
            onClick={() =>
              updateCartItemQuantityMutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity + 1,
              })
            }
          >
            +
          </Button>
          {quantityLimitReached && (
            <span className="text-destructive">Quantity Limit Reached</span>
          )}
        </div>
      </div>
    </li>
  );
}
