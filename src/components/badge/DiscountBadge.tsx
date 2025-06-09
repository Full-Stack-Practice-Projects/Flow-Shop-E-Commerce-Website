import { products } from "@wix/stores";
import Badge from "./Badge";

interface DiscountBadge {
  data: products.Discount;
}

export default function DiscountBadge({ data }: DiscountBadge) {
  if (data.type !== "PERCENT") {
    return null;
  }
  return <Badge>-{data.value}%</Badge>;
}
