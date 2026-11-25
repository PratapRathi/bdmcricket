import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[65vh] place-items-center bg-paper px-5 py-20 text-center">
      <div className="max-w-xl">
        <p className="eyebrow text-brand-red">404 · Page not found</p>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">This page has gone out of play.</h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-ink/60">The address may have changed. Head back to the BDM Cricket home page and continue exploring.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-red">Back to home</Link>
      </div>
    </section>
  );
}
