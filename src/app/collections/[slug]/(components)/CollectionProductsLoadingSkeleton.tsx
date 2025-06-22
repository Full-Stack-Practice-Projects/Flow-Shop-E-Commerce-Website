import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => {
        return <Skeleton key={index} className="h-[26rem] w-full" />;
      })}
    </div>
  );
}
