import { products } from "@wix/stores";
import Link from "next/link";
import React from "react";
import { Badge, DiscountBadge } from "../badge/index";
import WixImage from "../WixImage/WixImage";
import { getFormattedPrice } from "./helpers/getFormmatedPrice";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  /*
   * We can resize this image via wixes server automatically.
   * next js can do the same but when we deploy it on vercel we actually pay for this because resizing require a compute power.
   * So we will use wixes server for free.
   */

  return (
    <Link href={`/products/${product.slug}`} className="h-full border bg-card">
      <div className="relative overflow-hidden">
        <WixImage
          scaleToFill
          width={700}
          height={700}
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge> {product.ribbon} </Badge>}
          {product.discount && <DiscountBadge data={product.discount} />}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}{" "}
          </Badge>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        {/**
         * When we have a text with a style tags we render this as html
         * This is called dangerously because you can actually hack a website by injecting HTML if a user generates HTML.
         */}
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{
            __html: product.description || "",
          }}
        />
      </div>
    </Link>
  );
}
