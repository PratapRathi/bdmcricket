"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { apiRequest } from "@/lib/api/client";

const navigation = [
  ["/admin", "Overview"], ["/admin/products", "Products & stock"], ["/admin/categories", "Categories"],
  ["/admin/content", "Site content"], ["/admin/enquiries", "Contact enquiries"], ["/admin/media", "Media library"], ["/admin/settings", "Account settings"],
] as const;

export function AdminShell({ username, children }: { username: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await apiRequest("/api/admin/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }

  return <div className="min-h-screen bg-[#f3f1ed] text-[#181818]">
    <header className="flex min-h-16 items-center justify-between border-b border-black/10 bg-white px-5 sm:px-8"><Link className="font-bold tracking-tight" href="/admin">BDM <span className="text-red-700">ADMIN</span></Link><div className="flex items-center gap-3"><span className="hidden text-xs text-black/55 sm:inline">Signed in as <strong className="text-black">{username}</strong></span><button type="button" disabled={busy} onClick={logout} className="rounded-md border border-black/15 px-3 py-2 text-xs font-semibold hover:bg-black/5">{busy ? "Signing out…" : "Sign out"}</button></div></header>
    <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[230px_1fr]"><aside className="border-b border-black/10 bg-white px-3 py-3 lg:min-h-[calc(100vh-64px)] lg:border-b-0 lg:border-r lg:px-4 lg:py-6"><nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto lg:flex-col">{navigation.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`shrink-0 rounded-md px-3 py-2.5 text-sm font-medium ${pathname === href ? "bg-black text-white" : "text-black/65 hover:bg-black/5 hover:text-black"}`}>{label}</Link>)}</nav><Link className="mt-6 hidden px-3 text-xs text-black/45 underline lg:block" href="/">View public website ↗</Link></aside><main className="min-w-0">{children}</main></div>
  </div>;
}
