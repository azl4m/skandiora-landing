import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Link-preview image (WhatsApp, LinkedIn, Facebook, X). Built once at build time;
// it is never shown on the website itself. Applies to every page.
export const alt = "Skandiora Immigration — education guidance from Kochi, Trivandrum and Chennai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(join(process.cwd(), "assets/og", file));

export default async function OpengraphImage() {
  const [cormorant, jost, jostMedium, logo] = await Promise.all([
    asset("cormorant-garamond-latin-600-normal.ttf"),
    asset("jost-latin-400-normal.ttf"),
    asset("jost-latin-500-normal.ttf"),
    asset("logo-mark.png"),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 88px",
          backgroundColor: "#0f2240",
          backgroundImage: "radial-gradient(circle at 82% 12%, rgba(212,168,87,0.22), transparent 55%), linear-gradient(150deg, #13294b 0%, #0b1a33 100%)",
          fontFamily: "Jost",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Thin gold frame */}
        <div style={{ position: "absolute", top: 28, left: 28, right: 28, bottom: 28, border: "1px solid rgba(212,168,87,0.45)", display: "flex" }} />

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
        <img src={logoSrc} width={188} height={220} alt="" style={{ marginRight: 64 }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Cormorant", fontSize: 84, letterSpacing: 10, lineHeight: 1 }}>SKANDIORA</div>
          <div style={{ fontFamily: "Jost Medium", fontSize: 22, letterSpacing: 12, color: "#d4a857", marginTop: 14 }}>IMMIGRATION</div>
          <div style={{ width: 72, height: 2, background: "#d4a857", marginTop: 36, marginBottom: 32 }} />
          <div style={{ fontSize: 31, lineHeight: 1.35, color: "rgba(255,255,255,0.9)", maxWidth: 780 }}>
            Study abroad, MBBS, admissions and visa guidance.
          </div>
          <div style={{ fontFamily: "Jost Medium", fontSize: 22, letterSpacing: 5, color: "#e2c07f", marginTop: 28 }}>
            KOCHI · TRIVANDRUM · CHENNAI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, weight: 600, style: "normal" },
        { name: "Jost", data: jost, weight: 400, style: "normal" },
        { name: "Jost Medium", data: jostMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
