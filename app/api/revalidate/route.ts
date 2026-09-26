import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { CMS_TAG } from "@/lib/cms/client";

/**
 * Called by a Sanity webhook whenever content is published, so the site shows the change
 * on the next page load. The request must be signed with SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: "Revalidation is not configured" }, { status: 500 });

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // `expire: 0`: the next visitor gets the fresh content immediately rather than one stale view.
  revalidateTag(CMS_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
