"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/data/products";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[84px] lg:px-12">
        <Link href="/" aria-label="BDM Cricket home" className="flex shrink-0 items-center gap-3">
          <Image src="/assets/img-0292-90x90-kqnss7uc.png" alt="BDM Cricket" width={72} height={50} priority className="h-[48px] w-[70px] object-contain mix-blend-multiply" />
          <span className="hidden border-l border-ink/15 pl-3 font-display text-[11px] font-bold uppercase leading-[1.15] tracking-[0.16em] text-ink/70 sm:block">
            House of Cricket
            <span className="mt-1 block text-[9px] font-medium tracking-[0.22em] text-ink/45">Since 1925</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          <div className="nav-products relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="products-menu"
              onClick={() => setMenuOpen((open) => !open)}
              onMouseEnter={() => setMenuOpen(true)}
              className="nav-link inline-flex items-center gap-2 py-7 text-sm font-semibold"
            >
              Products <span aria-hidden="true" className={`text-xs transition-transform ${menuOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            <div id="products-menu" className={`mega-menu absolute left-1/2 top-[calc(100%-1px)] w-[760px] -translate-x-1/2 ${menuOpen ? "is-open" : ""}`} onMouseLeave={() => setMenuOpen(false)}>
              <div className="grid grid-cols-[1fr_1.25fr] gap-8 rounded-b-2xl border border-ink/10 bg-paper p-8 shadow-2xl">
                <div className="flex flex-col justify-between rounded-xl bg-ink p-7 text-white">
                  <div>
                    <p className="eyebrow text-white/55">The BDM range</p>
                    <h2 className="mt-4 font-display text-3xl font-semibold leading-none tracking-[-0.05em]">Built around the game.</h2>
                  </div>
                  <Link href="/products" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-brand-red">
                    Explore all equipment <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {categories.slice(0, 10).map((category) => (
                    <Link key={category.slug} href={`/${category.slug}`} className="group flex items-center justify-between border-b border-ink/10 py-3 text-sm text-ink/75 transition-colors hover:text-brand-red">
                      <span>{category.name}</span><span aria-hidden="true" className="translate-x-[-4px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link className="nav-link text-sm font-semibold" href="/about-us">Our story</Link>
          <Link className="nav-link text-sm font-semibold" href="/quality">Quality</Link>
          <Link className="nav-link text-sm font-semibold" href="/awards">Recognition</Link>
          <Link className="nav-link text-sm font-semibold" href="/corporate-video">Inside BDM</Link>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a className="text-sm font-semibold text-ink/65 transition-colors hover:text-brand-red" href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>
          <ButtonLink href="/enquiry" variant="dark" className="min-h-11 px-5 text-xs">Talk to BDM</ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="text-2xl leading-none">{menuOpen ? "×" : "≡"}</span>
        </button>
      </div>

      <div className={`mobile-menu lg:hidden ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation" className="mx-auto max-w-[1440px] px-5 pb-7 sm:px-8" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}>
          <Link href="/products" className="mobile-nav-link">All products <span>↗</span></Link>
          {categories.slice(0, 8).map((category) => <Link key={category.slug} href={`/${category.slug}`} className="mobile-nav-sub">{category.name}</Link>)}
          <Link href="/about-us" className="mobile-nav-link">Our story <span>↗</span></Link>
          <Link href="/quality" className="mobile-nav-link">Quality <span>↗</span></Link>
          <Link href="/news" className="mobile-nav-link">News <span>↗</span></Link>
          <Link href="/enquiry" className="mobile-nav-link">Contact <span>↗</span></Link>
          <a href={`tel:${company.phoneLink}`} className="mt-6 inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white">Call {company.phoneDisplay}</a>
        </nav>
      </div>
    </header>
  );
}
