import { createClient, type QueryParams } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Read-only, published content. The API (not the CDN) is used so a page refreshed
// right after a webhook never picks up the previous version from the CDN.
const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-02-01", useCdn: false, perspective: "published" })
  : null;

/** Every Sanity fetch carries this tag; the publish webhook revalidates it. */
export const CMS_TAG = "sanity";

/**
 * Caching for Sanity requests. In production, content is cached until the publish webhook
 * refreshes it. During local development there is no webhook, so always fetch fresh content
 * and a published change shows on the next page refresh.
 */
export const cmsCache: Pick<RequestInit, "cache"> & { next?: { tags: string[] } } =
  process.env.NODE_ENV === "development" ? { cache: "no-store" } : { cache: "force-cache", next: { tags: [CMS_TAG] } };

/**
 * Fetch from Sanity. Returns null when Sanity isn't configured or the request fails,
 * so callers fall back to the built-in content instead of breaking the page.
 */
export async function cmsFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, cmsCache);
  } catch (error) {
    console.error("[cms] Sanity fetch failed, using built-in content:", error);
    return null;
  }
}
