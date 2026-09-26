"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Site-wide image loader (see `images.loaderFile` in next.config.ts).
 *
 * Every image source used on this site resizes images itself, so each is asked for the exact
 * width the browser needs. Images never pass through the Next.js image optimizer, which avoids
 * hosting limits on it and keeps images working on any host.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // Local files in /public are small and served as they are.
  if (src.startsWith("/")) return `${src}?w=${width}`;

  const url = new URL(src);
  const q = String(quality ?? 75);

  if (url.hostname === "cdn.sanity.io") {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", q);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
  } else if (url.hostname.endsWith("unsplash.com")) {
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", q);
    url.searchParams.set("auto", "format");
  } else if (url.hostname === "images.pexels.com") {
    url.searchParams.set("w", String(width));
    url.searchParams.set("auto", "compress");
  }
  return url.toString();
}
