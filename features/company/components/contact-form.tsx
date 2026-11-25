"use client";

import { useState, type FormEvent } from "react";
import { apiRequest, ApiRequestError } from "@/lib/api/client";

type SubmitState = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "sending" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      await apiRequest("/api/contact", { method: "POST", json: values });
      form.reset();
      setState({ kind: "success" });
    } catch (error) {
      setState({ kind: "error", message: error instanceof ApiRequestError ? error.message : "Your enquiry could not be sent. Please try again." });
    }
  }

  const inputClass = "mt-2 min-h-12 w-full rounded-md border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/15";

  return (
    <form onSubmit={submit} className="rounded-xl border border-ink/10 bg-paper p-5 sm:p-8" aria-label="Send an enquiry">
      <p className="eyebrow text-brand-red">Send a message</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em]">How can we help?</h2>
      <p className="mt-3 text-sm leading-6 text-ink/60">Share your product or dealer enquiry and the BDM team will follow up.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-ink/70">Your name<input className={inputClass} name="name" autoComplete="name" required minLength={2} maxLength={120} /></label>
        <label className="text-xs font-semibold text-ink/70">Email address<input className={inputClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label className="text-xs font-semibold text-ink/70">Phone number <span className="font-normal text-ink/45">(optional)</span><input className={inputClass} name="phone" type="tel" autoComplete="tel" maxLength={80} /></label>
        <label className="text-xs font-semibold text-ink/70">Subject<input className={inputClass} name="subject" required minLength={2} maxLength={160} /></label>
        <label className="text-xs font-semibold text-ink/70 sm:col-span-2">Message<textarea className={`${inputClass} min-h-32 resize-y`} name="message" required minLength={10} maxLength={5000} /></label>
        <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      </div>
      {state.kind === "success" && <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800" role="status">Thank you. Your enquiry has been sent to the BDM team.</p>}
      {state.kind === "error" && <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{state.message}</p>}
      <button className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-red disabled:cursor-wait disabled:opacity-60" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
