import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site is served as plain files; no Node runtime in prod.
  output: "export",
  // next/image's optimizer needs a server. With static export there is none,
  // so we serve raw image bytes.
  images: { unoptimized: true },
};

export default nextConfig;
