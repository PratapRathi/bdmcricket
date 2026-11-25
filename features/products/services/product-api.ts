import { apiGet } from "@/lib/api/client";
import type { ProductBrowserFilters, ProductListResponse } from "@/features/products/types/product-api";

export async function fetchProducts(filters: ProductBrowserFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.categorySlug) params.set("category", filters.categorySlug);
  if (filters.subcategorySlug) params.set("subcategory", filters.subcategorySlug);
  params.set("sort", filters.sort);
  return apiGet<ProductListResponse>(`/api/products?${params.toString()}`);
}
