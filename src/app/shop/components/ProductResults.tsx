import PaginationBar from "@/components/paginationBar/PaginationBar";
import Product from "@/components/products/Product";
import { getWixServerClient } from "@/lib/wix-server.base";
import { queryProducts } from "@/wix-api/products";
import { notFound } from "next/navigation";

interface ProductResultsProps {
  q?: string;
  page: number;
  collectionIds?: string[];
  priceMin?: number;
  priceMax?: number;
}

export default async function ProductResults({
  q,
  page,
  collectionIds,
  priceMin,
  priceMax,
}: ProductResultsProps) {
  const pageSize = 12;

  const wixServerClient = await getWixServerClient();

  const products = await queryProducts(wixServerClient, {
    q,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    collectionIds,
    priceMin,
    priceMax,
  });

  if (page > (products.totalPages || 1)) {
    return notFound();
  }

  return (
    <div className="space-y-10 group-has-[[data-pending]]:animate-pulse">
      <p className="text-center text-xl">
        {products.totalCount}
        {"  "}
        {products.totalCount === 1 ? "product" : "products"} found
      </p>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid xl:grid-cols-3 2xl:grid-cols-4">
        {products.items.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <PaginationBar currentPage={page} totalPages={products.totalPages || 1} />
    </div>
  );
}
