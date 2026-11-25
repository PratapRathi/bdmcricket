"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ActionButton, AdminPage, ErrorMessage, Field, Panel } from "@/features/admin/components/admin-ui";
import { apiRequest } from "@/lib/api/client";

export function AdminSettings() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const change = useMutation({ mutationFn: (input: unknown) => apiRequest<{ data: { username: string; message: string } }>("/api/admin/auth/credentials", { method: "PATCH", json: input }), onSuccess: (response) => { setMessage(response.data.message); router.refresh(); }, onError: (cause) => setMessage(cause instanceof Error ? cause.message : "Could not update credentials.") });
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const value: Record<string, string> = { currentPassword: String(form.get("currentPassword")) }; const username = String(form.get("newUsername") ?? "").trim(); const password = String(form.get("newPassword") ?? ""); if (username) value.newUsername = username; if (password) value.newPassword = password; change.mutate(value); }
  return <AdminPage title="Account settings" description="Change the administrator ID or password. Updating either credential signs out other active sessions.">
    <div className="max-w-2xl"><Panel title="Change sign-in credentials"><form onSubmit={submit} className="space-y-4"><Field label="Current password" name="currentPassword" type="password" autoComplete="current-password" required /><Field label="New admin ID (optional)" name="newUsername" minLength={3} maxLength={64} autoComplete="username" /><Field label="New password (optional, minimum 14 characters)" name="newPassword" type="password" minLength={14} maxLength={128} autoComplete="new-password" /><p className="text-xs leading-5 text-black/50">Leave the new admin ID or password blank to keep it unchanged. You must enter your current password to make a change.</p>{message && (change.isError ? <ErrorMessage>{message}</ErrorMessage> : <p role="status" className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>)}<ActionButton type="submit" tone="red" disabled={change.isPending}>{change.isPending ? "Saving…" : "Update credentials"}</ActionButton></form></Panel></div>
  </AdminPage>;
}
