import type { NextConfig } from "next";

// The content dashboard is hosted by Sanity; site.com/studio forwards editors there.
const STUDIO_URL = process.env.SANITY_STUDIO_URL ?? "https://skandiora.sanity.studio";

const nextConfig: NextConfig = {
  images: {
    // Images are resized by their source (Sanity, Unsplash, Pexels) rather than the Next.js optimizer.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
      { protocol: "https", hostname: "plus.unsplash.com", pathname: "/premium_photo-*" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/studio", destination: STUDIO_URL, permanent: false },
      { source: "/studio/:path*", destination: `${STUDIO_URL}/:path*`, permanent: false },
    ];
  },
};

export default nextConfig;
