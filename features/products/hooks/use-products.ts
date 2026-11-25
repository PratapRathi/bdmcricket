"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Product } from "@/features/products/types/product.types";
import { fetchProducts } from "@/features/products/services/product-api";
import type { ProductBrowserFilters } from "@/features/products/types/product-api";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductBrowserFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
};

export function useProducts(filters: ProductBrowserFilters, initialProducts?: Product[]) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    ...(initialProducts ? { initialData: { data: initialProducts } } : {}),
    placeholderData: keepPreviousData,
  });
}
