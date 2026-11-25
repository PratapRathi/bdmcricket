import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { staticPublicPaths } from "@/lib/config/site-routes";
import { getCategories, getPublishedProductSlugs } from "@/lib/data/catalog";
import { categoryRouteSlugs } from "@/lib/config/site-routes";

const siteUrl = "https://www.bdmcricket.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const [productSlugs, categories] = await Promise.all([getPublishedProductSlugs(), getCategories()]);
  const pages: MetadataRoute.Sitemap = staticPublicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  return [
    ...pages,
    ...categories.filter((category) => !categoryRouteSlugs.includes(category.slug as (typeof categoryRouteSlugs)[number])).map((category) => ({
      url: `${siteUrl}/products/categories/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...productSlugs.map((slug) => ({
      url: `${siteUrl}/products/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
