import { Suspense, type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome-data";
import { RouteTransition } from "@/components/motion/route-transition";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Suspense fallback={<div className="h-[76px] bg-paper lg:h-[84px]" />}><SiteHeader /></Suspense>
      <main id="main-content"><Suspense fallback={<div className="route-transition">{children}</div>}><RouteTransition>{children}</RouteTransition></Suspense></main>
      <Suspense fallback={<div className="h-32 bg-ink" />}><SiteFooter /></Suspense>
    </>
  );
}
