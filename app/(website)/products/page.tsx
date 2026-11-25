import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ProductHubPage } from "@/features/products/components/category-page";

const title = "Cricket Equipment | BDM Cricket";
const description = "Browse the BDM Cricket catalogue of bats, balls, protective equipment, and accessories.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: "/products", siteName: "BDM Cricket", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function ProductsPage() {
  return <Suspense fallback={<div className="min-h-screen bg-paper" />}><ProductsData /></Suspense>;
}

async function ProductsData() {
  await connection();
  return <ProductHubPage />;
}
