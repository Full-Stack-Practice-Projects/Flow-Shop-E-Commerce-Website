"use client";

import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((productOption) => {
        return (
          <fieldset key={productOption.name} className="space-y-1.5">
            <legend>
              <Label asChild>
                <span>{productOption.name}</span>
              </Label>
            </legend>
            <div className="flex flex-wrap items-center gap-1.5">
              {productOption.choices?.map((choice) => {
                return (
                  <div key={choice.description}>
                    <input
                      id={choice.description}
                      name={productOption.name}
                      type="radio"
                      value={choice.description}
                      checked={
                        selectedOptions[productOption.name || ""] ===
                        choice.description
                      }
                      onChange={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [productOption.name || ""]: choice.description || "",
                        })
                      }
                      className="peer hidden"
                    />
                    <Label
                      htmlFor={choice.description}
                      className={cn(
                        "flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border p-2 peer-checked:border-primary",
                        // Check if the combintion of options not availlable in the stock
                        !checkInStock(product, {
                          // Currently selected options
                          ...selectedOptions,
                          // the options that this label belongs to
                          [productOption.name || ""]: choice.description || "",
                        }) && "opacity-50",
                      )}
                    >
                      {productOption.optionType ===
                        products.OptionType.color && (
                        <span
                          className="size-4 rounded-full border"
                          style={{
                            backgroundColor: choice.value,
                          }}
                        />
                      )}
                      <span> {choice.description}</span>
                    </Label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
