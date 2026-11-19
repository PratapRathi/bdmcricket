import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/products/product-detail-page";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Product | BDM Cricket" };
  return {
    title: `${product.name} | BDM Cricket`,
    description: `${product.name} from the BDM ${product.category.toLowerCase()} range.${product.price ? ` Listed at ${product.price}.` : ""}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  if (!products.some((product) => product.slug === slug)) notFound();
  return <ProductDetailPage slug={slug} />;
}
