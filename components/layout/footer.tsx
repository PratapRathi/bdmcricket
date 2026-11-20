import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/lib/catalog-types";
import type { getCompanyContent } from "@/lib/data/company";

type FooterProps = { categories: ProductCategory[]; company: Awaited<ReturnType<typeof getCompanyContent>>["company"] };

export function Footer({ categories, company }: FooterProps) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.25fr_0.75fr_0.8fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <Image src={company.logo} alt={company.brand} width={82} height={58} className="h-14 w-[82px] rounded-sm bg-white object-contain" />
              <span className="font-display text-2xl font-bold tracking-[-0.05em]">BDM<span className="text-brand-red">.</span></span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">A cricket equipment range shaped by a family story that began in {company.founded}.</p>
          </div>
          <div>
            <p className="eyebrow text-white/45">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li><Link className="footer-link" href="/products">All equipment</Link></li>
              <li><Link className="footer-link" href="/about-us">Our story</Link></li>
              <li><Link className="footer-link" href="/quality">Quality</Link></li>
              <li><Link className="footer-link" href="/awards">Recognition</Link></li>
              <li><Link className="footer-link" href="/news">News</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/45">Categories</p>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {categories.map((category) => <li key={category.slug}><Link className="footer-link" href={`/${category.slug}`}>{category.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/45">Visit or call</p>
            <address className="mt-5 not-italic text-sm leading-6 text-white/75">{company.address}</address>
            <a className="mt-4 inline-flex text-sm font-semibold text-white transition-colors hover:text-brand-red" href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>
            <a className="mt-2 block text-xs text-white/45" href={`https://maps.google.com/?q=${company.coordinates}`} target="_blank" rel="noreferrer">Get directions ↗</a>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.legalName} All rights reserved.</p>
          <p>Meerut, Uttar Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
