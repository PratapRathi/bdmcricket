import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome-data";
import { RouteTransition } from "@/components/motion/route-transition";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "BDM Cricket Solutions",
  description: "BDM Cricket — cricket equipment shaped by a family’s work with the game since 1925.",
  metadataBase: new URL("https://www.bdmcricket.net"),
  openGraph: {
    title: "BDM Cricket — House of Cricket",
    description: "Cricket equipment shaped by a family’s work with the game since 1925.",
    siteName: "BDM Cricket",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "BDM Cricket — House of Cricket" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Suspense fallback={<div className="h-[76px] bg-paper lg:h-[84px]" />}><SiteHeader /></Suspense>
          <main id="main-content"><Suspense fallback={<div className="route-transition">{children}</div>}><RouteTransition>{children}</RouteTransition></Suspense></main>
          <Suspense fallback={<div className="h-32 bg-ink" />}><SiteFooter /></Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
