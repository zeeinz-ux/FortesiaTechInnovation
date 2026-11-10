import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export untuk GitHub Pages / CDN statis tanpa server Node
  output: isProd ? "export" : undefined,
  
  // Disable server-side image optimizer untuk export statis
  images: { unoptimized: true },
  
  // Konsistensi trailing slash untuk GitHub Pages
  trailingSlash: true,
};

export default nextConfig;

