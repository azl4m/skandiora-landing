// Dependency-free so it can be used in client components without bundling the Sanity client.
// Resizing is handled site-wide by lib/image-loader.ts.

/** An image ready for <Image>: a URL, where to keep in focus, and whether it is hosted by Sanity. */
export type CmsImage = { src: string; objectPosition?: string; fromSanity: boolean };

/** Props to spread onto next/image for a CmsImage. */
export function imageProps(image: CmsImage) {
  return { src: image.src };
}
