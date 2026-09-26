import { ImageResponse } from "next/og";
import { getLogoDataUrl } from "@/lib/cms/logo";

// Phone home-screen icon, generated from the logo in Sanity (Company details → Logo).
// iOS does not support transparency here, so the emblem sits on white with some padding.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await getLogoDataUrl();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
        <img src={logo} alt="" width={140} height={140} style={{ objectFit: "contain" }} />
      </div>
    ),
    size,
  );
}
