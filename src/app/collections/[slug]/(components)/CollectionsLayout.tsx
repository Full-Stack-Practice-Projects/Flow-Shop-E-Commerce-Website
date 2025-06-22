"use server";

import WixImage from "@/components/WixImage/WixImage";
import { cn } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-server.base";
import { getCollectionBySlug } from "@/wix-api/collections";
import { notFound } from "next/navigation";
import { LayoutProps } from "../layout";

export default async function CollectionsLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;

  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug,
  );

  if (!collection) {
    return notFound();
  }

  const banner = collection.media?.mainMedia?.image;

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex flex-col gap-10">
        {banner && (
          <div className="relative hidden sm:block">
            <WixImage
              mediaIdentifier={banner.url}
              width={1280}
              height={400}
              alt={banner.altText}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black">
              <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl font-bold text-white lg:text-5xl">
                {collection.name}
              </h1>
            </div>
          </div>
        )}
        <h1
          className={cn(
            "mx-auto text-3xl font-bold md:text-4xl",
            banner && "sm:hidden",
          )}
        >
          {collection.name}
        </h1>
      </div>
      {children}
    </main>
  );
}
