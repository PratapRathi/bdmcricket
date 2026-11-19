import Image from "next/image";
import Link from "next/link";
import { categories, products } from "@/data/products";
import { ProductBrowser } from "@/components/products/product-browser";
import { ButtonLink } from "@/components/ui/button-link";

const equivalentCategories: Record<string, string[]> = {
  "cricket-wicketkeeping-gloves": ["cricket-wicketkeeping-gloves", "wicket-keeping-gloves"],
  "wicket-keeping-gloves": ["cricket-wicketkeeping-gloves", "wicket-keeping-gloves"],
};

export function CategoryPage({ slug }: { slug: string }) {
  if (slug === "cricket-equipment") return <ProductHubPage />;

  const acceptedSlugs = equivalentCategories[slug] ?? [slug];
  const category = categories.find((item) => item.slug === slug) ?? categories.find((item) => acceptedSlugs.includes(item.slug));
  const collection = products.filter((product) => acceptedSlugs.includes(product.categorySlug));
  const title = category?.name ?? "Cricket Equipment";
  const lead = category?.description ?? "Explore cricket equipment across the BDM range.";
  const heroProduct = collection[0];
  const darkCollection = slug === "cricket-bat" || slug === "bdm-english-willow-cricket-bat";

  return (
    <>
      <section className={`collection-hero ${darkCollection ? "collection-hero--dark" : ""}`} data-category={slug}>
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:px-12 lg:py-20">
          <div className="relative z-10">
            <p className={`eyebrow ${darkCollection ? "text-white/55" : "text-brand-red"}`}><Link href="/products" className="hover:underline">Equipment</Link><span className="mx-2 opacity-50">/</span>{title}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">{title}<span className="text-brand-red">.</span></h1>
            <p className={`mt-6 max-w-xl text-base leading-7 sm:text-lg ${darkCollection ? "text-white/60" : "text-ink/60"}`}>{lead} Explore the range and view available product information.</p>
            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-3xl font-semibold tracking-[-0.06em]">{collection.length.toString().padStart(2, "0")}</span>
              <span className={`h-8 w-px ${darkCollection ? "bg-white/25" : "bg-ink/20"}`} />
              <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${darkCollection ? "text-white/50" : "text-ink/50"}`}>Products in this collection</span>
            </div>
          </div>
          <div className="collection-hero-art relative mx-auto flex h-[280px] w-full max-w-[480px] items-center justify-center sm:h-[360px] lg:h-[430px]">
            {heroProduct && <Image src={heroProduct.image} alt={heroProduct.name} fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-contain mix-blend-multiply" />}
            <span className="collection-stamp">BDM<br />Cricket<br />Equipment</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] gap-3 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-12">
          {categories.map((item) => <Link key={item.slug} href={`/${item.slug}`} className={`category-pill ${item.slug === slug ? "is-active" : ""}`}>{item.name}</Link>)}
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <ProductBrowser products={collection} categories={[...new Set(collection.map((product) => product.category))]} initialCategory="All equipment" />
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

export function ProductHubPage() {
  return (
    <>
      <section className="page-hero bg-ink text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <p className="eyebrow text-white/50">Explore the BDM range</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Equipment for<br /><span className="text-brand-red">every part of the game.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">Browse bats, balls, protective gear, and accessories from the BDM catalogue.</p>
        </div>
      </section>
      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => {
              const product = products.find((item) => item.categorySlug === category.slug);
              return <Link key={category.slug} href={`/${category.slug}`} className={`hub-category hub-category-${(index % 4) + 1}`}>
                {product && <Image src={product.image} alt="" width={420} height={420} className="h-48 w-full object-contain mix-blend-multiply sm:h-64" />}
                <div className="mt-4 flex items-end justify-between gap-2"><div><h2 className="font-display text-xl font-semibold leading-tight tracking-[-0.04em]">{category.name}</h2><p className="mt-1 text-xs text-ink/55">{category.count} products</p></div><span aria-hidden="true" className="text-brand-red">↗</span></div>
              </Link>;
            })}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><h2 className="mb-10 font-display text-4xl font-semibold tracking-[-0.06em]">The complete catalogue</h2><ProductBrowser products={products} categories={[...new Set(products.map((product) => product.category))]} /></div></section>
    </>
  );
}
