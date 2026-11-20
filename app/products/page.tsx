import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ProductHubPage } from "@/components/products/category-page";

export const metadata: Metadata = {
  title: "Cricket Equipment | BDM Cricket",
  description: "Browse the BDM Cricket catalogue of bats, balls, protective equipment, and accessories.",
};

export default function ProductsPage() {
  return <Suspense fallback={<div className="min-h-screen bg-paper" />}><ProductsData /></Suspense>;
}

async function ProductsData() {
  await connection();
  return <ProductHubPage />;
}
