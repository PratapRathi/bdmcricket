import type { NextConfig } from "next";
import { editorialRouteSlugs, legacyRouteRedirects } from "./lib/config/site-routes";

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
  async redirects() {
    const editorialAliases = editorialRouteSlugs.map((slug) => ({
      source: `/${slug}.html`,
      destination: `/${slug}`,
      permanent: true,
    }));
    const legacyAliases = Object.entries(legacyRouteRedirects).flatMap(([slug, destination]) => [
      { source: `/${slug}`, destination, permanent: true },
      { source: `/${slug}.html`, destination, permanent: true },
    ]);

    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...editorialAliases,
      ...legacyAliases,
    ];
  },
};

export default nextConfig;
