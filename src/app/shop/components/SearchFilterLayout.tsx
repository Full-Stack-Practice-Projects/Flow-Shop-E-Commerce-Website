"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { collections } from "@wix/stores";
import { useRouter, useSearchParams } from "next/navigation";

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
   * We know that the checkbox has to be selected if its collection id is a part of search param.
   * /shop?q=collection=value&collection=value2....
   */
  const selectedCollectionIds = searchParams.getAll("collection");

  function updateFilters(collectionIds: string[]) {
    /** We need to pass searchParams to URLSearchParams constructor so if we have a prevSearchParams and we wanna to append more params to it. */
    const newSearchParams = new URLSearchParams(searchParams);
    /** We will update them with the new array. */
    newSearchParams.delete("collection");
    collectionIds.forEach((collectionId) => {
      newSearchParams.append("collection", collectionId);
    });
    /** ? to start search params otherwise it will not work */
    router.push(`?${newSearchParams.toString()}`);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-5 py-10 lg:flex-row lg:items-start">
      <aside className="h-fit space-y-5 lg:sticky lg:top-10 lg:w-64">
        <div className="space-y-3">
          <div className="font-bold">Collections</div>
          <ul className="space-y-1.5">
            {collections.map((collection) => {
              const collectionId = collection._id;
              if (!collectionId) {
                return null;
              }
              return (
                <li key={collectionId}>
                  {/** Label is the text next to checkbox
                   * The is 2 way to define the label checkbox:
                   * Either by putting <label></label> and next to it <CheckBox> and connect them using id.
                   * or by putting <CheckBox> inside of <label></label> it will be connected automatically.
                   */}
                  <label className="flex cursor-pointer items-center gap-2 font-medium">
                    <Checkbox
                      id={collectionId}
                      checked={selectedCollectionIds.includes(collectionId)}
                      onCheckedChange={(checked) => {
                        const collectionIdsAfterSelect = [
                          ...selectedCollectionIds,
                          collectionId,
                        ];

                        const collectionIdsAfterUnselect =
                          selectedCollectionIds.filter((id) => {
                            return id !== collectionId;
                          });

                        const updatedCollectionIds = checked
                          ? collectionIdsAfterSelect
                          : collectionIdsAfterUnselect;

                        updateFilters(updatedCollectionIds);
                      }}
                    />
                    <span className="line-clamp-1 break-all">
                      {collection.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="w-full max-w-7xl space-y-5">
        <div className="flex justify-center lg:justify-end">Sort filtter</div>
        {children}
      </div>
    </main>
  );
}
