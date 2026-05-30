import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  // GitHub Pages serves files as-is; trailingSlash avoids 404s on deep links
  trailingSlash: true,
  // next/image optimization requires a Node server, which Pages doesn't provide
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
