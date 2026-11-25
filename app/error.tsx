"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grid min-h-[55vh] place-items-center bg-paper px-5 py-16 text-center">
      <div>
        <p className="eyebrow text-brand-red">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em]">We couldn’t load this page.</h1>
        <p className="mt-4 text-sm text-ink/60">Try again in a moment.</p>
        <button type="button" onClick={() => reset()} className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red">Try again</button>
        {error.digest ? <p className="sr-only">Reference: {error.digest}</p> : null}
      </div>
    </section>
  );
}
