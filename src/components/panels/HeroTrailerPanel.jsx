export default function HeroTrailerPanel({
  headline,
  subhead,
  video,
  poster,
  captions,
  features = [],
  ctas = [],
}) {
  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      {/* Header */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* ========== VIDEO (Hero) ========== */}
        <figure className="lg:col-span-3 rounded-xl overflow-hidden border border-border-600 bg-bg-900/60">
          <video
            className="w-full h-full"
            src={video}
            //poster={poster}
            controls
            preload="metadata"
            playsInline
          >
            {captions && (
              <track
                kind="captions"
                srcLang="de"
                src={captions}
                label="Deutsch"
                default
              />
            )}
          </video>
          <figcaption className="sr-only">
            Major Release Trailer 2020
          </figcaption>
        </figure>

        {/* ========== FEATURES + CTAs ========== */}
        <aside className="lg:col-span-2">
          <div className="rounded-xl border border-border-600 bg-bg-900/60 p-5">
            <div className="text-sm font-medium mb-3">Highlights</div>
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-4 w-4 rounded-full bg-brand-500 shadow-[0_0_8px_var(--color-brand-300)]"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {Array.isArray(ctas) && ctas.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {ctas.map((c, i) => {
                  const base =
                    "px-4 py-2 rounded-lg text-sm focus-visible:focus-ring transition border";
                  const styles =
                    c.style === "primary"
                      ? "bg-brand-500 border-transparent hover:bg-accent-luminous"
                      : "border-border-600 hover:border-border-500 hover:bg-bg-700";
                  return (
                    <a key={i} href={c.href} className={`${base} ${styles}`}>
                      {c.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
