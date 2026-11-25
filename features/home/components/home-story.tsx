"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import type { Product } from "@/features/products/types/product.types";
import { ButtonLink } from "@/components/ui/button-link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const subscribeToTimelineReady = () => () => {};
const getTimelineReadySnapshot = () => true;
const getServerTimelineReadySnapshot = () => false;

type Milestone = { year: string; title: string; detail: string };

function MilestoneCopy({ item }: { item: Milestone }) {
  return (
    <>
      <p className="story-timeline-year">{item.year}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.045em] sm:text-3xl">{item.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">{item.detail}</p>
    </>
  );
}

export function HomeStory({ history, storyImage, product }: { history: Milestone[]; storyImage: string; product: Product }) {
  const scope = useRef<HTMLElement>(null);
  const timelineReady = useSyncExternalStore(
    subscribeToTimelineReady,
    getTimelineReadySnapshot,
    getServerTimelineReadySnapshot,
  );

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const entries = gsap.utils.toArray<HTMLElement>(".story-timeline-entry", scope.current);
      const visual = scope.current?.querySelector<HTMLElement>(".story-visual-art");

      entries.forEach((entry, index) => {
        ScrollTrigger.create({
          trigger: entry,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: entry, className: "is-active" },
        });
        if (index === history.length - 1 && visual) {
          ScrollTrigger.create({
            trigger: entry,
            start: "top 62%",
            end: "bottom 38%",
            toggleClass: { targets: visual, className: "is-product-stage" },
          });
        }
      });
    });
    return () => motion.revert();
  }, { scope, dependencies: [timelineReady], revertOnUpdate: true });

  return (
    <section ref={scope} className="home-story-section section-pad bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-12">
        <div className="story-visual-column">
          <div className="story-visual">
            <div className="story-visual-art">
              <Image src={storyImage} alt="BDM House of Cricket company profile collage" fill sizes="(max-width: 1023px) 100vw, 44vw" className="story-image-layer story-image-archive object-cover mix-blend-multiply" />
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 1023px) 100vw, 44vw" className="story-image-layer story-image-product object-contain mix-blend-multiply" />
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
            {timelineReady ? (
              <VerticalTimeline animate layout="1-column-left" lineColor="rgba(255,255,255,.2)">
                {history.map((item, index) => (
                  <VerticalTimelineElement
                    key={item.year}
                    className={`story-timeline-entry ${index === 0 ? "is-active" : ""}`}
                    contentStyle={{ background: "transparent", color: "#fff", boxShadow: "none" }}
                    contentArrowStyle={{ display: "none" }}
                    iconStyle={{ background: "#17191d", color: "#c91f32" }}
                    icon={<span aria-hidden="true">✳</span>}
                    textClassName="story-timeline-content"
                  >
                    <MilestoneCopy item={item} />
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            ) : (
              <div className="story-timeline-fallback" aria-label="Company milestones">
                {history.map((item) => (
                  <article key={item.year} className="story-timeline-fallback-entry">
                    <span className="story-timeline-fallback-icon" aria-hidden="true">✳</span>
                    <MilestoneCopy item={item} />
                  </article>
                ))}
              </div>
            )}
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
