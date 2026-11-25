import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { staticPublicPaths } from "@/lib/config/site-routes";
import { getPublishedProductSlugs } from "@/lib/data/catalog";

const siteUrl = "https://www.bdmcricket.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const productSlugs = await getPublishedProductSlugs();
  const pages: MetadataRoute.Sitemap = staticPublicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  return [
    ...pages,
    ...productSlugs.map((slug) => ({
      url: `${siteUrl}/products/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
