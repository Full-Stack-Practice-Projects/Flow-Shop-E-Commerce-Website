import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProductsLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-5 pt-12 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => {
        return <Skeleton key={index} className="h-[26rem] w-full" />;
      })}
    </div>
  );
}
