import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "red";
  className?: string;
};

const variants = {
  dark: "bg-ink text-white hover:bg-brand-red hover:border-brand-red",
  light: "bg-paper text-ink hover:bg-white",
  outline: "border border-current text-current hover:bg-current hover:text-white",
  red: "bg-brand-red text-white hover:bg-[#b91627]",
};

export function ButtonLink({ href, children, variant = "dark", className = "" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-5 rounded-full px-6 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
    </Link>
  );
}
