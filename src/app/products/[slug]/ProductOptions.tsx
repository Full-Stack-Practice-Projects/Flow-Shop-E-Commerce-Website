import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
}

export default function ProductOptions({ product }: ProductOptionsProps) {
  return <div className="space-y-2.5"></div>;
}
