import type { Metadata } from "next";
import { shareImage } from "@/lib/share-image";
import type { PageSeo } from "./content";

const BRAND = "Skandiora Immigration";

/**
 * Page metadata from the "Google & link preview" fields in Sanity, falling back to the
 * built-in title and description. The layout template appends " | Skandiora Immigration".
 */
export function pageMetadata(
  seo: PageSeo,
  fallback: { title: string; description: string; path: string; absoluteTitle?: boolean; brandFirst?: boolean },
): Metadata {
  const title = seo.title || fallback.title;
  const description = seo.description || fallback.description;
  // The home page leads with the brand ("Skandiora Immigration — …"); other pages end with it.
  const fullTitle = fallback.brandFirst ? `${BRAND} — ${title}` : `${title} | ${BRAND}`;
  const image = seo.shareImage
    ? { url: `${seo.shareImage.src}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: title }
    : shareImage;
  return {
    title: fallback.absoluteTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: fallback.path },
    openGraph: { title: fullTitle, description, url: fallback.path, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
