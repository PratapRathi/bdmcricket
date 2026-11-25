"use client";

import "./globals.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-paper px-5 py-16 text-center text-ink">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">BDM Cricket</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em]">The site hit an unexpected error.</h1>
            <button type="button" onClick={() => reset()} className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red">Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}
