import type { Product } from "@/features/products/types/product.types";

export type ProductBrowserFilters = {
  query: string;
  categorySlug: string;
  subcategorySlug: string;
  sort: "featured" | "name" | "price-low" | "price-high";
};

export type ProductListResponse = { data: Product[] };
