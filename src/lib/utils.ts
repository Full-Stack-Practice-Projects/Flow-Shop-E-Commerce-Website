import { products } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./../../tailwind.config";

export const twConfig = resolveConfig(tailwindConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve, ms);
  });
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
  }).format(Number(price));
}

export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  if (!product.manageVariants) {
    return null;
  }
  /** Find the variant that has the combination of options that we selected */
  /* JSON data shape: variant:[choices:{key:value}]*/
  /** Find the variant where each selected options is identical to provided combinational from wix */

  const productVariant = product.variants?.find((variant) => {
    const selectedOptionsEntries = Object.entries(selectedOptions); // black, 10

    const isIdenticalChoices = selectedOptionsEntries.every(([key, value]) => {
      const variantChoiceValue = variant?.choices?.[key];
      return variantChoiceValue === value;
    });

    return isIdenticalChoices;
  });

  return productVariant || null;
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>,
) {
  const variant = findVariant(product, selectedOptions);

  if (!variant) {
    const isProductInStock =
      product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK;

    const isProductPartiallyOutOfStock =
      product.stock?.inventoryStatus ===
      products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;

    return isProductInStock || isProductPartiallyOutOfStock;
  }

  const isVariantInStock =
    variant.stock?.quantity !== 0 && variant.stock?.inStock;

  return isVariantInStock || false;
}
