import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/features/products/components/category-page";
import { getCategoryBySlug } from "@/lib/data/catalog";

type Props = PageProps<"/products/categories/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found | BDM Cricket" };
  const title = `${category.name} | BDM Cricket`;
  const description = category.description || `Explore ${category.name.toLowerCase()} from BDM Cricket.`;
  const url = `/products/categories/${slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName: "BDM Cricket", type: "website" }, twitter: { card: "summary", title, description } };
}

export default async function CustomCategoryPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryPage slug={slug} />;
}
