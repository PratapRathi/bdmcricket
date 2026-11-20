import type { NextConfig } from "next";
import { sitePages } from "./data/routes";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      { source: "/index.html", destination: "/" },
      ...sitePages.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
      })),
    ];
  },
};

export default nextConfig;
