import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function AdminPage({ title, description, actions, children }: { title: string; description: string; actions?: ReactNode; children: ReactNode }) {
  return <div className="mx-auto max-w-[1440px] p-5 sm:p-8"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">BDM Cricket · Admin</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-black/60">{description}</p></div>{actions}</div>{children}</div>;
}

export function Panel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-black/10 bg-white p-5 shadow-sm sm:p-6 ${className}`}>{title && <h2 className="mb-5 text-lg font-semibold">{title}</h2>}{children}</section>;
}

export function Field({ label, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className={`block text-xs font-semibold text-black/70 ${className}`}>{label}<input {...props} className="mt-2 min-h-10 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10" /></label>;
}

export function TextArea({ label, className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className={`block text-xs font-semibold text-black/70 ${className}`}>{label}<textarea {...props} className="mt-2 min-h-28 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm leading-6 text-black outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10" /></label>;
}

export function SelectField({ label, className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return <label className={`block text-xs font-semibold text-black/70 ${className}`}>{label}<select {...props} className="mt-2 min-h-10 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-700">{children}</select></label>;
}

export function ActionButton({ children, tone = "dark", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "dark" | "red" | "light" | "danger" }) {
  const tones = { dark: "bg-black text-white hover:bg-black/80", red: "bg-red-700 text-white hover:bg-red-800", light: "border border-black/15 bg-white text-black hover:bg-black/5", danger: "border border-red-200 bg-red-50 text-red-800 hover:bg-red-100" };
  return <button {...props} className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-50 ${tones[tone]} ${props.className ?? ""}`}>{children}</button>;
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">{children}</p>;
}

export function LoadingMessage({ children = "Loading…" }: { children?: ReactNode }) {
  return <p className="py-8 text-sm text-black/55">{children}</p>;
}
