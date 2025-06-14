import WixImage from "@/components/WixImage/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import { getResolvedThumbnailUrl } from "../helpers/getResolvedThumbnailUrl";

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
  label: string;
}

const MAX_MEDIA_WIDTH = 100;
const MAX_MEDIA_HEIGHT = 100;

function MediaPreview({
  mediaItem,
  isSelected,
  onSelect,
  label,
}: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;

  const thumbnailUrl = mediaItem.thumbnail?.url;

  const resolvedThumbnailUrl = getResolvedThumbnailUrl({
    thumbnailUrl,
    stillFrameMediaId,
  });

  if (!imageUrl && !resolvedThumbnailUrl) {
    return null;
  }

  console.log(`Is selected ${isSelected}`, label);

  return (
    <div
      className={cn(
        "relative cursor-pointer bg-secondary",
        isSelected && "outline-5 outline outline-primary",
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || resolvedThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        width={MAX_MEDIA_WIDTH}
        height={MAX_MEDIA_HEIGHT}
        onMouseEnter={onSelect}
      />
      {resolvedThumbnailUrl && (
        <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40">
          <PlayIcon className="size-5 text-white/60" />
        </span>
      )}
    </div>
  );
}

export default MediaPreview;
