import { Skeleton } from "@/components/ui/skeleton";

export default function ProductResultsLoadingSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="mx-auto h-9 w-52" />
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => {
          return <Skeleton key={index} className="h-[26rem]" />;
        })}
      </div>
    </div>
  );
}
