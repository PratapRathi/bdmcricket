type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, dark = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className={`eyebrow ${dark ? "text-white/60" : "text-brand-red"}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-balance font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${dark ? "text-white/65" : "text-ink/65"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
