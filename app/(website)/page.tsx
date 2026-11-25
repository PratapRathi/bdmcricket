import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { HomePage } from "@/features/home/components/home-page";
import { getCompanyContent } from "@/lib/data/company";

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const { company } = await getCompanyContent();
  return {
    title: `BDM Cricket — House of Cricket Since ${company.founded}`,
    description: "Explore cricket bats, balls, protective equipment, and accessories from BDM Cricket, based in Meerut, India.",
    alternates: { canonical: "/" },
    openGraph: {
      title: `BDM Cricket — House of Cricket Since ${company.founded}`,
      description: `A cricket equipment range shaped by a family’s work with the game since ${company.founded}.`,
      images: [company.storyImage],
    },
  };
}

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen bg-paper" />}><HomeData /></Suspense>;
}

async function HomeData() {
  await connection();
  return <HomePage />;
}
