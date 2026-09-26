import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cmsCache } from "./client";
import { getSettings } from "./content";

/**
 * The logo as a PNG data URL, for generated images (browser-tab icon, home-screen icon,
 * link-preview image). Uses the logo from Sanity, or the built-in one as a fallback.
 */
export async function getLogoDataUrl(height = 512) {
  const { site } = await getSettings();
  if (site.logoUrl) {
    try {
      const url = new URL(site.logoUrl);
      url.searchParams.set("h", String(height));
      url.searchParams.set("fm", "png");
      const response = await fetch(url, cmsCache);
      if (response.ok) return `data:image/png;base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
    } catch (error) {
      console.error("[cms] Could not load the logo from Sanity, using the built-in one:", error);
    }
  }
  const file = await readFile(join(process.cwd(), "assets/brand/logo-emblem.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}
