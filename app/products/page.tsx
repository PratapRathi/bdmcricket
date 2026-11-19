import type { Metadata } from "next";
import { ProductHubPage } from "@/components/products/category-page";

export const metadata: Metadata = {
  title: "Cricket Equipment | BDM Cricket",
  description: "Browse the BDM Cricket catalogue of bats, balls, protective equipment, and accessories.",
};

export default function ProductsPage() {
  return <ProductHubPage />;
}
