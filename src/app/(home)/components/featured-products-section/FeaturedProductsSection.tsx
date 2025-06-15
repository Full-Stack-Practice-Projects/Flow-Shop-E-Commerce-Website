import Product from "@/components/products/Product";
import { getWixServerClient } from "@/lib/wix-server.base";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";

export default async function FeaturedProductsSection() {
  const wixClient = await getWixServerClient();

  const collection = await getCollectionBySlug(wixClient, "featured-products");
  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  return (
    <section>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.items.map((featuredProduct) => {
            return (
              <Product key={featuredProduct._id} product={featuredProduct} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
