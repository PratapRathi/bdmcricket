import { connection } from "next/server";
import { getCategories } from "@/lib/data/catalog";
import { getCompanyContent } from "@/lib/data/company";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function SiteHeader() {
  await connection();
  const [categories, content] = await Promise.all([getCategories(), getCompanyContent()]);
  return <Header categories={categories} company={content.company} />;
}

export async function SiteFooter() {
  await connection();
  const [categories, content] = await Promise.all([getCategories(), getCompanyContent()]);
  return <Footer categories={categories} company={content.company} />;
}
