import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetailPage } from "@/features/products/components/product-detail-page";
import { getProductBySlug } from "@/lib/data/catalog";

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product | BDM Cricket" };
  return {
    title: `${product.name} | BDM Cricket`,
    description: `${product.name} from the BDM ${product.category.toLowerCase()} range.${product.price ? ` Listed at ${product.price}.` : ""}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | BDM Cricket`,
      description: `${product.name} from the BDM ${product.category.toLowerCase()} range.${product.price ? ` Listed at ${product.price}.` : ""}`,
      url: `/products/${product.slug}`,
      siteName: "BDM Cricket",
      type: "website",
      images: [product.image],
    },
    twitter: { card: "summary_large_image", title: `${product.name} | BDM Cricket`, images: [product.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return <Suspense fallback={<div className="min-h-screen bg-paper" />}><ProductData params={params} /></Suspense>;
}

async function ProductData({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  if (!(await getProductBySlug(slug))) notFound();
  return <ProductDetailPage slug={slug} />;
}
