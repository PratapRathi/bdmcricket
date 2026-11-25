"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, ApiRequestError } from "@/lib/api/client";
import { ActionButton, ErrorMessage, Field } from "@/features/admin/components/admin-ui";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await apiRequest("/api/admin/auth/login", { method: "POST", json: { username: form.get("username"), password: form.get("password") } });
      router.replace("/admin");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof ApiRequestError ? cause.message : "Sign in could not be completed. Try again.");
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="mt-7 space-y-5">
    <Field label="Admin ID" name="username" autoComplete="username" required minLength={3} maxLength={64} />
    <Field label="Password" name="password" type="password" autoComplete="current-password" required maxLength={128} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
    <ActionButton type="submit" tone="red" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</ActionButton>
  </form>;
}
