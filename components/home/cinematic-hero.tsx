"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/lib/catalog-types";
import { ButtonLink } from "@/components/ui/button-link";

gsap.registerPlugin(useGSAP);

export function CinematicHero({ founded, product }: { founded: number; product: Product }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .fromTo(".hero-kicker", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 })
        .fromTo(".hero-title-piece", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.1 }, "-=0.18")
        .fromTo(".hero-description, .hero-actions, .hero-footnote", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, "-=0.34")
        .fromTo(".hero-art-orbit", { scale: 0.72, autoAlpha: 0, rotation: -18 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.15, ease: "power3.out" }, 0.05)
        .fromTo(".hero-bat", { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.14)
        .fromTo(".hero-art-label, .hero-product-note, .hero-seal", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, "-=0.55")
        .fromTo(".hero-crease", { scaleX: 0 }, { scaleX: 1, duration: 0.65, transformOrigin: "left center" }, "-=0.35");
    });
    return () => motion.revert();
  }, { scope });

  return (
    <section ref={scope} className="hero-section hero-cinema relative overflow-hidden text-paper">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-grid mx-auto grid min-h-[650px] max-w-[1600px] lg:min-h-[min(790px,calc(100svh-84px))] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hero-copy relative z-10 flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:py-20">
          <p className="hero-kicker"><span className="hero-dot" /> House of Cricket <span className="hero-kicker-separator">/</span> Since {founded}</p>
          <h1 className="hero-title mt-8 font-display font-semibold tracking-[-0.085em]">
            <span className="hero-title-mask"><span className="hero-title-piece">The game,</span></span>
            <span className="hero-title-mask"><span className="hero-title-piece">in your</span></span>
            <span className="hero-title-mask"><span className="hero-title-piece hero-title-accent">hands.</span></span>
          </h1>
          <p className="hero-description mt-8 max-w-lg text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Made in Meerut. Shaped by a family’s work with cricket since {founded}.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/products" variant="red">Explore the range</ButtonLink>
            <Link href="/about-us" className="hero-story-link inline-flex min-h-12 items-center gap-3 px-3 text-sm font-semibold text-white/70 transition-colors hover:text-white">Our story <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-footnote mt-14 flex items-center gap-5 border-t border-white/15 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:mt-20">
            <span>Meerut, India</span><span className="h-px w-10 bg-brand-red" /><span>Equipment for every format</span>
          </div>
        </div>

        <div className="hero-art relative min-h-[440px] overflow-hidden bg-paper sm:min-h-[580px] lg:min-h-0">
          <div className="hero-art-orbit" aria-hidden="true" />
          <div className="hero-art-label absolute left-6 top-6 z-10 sm:left-10 sm:top-10">
            <span>BDM / MEERUT</span><span className="mx-3 h-px w-8 bg-ink/30" /><span>Crafted for the crease</span>
          </div>
          <div className="hero-crease" aria-hidden="true" />
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="hero-bat absolute left-1/2 top-[48%] z-[1] h-[88%] w-[66%] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply sm:h-[94%] lg:h-[93%]"
          />
          <div className="hero-product-note absolute bottom-8 left-6 z-10 max-w-44 sm:bottom-12 sm:left-10">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red">BDM / 01</span>
            <span className="mt-2 block font-display text-lg font-semibold leading-tight tracking-[-0.04em] text-ink">{product.name.replace(/^BDM\s+/, "").replace(/\s+Cricket\s+/, " ")}</span>
          </div>
          <div className="hero-seal absolute bottom-8 right-6 z-10 grid h-[84px] w-[84px] place-items-center rounded-full border border-ink/20 text-center font-display text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-ink sm:bottom-12 sm:right-10 sm:h-[104px] sm:w-[104px]">
            <span>Made for<br />the long<br />innings</span>
          </div>
          <span className="hero-watermark" aria-hidden="true">BDM</span>
        </div>
      </div>
    </section>
  );
}
