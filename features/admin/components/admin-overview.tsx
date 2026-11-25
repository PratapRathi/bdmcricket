"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { adminApi, adminKeys } from "@/features/admin/components/admin-api";
import { AdminPage, ErrorMessage, LoadingMessage, Panel } from "@/features/admin/components/admin-ui";

type Overview = {
  products: number; publishedProducts: number; categories: number; newEnquiries: number; totalEnquiries: number; lowStock: number;
  recentEnquiries: { id: string; name: string; subject: string; status: string; createdAt: string }[];
  recentActivity: { id: string; action: string; entityType: string; summary: string; createdAt: string; actor: { username: string } | null }[];
};

export function AdminOverview() {
  const overview = useQuery({ queryKey: adminKeys.overview, queryFn: () => adminApi<Overview>("/api/admin/overview") });
  return <AdminPage title="Overview" description="A current view of the public catalog, stock alerts, contact enquiries, and recent admin changes.">
    {overview.isPending ? <LoadingMessage /> : overview.isError ? <ErrorMessage>{overview.error.message}</ErrorMessage> : <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
        ["Products", overview.data.products, `${overview.data.publishedProducts} published`], ["Categories", overview.data.categories, "Catalog groups"],
        ["New enquiries", overview.data.newEnquiries, `${overview.data.totalEnquiries} total received`], ["Low stock", overview.data.lowStock, "Published products at or below threshold"],
      ].map(([label, value, note]) => <Panel key={String(label)}><p className="text-xs font-semibold uppercase tracking-wide text-black/50">{label}</p><p className="mt-3 text-4xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-xs text-black/50">{note}</p></Panel>)}</div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2"><Panel title="Latest contact enquiries"><div className="divide-y divide-black/10">{overview.data.recentEnquiries.map((item) => <Link key={item.id} href="/admin/enquiries" className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"><span><strong className="block text-sm">{item.subject}</strong><span className="mt-1 block text-xs text-black/55">{item.name} · {new Date(item.createdAt).toLocaleString()}</span></span><span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-semibold">{item.status.replace("_", " ")}</span></Link>)}{overview.data.recentEnquiries.length === 0 && <p className="text-sm text-black/55">No enquiries have been submitted yet.</p>}</div><Link href="/admin/enquiries" className="mt-5 inline-block text-sm font-semibold text-red-700">Open enquiry inbox →</Link></Panel>
        <Panel title="Recent admin activity"><div className="divide-y divide-black/10">{overview.data.recentActivity.map((item) => <div key={item.id} className="py-4 first:pt-0 last:pb-0"><p className="text-sm">{item.summary}</p><p className="mt-1 text-xs text-black/50">{item.actor?.username ?? "Admin"} · {new Date(item.createdAt).toLocaleString()}</p></div>)}{overview.data.recentActivity.length === 0 && <p className="text-sm text-black/55">Admin changes will appear here.</p>}</div></Panel></div>
    </>}
  </AdminPage>;
}
