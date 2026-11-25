import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProducts, getProductsByCategorySlug } from "@/lib/data/catalog";
import type { Product, ProductCategory } from "@/features/products/types/product.types";
import { ProductBrowser } from "@/features/products/components/product-browser";
import { ButtonLink } from "@/components/ui/button-link";
import { getCategoryHref } from "@/lib/config/category-route";

export async function CategoryPage({ slug }: { slug: string }) {
  const [category, collection] = await Promise.all([getCategoryBySlug(slug), getProductsByCategorySlug(slug)]);
  if (!category) notFound();

  const darkCollection = category.slug === "bats" || category.slug === "balls";
  const heroProduct = collection[0];

  return (
    <>
      <section className={`collection-hero ${darkCollection ? "collection-hero--dark" : ""}`} data-category={category.slug}>
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:px-12 lg:py-20">
          <div className="relative z-10">
            <p className={`eyebrow ${darkCollection ? "text-white/55" : "text-brand-red"}`}><Link href="/products" className="hover:underline">Equipment</Link><span className="mx-2 opacity-50">/</span>{category.name}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">{category.name}<span className="text-brand-red">.</span></h1>
            <p className={`mt-6 max-w-xl text-base leading-7 sm:text-lg ${darkCollection ? "text-white/60" : "text-ink/60"}`}>{category.description}</p>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-3xl font-semibold tracking-[-0.06em]">{collection.length.toString().padStart(2, "0")}</span>
              <span className={`h-8 w-px ${darkCollection ? "bg-white/25" : "bg-ink/20"}`} />
              <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${darkCollection ? "text-white/50" : "text-ink/50"}`}>Products in this category</span>
            </div>
          </div>
          <div className="collection-hero-art relative mx-auto flex h-[280px] w-full max-w-[480px] items-center justify-center sm:h-[360px] lg:h-[430px]">
            {heroProduct && <Image src={heroProduct.image} alt={heroProduct.name} fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-contain mix-blend-multiply" />}
            <span className="collection-stamp">BDM<br />Cricket<br />Equipment</span>
          </div>
        </div>
        <nav aria-label={`${category.name} subcategories`} className="mx-auto flex max-w-[1440px] gap-3 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-12">
          {category.subcategories.map((subcategory) => <Link key={subcategory.slug} href={`#${subcategory.slug}`} className="category-pill">{subcategory.name}</Link>)}
        </nav>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1440px] space-y-16 px-5 sm:px-8 lg:px-12 lg:space-y-20">
          <ProductBrowser products={collection} categories={[category]} lockedCategorySlug={category.slug} groupBySubcategory />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div><p className="eyebrow text-brand-red">Need a hand?</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em]">Talk with the BDM team about this range.</h2></div>
          <ButtonLink href="/enquiry" variant="dark">Get in touch</ButtonLink>
        </div>
      </section>
    </>
  );
}

export async function ProductHubPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <>
      <section className="page-hero bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="eyebrow text-white/50">Explore the BDM range</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Equipment for<br /><span className="text-brand-red">every part of the game.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">Browse bats, balls, kit bags, protective gear, accessories, and cricket clothing.</p>
        </div>
      </section>
      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => <CategoryHubCard key={category.slug} category={category} product={products.find((item) => item.categorySlug === category.slug)} index={index} />)}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><h2 className="mb-10 font-display text-4xl font-semibold tracking-[-0.06em]">The complete catalogue</h2><ProductBrowser products={products} categories={categories} /></div></section>
    </>
  );
}

function CategoryHubCard({ category, product, index }: { category: ProductCategory; product?: Product; index: number }) {
  return (
    <article className={`hub-category hub-category-${(index % 4) + 1} p-4 sm:p-6`}>
      <Link href={getCategoryHref(category.slug)} className="group block">
        {product && <div className="relative mb-4 h-48 sm:h-64"><Image src={product.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" /></div>}
        <div className="flex items-end justify-between gap-2"><div><h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.04em]">{category.name}</h2><p className="mt-1 text-xs text-ink/55">{category.count} products</p></div><span aria-hidden="true" className="text-brand-red">↗</span></div>
      </Link>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
        {category.subcategories.map((subcategory) => <Link key={subcategory.slug} href={`${getCategoryHref(category.slug)}#${subcategory.slug}`} className="rounded-full border border-ink/10 px-3 py-1.5 text-[10px] font-medium text-ink/60 transition-colors hover:border-ink hover:text-ink">{subcategory.name}</Link>)}
      </div>
    </article>
  );
}
