import Product from "@/components/products/Product";
import { getFeaturedProducts } from "../services/homePageServices";

export default async function FeaturedProductsSection() {
  const featuredProducts = await getFeaturedProducts();
  if (!featuredProducts) {
    return null;
  }

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
        <pre>{JSON.stringify(featuredProducts, null, 2)}</pre>
      </div>
    </section>
  );
}
