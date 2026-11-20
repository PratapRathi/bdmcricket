import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { CategoryPage } from "@/components/products/category-page";
import { EditorialPage } from "@/components/content/editorial-page";
import { getCategoryBySlug, getLegacyRedirect } from "@/lib/data/catalog";
import { getEditorialConfig } from "@/lib/data/company";

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const editorial = await getEditorialConfig(slug);
  if (editorial) {
    return { title: `${editorial.title.replace(/[.]$/, "")} | BDM Cricket`, description: editorial.metaDescription, alternates: { canonical: `/${slug}` } };
  }
  const legacyRedirect = await getLegacyRedirect(slug);
  if (legacyRedirect) return { alternates: { canonical: legacyRedirect.split("#")[0] } };
  const category = await getCategoryBySlug(slug);
  return {
    title: `${category?.name ?? "Cricket Equipment"} | BDM Cricket`,
    description: category?.description ?? "Explore cricket equipment from the BDM range.",
    alternates: { canonical: `/${slug}` },
  };
}

export default function SitePage({ params }: PageProps<"/[slug]">) {
  return <Suspense fallback={<div className="min-h-screen bg-paper" />}><SitePageData params={params} /></Suspense>;
}

async function SitePageData({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  if (await getEditorialConfig(slug)) return <EditorialPage slug={slug} />;
  const legacyRedirect = await getLegacyRedirect(slug);
  if (legacyRedirect) redirect(legacyRedirect);
  if (await getCategoryBySlug(slug)) return <CategoryPage slug={slug} />;
  notFound();
}
