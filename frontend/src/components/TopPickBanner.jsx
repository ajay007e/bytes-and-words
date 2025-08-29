export default function TopPickBanner({
  title,
  description,
  imageUrl,
  ctaLabel = "Read",
  href,
  onRead,
}) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
      aria-label="Editor's Top Pick"
    >
      {/* Background image */}
      <div
        className="relative h-[50vh] min-h-[320px] w-full bg-center bg-cover sm:h-[56vh] md:h-[60vh]"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={title}
      >
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-124 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          {/* Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Editor's Top Pick
          </div>

          {/* Title & Description */}
          <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
              {description}
            </p>
          )}

          {/* CTA */}
          <div className="mt-4">
            {href ? (
              <a
                href={href}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label={`${ctaLabel}: ${title}`}
              >
                {ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                onClick={onRead}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label={`${ctaLabel}: ${title}`}
              >
                {ctaLabel}
              </button>
            )}
          </div>
        </div>

        {/* Bottom drop shadow accent (subtle) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </section>
  );
}

/*
Usage example:

<EditorsTopPickBanner
  title="Velvet Whispers: A Night in Paris"
  description="A tender, slow-burn encounter set under the Parisian moon—our editor's top pick for this week."
  imageUrl="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2400&auto=format&fit=crop"
  ctaLabel="Read"
  href="/posts/velvet-whispers"
/>
*/

