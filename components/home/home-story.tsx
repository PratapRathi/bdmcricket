"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { history } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const archiveImage = "/assets/01-500x500-mja3oz1o.jpg";
const currentProductImage = "/assets/bdm-dynamic-power-super-cricket-bat-500x-omhzyo10.jpg";

export function HomeStory() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray<HTMLElement>(".story-row", scope.current);
      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: row, className: "is-active" },
        });
        const visual = scope.current?.querySelector<HTMLElement>(".story-visual-art");
        if (index === history.length - 1 && visual) {
          ScrollTrigger.create({
            trigger: row,
            start: "top 62%",
            end: "bottom 38%",
            toggleClass: { targets: visual, className: "is-product-stage" },
          });
        }
      });
    });
    motion.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".story-row", { y: 18, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story-list", start: "top 88%", once: true },
      });
    });
    return () => motion.revert();
  }, { scope });

  return (
    <section ref={scope} className="home-story-section section-pad bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-12">
        <div className="story-visual-column">
          <div className="story-visual">
            <div className="story-visual-art">
              <Image src={archiveImage} alt="BDM House of Cricket company profile collage" fill sizes="(max-width: 1023px) 100vw, 44vw" className="story-image-layer story-image-archive object-cover mix-blend-multiply" />
              <Image src={currentProductImage} alt="BDM cricket bat from the current catalogue" fill sizes="(max-width: 1023px) 100vw, 44vw" className="story-image-layer story-image-product object-contain mix-blend-multiply" />
              <span className="story-visual-index" aria-hidden="true">BDM / 1925—NOW</span>
            </div>
            <div className="story-visual-caption"><span>House of Cricket</span><span>Meerut, India</span></div>
          </div>
        </div>

        <div className="story-copy-column">
          <div className="story-intro">
            <p className="eyebrow text-brand-red">A cricket story, carried forward</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-6xl lg:text-7xl">A family’s work with the game, since 1925.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">From a cricket trade in Sialkot to a manufacturing business in Meerut, the milestones below follow the history recorded in the BDM company profile.</p>
          </div>

          <div className="story-list mt-10 lg:mt-14">
            {history.map((item, index) => (
              <article key={item.year} className={`story-row ${index === 0 ? "is-active" : ""}`}>
                <p className="story-year">{item.year}</p>
                <div className="story-row-copy">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.045em] sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">{item.detail}</p>
                </div>
                <span className="story-row-marker" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/about-us" variant="light">Read the full story</ButtonLink>
            <Link href="/company-insights" className="story-profile-link inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold text-white/65 hover:text-white">Company profile <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
