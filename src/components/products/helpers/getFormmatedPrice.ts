import { formatCurrency } from "@/lib/utils";
import { products } from "@wix/stores";

export function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    const formattedMinPrice = formatCurrency(
      minPrice,
      product.priceData?.currency,
    );
    return `from ${formattedMinPrice}`;
  } else {
    const discountedPrice = product.priceData?.formatted?.discountedPrice;
    const productPrice = product.priceData?.formatted?.price;

    return discountedPrice || productPrice || "N/A";
  }
}
