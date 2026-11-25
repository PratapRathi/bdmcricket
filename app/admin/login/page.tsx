import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth/session";
import { AdminLoginForm } from "@/features/admin/components/admin-login-form";

export const metadata = { title: "Admin sign in | BDM Cricket", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <main className="flex min-h-screen items-center justify-center bg-[#f3f1ed] px-5 py-12">
    <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-7 shadow-xl sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">BDM Cricket</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm leading-6 text-black/60">Use your administrator ID and password to manage the website.</p>
      <AdminLoginForm />
    </div>
  </main>;
}
