/* eslint-disable @next/next/no-img-element */
import { media as wixMedia } from "@wix/sdk";
import { ScaleToFillProps, WixImageProps } from "./types";

const IMAGE_PLACE_HOLDER = "./../../../public/placeholder.png";

export default function WixImage({
  mediaIdentifier,
  placeholder = IMAGE_PLACE_HOLDER,
  alt,
  ...props
}: WixImageProps) {
  let imageUrl;

  if (!mediaIdentifier) {
    imageUrl = placeholder;
  } else if (props.scaleToFill || props.scaleToFill === undefined) {
    imageUrl = wixMedia.getScaledToFillImageUrl(
      mediaIdentifier,
      (props as ScaleToFillProps).width,
      (props as ScaleToFillProps).height,
      {},
    );
  } else {
    imageUrl = wixMedia.getImageUrl(mediaIdentifier).url;
  }

  /**
   * We use here <img/> instead of nextImage.
   * NextImage it resizes the image for us (power compution when deploy it on server).
   * If we use NextImag we need to whitelist wixURl's in next.config.js
   */

  delete props.scaleToFill;

  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
