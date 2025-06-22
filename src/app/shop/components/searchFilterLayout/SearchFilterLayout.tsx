"use client";

import { collections } from "@wix/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import CollectionsFilter from "./components/CollectionsFilter";
import PriceFilter from "./components/PriceFilter";

interface SearchFilterLayoutProps {
  collections: collections.Collection[];
  children: React.ReactNode;
}

export default function SearchFilterLayout({
  collections,
  children,
}: SearchFilterLayoutProps) {
  /** This search filtter edit on the url so it client component.
   * the other parts will be server component -> {children}
   */
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * useOptimistic introduce in React 19.
   * I think using React query for this simple task is bit overkill.
   */
  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    collection: searchParams.getAll("collection"),
    price_min: searchParams.get("price_min") || undefined,
    price_max: searchParams.get("price_max") || undefined,
  });

  const [isPending, startTransition] = useTransition();

  /**
   * We know that the checkbox has to be selected if its collection id is a part of search param.
   * /shop?q=collection=value&collection=value2....
   */

  function updateFilters(updateFilters: Partial<typeof optimisticFilters>) {
    const newOptimisticFilters = { ...optimisticFilters, ...updateFilters };

    /** We need to pass searchParams to URLSearchParams constructor so if we have a prevSearchParams and we wanna to append more params to it. */
    const newSearchParams = new URLSearchParams(searchParams);

    /**
     * The Object.entries() method returns an array of the key/value pairs of an object.
     * The Object.entries() method does not change the original object.
     */
    Object.entries(newOptimisticFilters).forEach(([key, value]) => {
      /** Delete it to set a new value of it. */
      newSearchParams.delete(key);

      if (Array.isArray(value)) {
        /** loop through collections values */
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        /** Add the new value to the url */
        newSearchParams.set(key, value);
      }
    });

    /** If we change the filters we usually want to start at page 1 */
    newSearchParams.delete("page");

    /** ? to start search params otherwise it will not work */

    /**
     * React batches the states that means if there is 2 setState react make sure to make sure to render once instead of render two times.
     
    * This is fine, however what if a operation takes a long time to finish so the UI will blocked until this operation is finished (and this make first operation wait until second is finsihed.)

    * This is what really happend when we use router.push it takes a time until it navigate to new page and get the new data.
    
    * Using startTransition we can mark it as urgent so we tell the react to not block the UI during the operation that takes a long time instead we can use isPending state to display loader or something indicate about the transition state.

    * So it will make render when it is pending and another one when its success.
    * When its pending we can use the flag to display loader or something..
     */

    startTransition(() => {
      /**
       * React treats optimistic updates as transitions, meaning they should be scheduled with low priority.
       * useOptimistic updates must be inside startTransition so React can handle them as non-blocking, deferred updates and keep your UI responsive (non blocking)
       */
      setOptimisticFilters(newOptimisticFilters);
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return (
    <main className="group flex flex-col items-center justify-center gap-10 px-5 py-10 lg:flex-row lg:items-start">
      <aside
        className="h-fit space-y-5 lg:sticky lg:top-10 lg:w-64"
        data-pending={isPending ? "" : undefined}
      >
        <CollectionsFilter
          collections={collections}
          selectedCollectionIds={optimisticFilters.collection}
          updateCollectionIds={(collectionIds) =>
            updateFilters({
              collection: collectionIds,
            })
          }
        />
        <PriceFilter
          minDefaultPrice={optimisticFilters.price_min || ""}
          maxDefaultPrice={optimisticFilters.price_max || ""}
          updatePriceRange={(priceMin, priceMax) =>
            updateFilters({
              price_min: priceMin,
              price_max: priceMax,
            })
          }
        />
      </aside>
      <div className="w-full max-w-7xl space-y-5">
        <div className="flex justify-center lg:justify-end">Sort filtter</div>
        {children}
      </div>
    </main>
  );
}
