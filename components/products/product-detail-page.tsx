import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { ProductGallery } from "@/components/products/product-gallery";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12">
          <p className="text-xs font-medium text-ink/45"><Link href="/products" className="hover:text-brand-red">Equipment</Link><span className="mx-2">/</span><Link href={`/${product.categorySlug}`} className="hover:text-brand-red">{product.category}</Link><span className="mx-2">/</span><span className="text-ink/75">{product.name}</span></p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <Reveal className="min-w-0"><ProductGallery product={product} /></Reveal>
            <Reveal className="flex flex-col justify-center pb-8 lg:py-12">
              <p className="eyebrow text-brand-red">{product.category}</p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">{product.name}</h1>
              {product.price && <p className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">{product.price}</p>}
              <p className="mt-6 max-w-xl text-base leading-7 text-ink/60">A product from the BDM Cricket range. Contact the team for current details and availability.</p>
              <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/enquiry" variant="red">Enquire about this product</ButtonLink><a href="tel:+917949366862" className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-6 text-sm font-semibold transition-colors hover:border-ink">Call BDM</a></div>
              {product.productCode && <p className="mt-5 text-xs text-ink/40">Product code: {product.productCode}</p>}
              {product.specifications.length > 0 && <div className="mt-10 border-t border-ink/15 pt-6"><h2 className="font-display text-xl font-semibold tracking-[-0.04em]">Product details</h2><dl className="mt-4 divide-y divide-ink/10">{product.specifications.map((spec) => <div key={spec.name} className="flex justify-between gap-6 py-3 text-sm"><dt className="text-ink/50">{spec.name}</dt><dd className="text-right font-medium text-ink">{spec.value}</dd></div>)}</dl></div>}
            </Reveal>
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="section-pad bg-white"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow text-brand-red">Continue exploring</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em]">More from {product.category}.</h2></div><Link href={`/${product.categorySlug}`} className="hidden text-sm font-semibold hover:text-brand-red sm:block">View category ↗</Link></div><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">{related.map((item,index)=><ProductCard key={item.slug} product={item} index={index}/>)}</div></div></section>}
    </>
  );
}
