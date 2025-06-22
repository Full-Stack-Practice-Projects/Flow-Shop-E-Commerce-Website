import { ProductsSort } from "@/wix-api/products";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductResults from "./components/ProductResults";
import ProductResultsLoadingSkeleton from "./components/ProductResultsLoadingSkeleton";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    collection?: string[];
    price_min?: string;
    price_max?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: q ? `Results for ${q}` : `Products`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const {
    q,
    collection: collectionIds,
    page = "1",
    price_min,
    price_max,
    sort,
  } = await searchParams;
  const title = q ? `Results for ${q}` : `Products`;

  return (
    <div className="space-y-10">
      <h1 className="text-center text-3xl font-bold md:text-4xl">{title}</h1>
      {/** Makes Suspense changes based on the change of page and q */}
      <Suspense
        fallback={<ProductResultsLoadingSkeleton />}
        key={`${q}-${page}`}
      >
        <ProductResults
          collectionIds={collectionIds}
          page={parseInt(page)}
          q={q}
          priceMin={price_min ? parseInt(price_min) : undefined}
          priceMax={price_max ? parseInt(price_max) : undefined}
          sort={sort as ProductsSort}
        />
      </Suspense>
    </div>
  );
}
