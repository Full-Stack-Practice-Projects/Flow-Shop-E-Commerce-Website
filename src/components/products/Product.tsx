/* eslint-disable @next/next/no-img-element */
import { media as wixMedia } from "@wix/sdk";
import { products } from "@wix/stores";
import Link from "next/link";
import React from "react";

const IMAGE_PLACE_HOLDER = "./../../../public/placeholder.png";
const TARGET_HEIGHT = 700;
const TARGET_WIDTH = 700;

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  {
    /*
     * We can resize this image via wixes server automatically.
     * next js can do the same but when we deploy it on vercel we actually pay for this because resizing require a compute power.
     * So we will use wixes server for free.
     */
  }

  const resizedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFillImageUrl(
        mainImage.url,
        TARGET_WIDTH,
        TARGET_HEIGHT,
        {},
      )
    : null;

  /**
   * We use here <img/> instead of nextImage.
   * NextImage it resizes the image for us (power compution when deploy it on server).
   * If we use NextImag we need to whitelist wixURl's in next.config.js
   */

  return (
    <Link href={`/products/${product.slug}`} className="h-full border">
      <div className="overflow-hidden">
        <img
          src={resizedImageUrl || IMAGE_PLACE_HOLDER}
          alt={mainImage?.altText || ""}
          className="transition-transform duration-300 hover:scale-105"
        />
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
