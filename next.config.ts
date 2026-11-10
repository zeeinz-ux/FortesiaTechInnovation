import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isGithubPages ? { output: "export" as const } : {}),
};

export default nextConfig;
