import type { Metadata } from "next";
import { connection } from "next/server";
import { getCategoryBySlug } from "@/lib/data/catalog";
import { getEditorialConfig } from "@/lib/data/company";
import type { CategoryRouteSlug, EditorialRouteSlug } from "@/lib/config/site-routes";

const siteName = "BDM Cricket";

export async function getEditorialMetadata(slug: EditorialRouteSlug): Promise<Metadata> {
  await connection();
  const page = await getEditorialConfig(slug);
  if (!page) return { title: `${slug.replaceAll("-", " ")} | ${siteName}` };

  const title = `${page.title.replace(/[.]$/, "")} | ${siteName}`;
  const url = `/${slug}`;
  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title, description: page.metaDescription, url, siteName, type: "website" },
    twitter: { card: "summary", title, description: page.metaDescription },
  };
}

export async function getCategoryMetadata(slug: CategoryRouteSlug): Promise<Metadata> {
  await connection();
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: `Cricket equipment | ${siteName}` };

  const title = `${category.name} | ${siteName}`;
  const description = category.description || `Explore ${category.name.toLowerCase()} from BDM Cricket.`;
  const url = `/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName, type: "website" },
    twitter: { card: "summary", title, description },
  };
}
