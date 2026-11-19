import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RouteTransition } from "@/components/motion/route-transition";

export const metadata: Metadata = {
  title: "BDM Cricket Solutions",
  description: "BDM Cricket — cricket equipment shaped by a family’s work with the game since 1925.",
  metadataBase: new URL("https://www.bdmcricket.net"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content"><RouteTransition>{children}</RouteTransition></main>
        <Footer />
      </body>
    </html>
  );
}
