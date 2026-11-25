export default function Loading() {
  return (
    <div aria-label="Loading page" className="min-h-[55vh] animate-pulse bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="h-3 w-32 rounded bg-ink/10" />
        <div className="mt-6 h-14 max-w-2xl rounded bg-ink/10 sm:h-20" />
        <div className="mt-5 h-4 max-w-xl rounded bg-ink/10" />
      </div>
    </div>
  );
}
