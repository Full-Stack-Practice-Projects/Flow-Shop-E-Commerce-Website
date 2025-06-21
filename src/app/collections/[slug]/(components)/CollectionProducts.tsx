import PaginationBar from "@/components/paginationBar/PaginationBar";
import Product from "@/components/products/Product";
import { getWixServerClient } from "@/lib/wix-server.base";
import { queryProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";

interface CollectionProducts {
  collectionId: string;
  page: number;
}

export default async function CollectionProducts({
  collectionId,
  page,
}: CollectionProducts) {
  /** 12 sutable for our grid : 2,3,4 */
  const pageSize = 12;

  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  if (!collectionProducts) {
    return notFound();
  }

  if (page > (collectionProducts.totalPages || 1)) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {collectionProducts.items.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <PaginationBar
        currentPage={page}
        totalPages={collectionProducts.totalPages || 1}
      />
    </div>
  );
}
