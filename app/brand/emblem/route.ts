import { getLogoDataUrl } from "@/lib/cms/logo";

/**
 * The logo emblem served from the site's own address, so the 3D globe can draw it into a
 * WebGL texture without cross-origin restrictions. Uses the Sanity logo, or the built-in one.
 */
export async function GET() {
  const dataUrl = await getLogoDataUrl(256);
  const png = Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
  return new Response(png, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=300" } });
}
