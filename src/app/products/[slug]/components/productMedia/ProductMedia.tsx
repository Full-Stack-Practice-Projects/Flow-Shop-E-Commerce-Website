"use client";

import WixImage from "@/components/WixImage/WixImage";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import MediaPreview from "./components/MediaPreview";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

const MAIN_MEDIA_IMAGE_WIDTH = 1000;
const MAIN_MEDIA_IMAGE_HEIGHT = 1000;

export default function ProductMedia({ media }: ProductMediaProps) {
  // First media item is mainImage which is selected by default
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    /**
     * When we select a different options we still see something from prev selected options.
     * We still have the old options in selectedMedia state.
     * Therefore to solve this whenever the media change (we select a new option) setSelected media to first item of new choice.
     */
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) {
    return null;
  }

  const selectedImage = selectedMedia?.image;

  // we have multiple files with different reslutions (width, height) we want to select the large one files[0]
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="h-fit basis-2/5 space-y-5 md:sticky md:top-10">
      <div className="aspect-square bg-secondary">
        {selectedImage?.url ? (
          <Zoom key={selectedImage.url}>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText}
              width={MAIN_MEDIA_IMAGE_WIDTH}
              height={MAIN_MEDIA_IMAGE_HEIGHT}
              className="sticky top-0"
            />
          </Zoom>
        ) : selectedVideo?.url ? (
          <div className="flex size-full items-center bg-black">
            <video controls className="size-full">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>
      {media.length > 1 && (
        <div className="flex flex-wrap gap-5">
          {media.map((mediaItem) => {
            return (
              <MediaPreview
                key={mediaItem._id}
                mediaItem={mediaItem}
                isSelected={mediaItem?._id === selectedMedia?._id}
                onSelect={() => setSelectedMedia(mediaItem)}
                label={mediaItem._id!}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
