import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage, ProductHubPage } from "@/components/products/category-page";
import { EditorialPage, getEditorialConfig } from "@/components/content/editorial-page";
import { sitePages } from "@/data/company";
import { categories } from "@/data/products";

export function generateStaticParams() {
  return sitePages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const editorial = getEditorialConfig(slug);
  if (editorial) {
    return { title: `${editorial.title.replace(/[.]$/, "")} | BDM Cricket`, description: editorial.metaDescription, alternates: { canonical: `/${slug}` } };
  }
  const category = categories.find((item) => item.slug === slug);
  return {
    title: `${category?.name ?? "Cricket Equipment"} | BDM Cricket`,
    description: category?.description ?? "Explore cricket equipment from the BDM range.",
    alternates: { canonical: `/${slug}` },
  };
}

export default async function SitePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  if (getEditorialConfig(slug)) return <EditorialPage slug={slug} />;
  if (slug === "cricket-equipment") return <ProductHubPage />;
  if (sitePages.includes(slug as (typeof sitePages)[number])) return <CategoryPage slug={slug} />;
  notFound();
}
