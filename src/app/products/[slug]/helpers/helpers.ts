import { products } from "@wix/stores";

export function getInitialProductOptionsRecord(product: products.Product) {
  const initialProductOptions: Array<{ [optionName: string]: string }> =
    product.productOptions?.map((option) => {
      const optionName = option.name || "";
      const optionDescription = option.choices?.[0].description || "";
      return {
        [optionName]: optionDescription,
      };
    }) || [];

  const initialProductOptionsRecord =
    initialProductOptions.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {}) || {};

  return initialProductOptionsRecord;
}
