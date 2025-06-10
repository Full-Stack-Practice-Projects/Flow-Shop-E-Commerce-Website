"use client";

import { Badge } from "@/components/badge";
import WixImage from "@/components/WixImage/WixImage";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";

interface ProductDetailsProps {
  product: products.Product;
}

const MAIN_MEDIA_IMAGE_WIDTH = 1000;
const MAIN_MEDIA_IMAGE_HEIGHT = 1000;

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={product.media?.mainMedia?.image?.url}
          alt={product.media?.mainMedia?.image?.altText}
          width={MAIN_MEDIA_IMAGE_WIDTH}
          height={MAIN_MEDIA_IMAGE_HEIGHT}
          className="sticky top-0"
        />
      </div>
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
        <ProductOptions product={product} />
      </div>
    </div>
  );
}
