"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/lib/catalog-types";
import { ProductCard } from "@/components/products/product-card";

type ProductBrowserProps = {
  products: Product[];
  categories: ProductCategory[];
  initialCategorySlug?: string;
  lockedCategorySlug?: string;
};

export function ProductBrowser({ products, categories, initialCategorySlug, lockedCategorySlug }: ProductBrowserProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategorySlug ?? "");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(12);
  const categorySlug = lockedCategorySlug ?? selectedCategory;

  const availableSubcategories = useMemo(() => categories.flatMap((category) =>
    category.subcategories
      .filter((subcategory) => products.some((product) => product.categorySlug === category.slug && product.subcategorySlugs.includes(subcategory.slug)))
      .map((subcategory) => ({ ...subcategory, categorySlug: category.slug })),
  ), [categories, products]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const categoryMatches = !categorySlug || product.categorySlug === categorySlug;
      const subcategoryMatches = !selectedSubcategory || product.subcategorySlugs.includes(selectedSubcategory);
      const subcategoryNames = product.subcategories.map((subcategory) => subcategory.name).join(" ");
      const searchable = `${product.name} ${product.category} ${subcategoryNames} ${product.specifications.map((item) => `${item.name} ${item.value}`).join(" ")}`.toLowerCase();
      return categoryMatches && subcategoryMatches && (!search || searchable.includes(search));
    });
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-low") result.sort((a, b) => priceValue(a.price) - priceValue(b.price));
    if (sort === "price-high") result.sort((a, b) => priceValue(b.price) - priceValue(a.price));
    return result;
  }, [products, query, categorySlug, selectedSubcategory, sort]);

  function resetFilters() {
    setQuery("");
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
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
        <p className="ml-auto text-xs font-medium uppercase tracking-[0.14em] text-ink/45">{filtered.length} products</p>
      </div>

      {filtered.length ? (
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

function priceValue(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : Number.MAX_SAFE_INTEGER;
}
