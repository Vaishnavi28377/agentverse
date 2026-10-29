import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubPages
    ? {
        basePath: "/agentverse",
        assetPrefix: "/agentverse/",
      }
    : {}),
};

export default nextConfig;
