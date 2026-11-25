"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/features/products/types/product.types";
import { useProducts } from "@/features/products/hooks/use-products";
import type { ProductBrowserFilters } from "@/features/products/types/product-api";
import { ProductCard } from "@/features/products/components/product-card";

type ProductBrowserProps = {
  products: Product[];
  categories: ProductCategory[];
  initialCategorySlug?: string;
  lockedCategorySlug?: string;
};

export function ProductBrowser({ products, categories, initialCategorySlug, lockedCategorySlug }: ProductBrowserProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategorySlug ?? "");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sort, setSort] = useState<ProductBrowserFilters["sort"]>("featured");
  const [visible, setVisible] = useState(12);
  const categorySlug = lockedCategorySlug ?? selectedCategory;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const availableSubcategories = useMemo(() => categories.flatMap((category) =>
    category.subcategories
      .filter((subcategory) => products.some((product) => product.categorySlug === category.slug && product.subcategorySlugs.includes(subcategory.slug)))
      .map((subcategory) => ({ ...subcategory, categorySlug: category.slug })),
  ), [categories, products]);

  const filters: ProductBrowserFilters = {
    query: debouncedQuery,
    categorySlug,
    subcategorySlug: selectedSubcategory,
    sort,
  };
  const hasDefaultFilters = !filters.query && !filters.categorySlug && !filters.subcategorySlug && filters.sort === "featured";
  const productsQuery = useProducts(filters, hasDefaultFilters ? products : undefined);
  const filtered = productsQuery.data?.data ?? [];

  function resetFilters() {
    setQuery("");
    setDebouncedQuery("");
    setSelectedCategory(lockedCategorySlug ?? "");
    setSelectedSubcategory("");
    setVisible(12);
  }

  return (
    <div>
      <div className="product-toolbar">
        <label className="product-search">
          <span className="sr-only">Search products</span>
          <span aria-hidden="true" className="text-lg text-ink/45">⌕</span>
          <input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(12); }} placeholder="Search the range" />
        </label>
        {!lockedCategorySlug && (
          <label className="filter-select">
            <span className="sr-only">Filter by category</span>
            <select value={selectedCategory} onChange={(event) => { setSelectedCategory(event.target.value); setSelectedSubcategory(""); setVisible(12); }}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
            </select>
          </label>
        )}
        <label className="filter-select">
          <span className="sr-only">Filter by subcategory</span>
          <select value={selectedSubcategory} onChange={(event) => { setSelectedSubcategory(event.target.value); setVisible(12); }}>
            <option value="">All subcategories</option>
            {categories
              .filter((category) => !categorySlug || category.slug === categorySlug)
              .map((category) => {
                const subcategories = availableSubcategories.filter((subcategory) => subcategory.categorySlug === category.slug);
                return subcategories.length ? <optgroup key={category.slug} label={category.name}>{subcategories.map((subcategory) => <option key={subcategory.slug} value={subcategory.slug}>{subcategory.name}</option>)}</optgroup> : null;
              })}
          </select>
        </label>
        <label className="filter-select">
          <span className="sr-only">Sort products</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as ProductBrowserFilters["sort"])}>
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <p className="ml-auto text-xs font-medium uppercase tracking-[0.14em] text-ink/45" aria-live="polite">
          {productsQuery.isPending || productsQuery.isPlaceholderData ? "Loading products" : `${filtered.length} products`}
        </p>
      </div>

      {productsQuery.isError && <div className="mb-6 rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm text-ink/70" role="alert">The catalogue could not be refreshed. {productsQuery.data ? "Showing the last available results." : "Please try again."}<button type="button" onClick={() => void productsQuery.refetch()} className="ml-2 font-semibold text-brand-red underline underline-offset-2">Retry</button></div>}

      {productsQuery.isError && !productsQuery.data ? (
        <div className="empty-state" role="status"><p className="font-display text-3xl font-semibold">The product range is temporarily unavailable.</p><button type="button" className="mt-5 text-sm font-semibold text-brand-red underline underline-offset-4" onClick={() => void productsQuery.refetch()}>Try again</button></div>
      ) : productsQuery.isPending ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[4/4.8] animate-pulse bg-ink/5" />)}</div>
      ) : filtered.length ? (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, visible).map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}
          </div>
          {visible < filtered.length && (
            <div className="mt-14 text-center">
              <button className="load-more" type="button" onClick={() => setVisible((amount) => amount + 12)}>Load more products <span aria-hidden="true">↓</span></button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state"><p className="font-display text-3xl font-semibold">No products match that search.</p><button type="button" className="mt-5 text-sm font-semibold text-brand-red underline underline-offset-4" onClick={resetFilters}>Clear filters</button></div>
      )}
    </div>
  );
}
