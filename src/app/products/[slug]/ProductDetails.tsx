"use client";

import BackInStockNotificationButton from "@/components/back-in-stock/BackInStockNotificationButton";
import { Badge } from "@/components/badge";
import AddToCartButton from "@/components/cart/AddToCartButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkInStock, findVariant } from "@/lib/utils";
import { products } from "@wix/stores";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import ProductMedia from "./components/productMedia/ProductMedia";
import { getInitialProductOptionsRecord } from "./helpers/helpers";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const initialProductOptionsRecord = getInitialProductOptionsRecord(product);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(initialProductOptionsRecord);

  const selectedVariant = findVariant(product, selectedOptions);

  const isInStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded: boolean =
    !!availableQuantity && quantity > availableQuantity;

  // media items of the currently selected options.
  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    /**
     * Dose the options with a description is in our selected options
     */
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );

    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      {/**
       * We do not always have different variance that have images attached to them.
       * if we do not have fallback to all product media values : product.media?.items
       */}
      <ProductMedia
        media={
          !!selectedOptionsMedia?.length
            ? selectedOptionsMedia
            : product.media?.items
        }
      />
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground"> {product.brand}</div>
          )}
          {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}
        </div>
        {product.description && (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
            className="prose dark:prose-invert"
          />
        )}
        <ProductPrice product={product} selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="space-y-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex items-center gap-2.5">
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24"
              disabled={!isInStock}
            />
            {!!availableQuantity &&
              (availableQuantityExceeded || availableQuantity < 10) && (
                <span className="text-destructive">
                  Only {availableQuantity} left in stock.
                </span>
              )}
          </div>
        </div>
        {isInStock ? (
          <AddToCartButton
            product={product}
            selectedOptions={selectedOptions}
            quantity={quantity}
            disabled={availableQuantityExceeded || quantity < 1}
            className="w-full"
          />
        ) : (
          <BackInStockNotificationButton
            product={product}
            selectedOptions={selectedOptions}
            className="w-full"
          />
        )}
        {!!product.additionalInfoSections?.length && (
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <InfoIcon className="size-5" />
              <span>Additional product information</span>
            </span>
            <Accordion type="multiple">
              {product.additionalInfoSections.map((section) => {
                return (
                  <AccordionItem
                    key={section.title}
                    value={section.title || ""}
                  >
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.description || "",
                        }}
                        className="prose text-sm text-muted-foreground dark:prose-invert"
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
