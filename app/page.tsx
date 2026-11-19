import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "BDM Cricket — House of Cricket Since 1925",
  description: "Explore cricket bats, balls, protective equipment, and accessories from BDM Cricket, based in Meerut, India.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BDM Cricket — House of Cricket Since 1925",
    description: "A cricket equipment range shaped by a family’s work with the game since 1925.",
    images: ["/assets/01-500x500-mja3oz1o.jpg"],
  },
};

export default function Page() {
  return <HomePage />;
}
