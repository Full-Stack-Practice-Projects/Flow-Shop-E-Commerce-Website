import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CollectionsLoadingSkeleton() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <Skeleton className="mx-auto h-10 w-48 sm:block sm:aspect-[1280/400] sm:h-full sm:w-full" />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => {
            return <Skeleton key={index} className="h-[26rem] w-full" />;
          })}
        </div>
      </div>
    </main>
  );
}
