import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/cms/logo";

// Browser-tab icon, generated from the logo in Sanity (Company details → Logo).
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await getLogoDataUrl();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
        <img src={logo} alt="" width={184} height={184} style={{ objectFit: "contain" }} />
      </div>
    ),
    size,
  );
}
