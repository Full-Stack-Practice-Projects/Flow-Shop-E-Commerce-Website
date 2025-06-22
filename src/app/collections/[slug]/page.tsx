import { getWixServerClient } from "@/lib/wix-server.base";
import { getCollectionBySlug } from "@/wix-api/collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CollectionProducts from "./(components)/CollectionProducts";
import CollectionProductsLoadingSkeleton from "./(components)/CollectionProductsLoadingSkeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug,
  );

  if (!collection) {
    return notFound();
  }

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner?.url ? [{ url: banner.url }] : [],
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;

  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug,
  );

  if (!collection?._id) {
    return notFound();
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>
      {/** Whenever the page changes show a suspunse boundary */}
      <Suspense fallback={<CollectionProductsLoadingSkeleton />} key={page}>
        <CollectionProducts
          collectionId={collection._id}
          page={parseInt(page)}
        />
      </Suspense>
    </div>
  );
}
