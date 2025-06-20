import Product from "@/components/products/Product";
import { getWixServerClient } from "@/lib/wix-server.base";
import { queryProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";

interface CollectionProducts {
  collectionId: string;
}

export default async function CollectionProducts({
  collectionId,
}: CollectionProducts) {
  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
  });

  if (!collectionProducts) {
    return notFound();
  }

  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {collectionProducts.items.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
}
