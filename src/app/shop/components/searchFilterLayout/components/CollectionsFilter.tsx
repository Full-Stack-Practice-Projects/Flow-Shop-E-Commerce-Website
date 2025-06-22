import { Checkbox } from "@/components/ui/checkbox";
import { collections } from "@wix/stores";

interface CollectionsFilterProps {
  collections: collections.Collection[];
  selectedCollectionIds: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
}

export default function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
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
                  onCheckedChange={(isChecked) => {
                    const collectionIdsAfterSelect = [
                      ...selectedCollectionIds,
                      collectionId,
                    ];

                    const collectionIdsAfterUnselect =
                      selectedCollectionIds.filter((id) => {
                        return id !== collectionId;
                      });

                    const updatedCollectionIds = isChecked
                      ? collectionIdsAfterSelect
                      : collectionIdsAfterUnselect;

                    updateCollectionIds(updatedCollectionIds);
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
      {selectedCollectionIds.length > 0 && (
        <button
          onClick={() => updateCollectionIds([])}
          className="text-sm text-primary hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
