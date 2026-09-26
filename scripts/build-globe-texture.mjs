// Builds the globe surface texture (public/globe-texture.webp) from the country shapes in
// public/earth-map.svg: a muted slate-blue ocean and antique parchment land with a mottled,
// slightly raised finish — the look of a classic desk globe.
//
//   node scripts/build-globe-texture.mjs
//
// Colours and texture strength are the constants below; re-run after changing them.
import { readFileSync } from "node:fs";
import sharp from "sharp";

const OCEAN = ["#4f6c88", "#3a5673", "#2b425c"]; // top → bottom
const LAND = ["#f6f3ec", "#e6ded0", "#d2c6ae"]; // top → bottom (lighter than the reference: the globe's warm lighting deepens it)
const COAST = "#6f5535";
const WIDTH = 2048;
const HEIGHT = 1024;

const source = readFileSync("public/earth-map.svg", "utf8");
const paths = source.match(/<path [^>]*\/>/g)?.join("") ?? "";
if (!paths) throw new Error("No country shapes found in public/earth-map.svg");

const stops = (colors) => colors.map((color, i) => `<stop offset="${i / (colors.length - 1)}" stop-color="${color}"/>`).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
<defs>
  <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">${stops(OCEAN)}</linearGradient>
  <linearGradient id="land" x1="0" y1="0" x2="0.25" y2="1">${stops(LAND)}</linearGradient>

  <!-- Fine paper grain over the whole surface -->
  <filter id="grain" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" filterUnits="userSpaceOnUse">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" seed="4" result="noise"/>
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" result="specks"/>
    <feComposite in="specks" in2="SourceGraphic" operator="over"/>
  </filter>

  <!-- Soft ocean mottling so the water isn't flat -->
  <filter id="water" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" filterUnits="userSpaceOnUse">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.009" numOctaves="3" seed="11" result="noise"/>
    <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0" result="light"/>
    <feComposite in="light" in2="SourceGraphic" operator="over"/>
  </filter>

  <!-- Parchment land: mottled tone plus gentle relief lit from the upper left -->
  <filter id="parchment" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" filterUnits="userSpaceOnUse">
    <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="5" seed="7" result="noise"/>
    <feColorMatrix in="noise" type="matrix" values="0.35 0.12 0 0 0.62  0.3 0.12 0 0 0.58  0.22 0.12 0 0 0.52  0 0 0 0 1" result="mottle"/>
    <feBlend in="SourceGraphic" in2="mottle" mode="multiply" result="toned"/>
    <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="soft"/>
    <feDiffuseLighting in="soft" surfaceScale="2" diffuseConstant="1.2" lighting-color="#ffffff" result="lit">
      <feDistantLight azimuth="225" elevation="52"/>
    </feDiffuseLighting>
    <feBlend in="toned" in2="lit" mode="multiply" result="shaded"/>
    <feComposite in="shaded" in2="SourceAlpha" operator="in"/>
  </filter>
</defs>
<g filter="url(#grain)">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ocean)" filter="url(#water)"/>
  <g fill="url(#land)" fill-rule="evenodd" filter="url(#parchment)">${paths}</g>
  <g fill="none" stroke="${COAST}" stroke-width="0.9" stroke-opacity="0.75" stroke-linejoin="round">${paths}</g>
</g>
</svg>`;

const out = "public/globe-texture.webp";
const info = await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(out);
console.log(`Wrote ${out}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`);
