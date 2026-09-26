import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./client";
import type { CmsImage } from "./image-loader";

export { imageProps, type CmsImage } from "./image-loader";

/** A Sanity image field as returned by GROQ (asset reference plus optional crop and focus point). */
export type SanityImageSource = {
  asset?: { _ref?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function cmsImage(source: SanityImageSource | null | undefined): CmsImage | null {
  if (!builder || !source?.asset?._ref) return null;
  const { hotspot } = source;
  return {
    src: builder.image(source).url(),
    objectPosition: hotspot ? `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%` : undefined,
    fromSanity: true,
  };
}

export function externalImage(src: string): CmsImage {
  return { src, fromSanity: false };
}
