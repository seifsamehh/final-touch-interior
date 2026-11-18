import type { NextConfig } from "next";

import { ROBOTS } from "./src/lib/site";

const fields = ["residential", "commercial", "hotel", "administrative", "landscape", "furniture"];

const config: NextConfig = {
  // AVIF first: the same photos in fewer bytes, WebP for browsers without it.
  images: { formats: ["image/avif", "image/webp"] },
  // The 2023 site's URLs keep working.
  async redirects() {
    return [
      { source: "/arabic", destination: "/ar", permanent: true },
      ...fields.flatMap((f) => [
        { source: `/${f}`, destination: `/en/work/${f}`, permanent: true },
        { source: `/${f}-ar`, destination: `/ar/work/${f}`, permanent: true },
      ]),
    ];
  },
  // The same indexing rule as the page tags, sent as a header so it also covers images and files.
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: ROBOTS }] },
      // font file names carry a hash of their content, so they can be cached for good
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default config;
