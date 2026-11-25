import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { getAdminSession } from "@/lib/admin-auth/session";

export const metadata = { title: { default: "Admin | BDM Cricket", template: "%s | BDM Admin" }, robots: { index: false, follow: false } };

export default async function AdminPortalLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");
  return <AdminShell username={admin.username}>{children}</AdminShell>;
}
