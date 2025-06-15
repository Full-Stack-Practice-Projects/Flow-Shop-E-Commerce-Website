/** We want our component to accept the attribuites of HTML image */

import { ImgHTMLAttributes } from "react";

type BaseImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
>;

export type ScaleToFillProps = {
  scaleToFill?: true;
  /** If we pass it as true we have to specify width, height */
  height: number;
  width: number;
};

export type NonScaleProps = {
  scaleToFill?: false;
};

type BaseWixImage = {
  /** from wix, url or string
   * wix know how to get real image url from it
   */
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
};

export type WixImageProps = BaseImageProps &
  BaseWixImage &
  (ScaleToFillProps | NonScaleProps);
