import WixImage from "@/components/WixImage/WixImage";
import { currentCart } from "@wix/ecom";
import Link from "next/link";

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
}

export default function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  const itemUrlParts = item.url?.split("/");
  const slug = itemUrlParts?.pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <Link href={`/products/${slug}`}>
        <WixImage
          mediaIdentifier={item.image}
          width={110}
          height={110}
          alt={item.productName?.translated || "Product image"}
          className="flex-none bg-secondary"
        />
      </Link>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`}>
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
        </div>
      </div>
    </li>
  );
}
