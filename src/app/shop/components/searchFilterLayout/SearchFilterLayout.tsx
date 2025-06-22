"use client";

import { collections } from "@wix/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import CollectionsFilter from "./components/CollectionsFilter";

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
  const [optimisticCollectionIds, setOptimisticCollectionIds] = useOptimistic(
    searchParams.getAll("collection"),
  );

  const [isPending, startTransition] = useTransition();

  /**
   * We know that the checkbox has to be selected if its collection id is a part of search param.
   * /shop?q=collection=value&collection=value2....
   */

  function updateFilters(collectionIds: string[]) {
    /** We need to pass searchParams to URLSearchParams constructor so if we have a prevSearchParams and we wanna to append more params to it. */
    const newSearchParams = new URLSearchParams(searchParams);
    /** We will update them with the new array. */
    newSearchParams.delete("collection");
    collectionIds.forEach((collectionId) => {
      newSearchParams.append("collection", collectionId);
    });
    /** ? to start search params otherwise it will not work */

    /**
     * React batches the states that means if there is 2 setState react make sure to make sure to render once instead of render two times.
     
    * This is fine, however what if a operation takes a long time to finish so the UI will blocked until this operation is finished (and this make first operation wait until second is finsihed.)

    * This is what really happend when we use router.push it takes a time until it navigate to new page and get the new data.
    
    * Using startTransition we can mark it as urgent so we tell the react to not block the UI during the operation that takes a long time instead we can use isPending state to display loader or something indicate about the transition state.

    * So it will make render when it is pending and another one when its success.
    * When its pending we can use the flag to display loader or something..
     */
    setOptimisticCollectionIds(collectionIds);

    startTransition(() => {
      /*
      if we setOptimisticCollectionIds here : 
        both your optimistic update and the navigation would be kicked off at low priority — i.e. your checkmark might not appear until after React has started processing the navigation. the user would feel a lag between clicking the checkbox and seeing it checked.
       */

      router.push(`?${newSearchParams.toString()}`);
    });
  }

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-5 py-10 lg:flex-row lg:items-start">
      <aside className="h-fit space-y-5 lg:sticky lg:top-10 lg:w-64">
        <CollectionsFilter
          collections={collections}
          selectedCollectionIds={optimisticCollectionIds}
          updateCollectionIds={updateFilters}
        />
      </aside>
      <div className="w-full max-w-7xl space-y-5">
        <div className="flex justify-center lg:justify-end">Sort filtter</div>
        {children}
      </div>
    </main>
  );
}
