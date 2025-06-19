import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

const ALL_PRODUCTS_CATEGORY_ID = "00000000-000000-000000-000000000001";
const FEATURED_PRODUCTS_CATEGORY_ID = "a08c43aa-7b2c-3ff5-5ef3-b264a053ff5f";

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", ALL_PRODUCTS_CATEGORY_ID)
      .ne("_id", FEATURED_PRODUCTS_CATEGORY_ID)
      .find();

    return collections.items;
  },
);
