import Link from "next/link";

export function CentenaryFeature({ founded, year, title, body }: { founded: number; year: string; title: string; body: string }) {
  const yearsCompleted = Number(year) - founded;
  return (
    <section className="centenary-feature section-pad bg-[#e8e3d8] text-ink" aria-labelledby="centenary-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="centenary-panel relative grid overflow-hidden border border-ink/15 bg-paper md:grid-cols-[0.9fr_1.1fr]">
          <div className="centenary-number-wrap relative flex min-h-[300px] items-center justify-center overflow-hidden bg-brand-red px-6 py-10 text-white sm:min-h-[380px]">
            <span className="centenary-watermark" aria-hidden="true">100</span>
            <div className="relative text-center">
              <p className="eyebrow text-white/65">{founded} — {year}</p>
              <p className="mt-2 font-display text-[7rem] font-semibold leading-[.8] tracking-[-.1em] sm:text-[10rem]">{yearsCompleted}</p>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[.22em]">Years completed</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p className="eyebrow text-brand-red">A century of cricket trade</p>
            <h2 id="centenary-title" className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl">{title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-ink/65 sm:text-base">{body}</p>
            <Link href="/about-us" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-brand-red">Explore the family story <span aria-hidden="true" className="text-brand-red">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
