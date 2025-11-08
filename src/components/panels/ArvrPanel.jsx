export default function ArvrPanel({
  headline,
  subhead,
  arHeadline,
  arSubhead,
  vrHeadline,
  vrSubhead,
  arClip,
  vrClip,
  arPoster,
  vrPoster,
  features = [],
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

      {/* AR + VR Media */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AR Block */}
        <div className="rounded-xl border border-border-600 bg-bg-900/60 p-4 hover:border-brand-500 transition-colors">
          <header className="mb-3">
            {arHeadline && (
              <h3 className="text-xl font-semibold">{arHeadline}</h3>
            )}
            {arSubhead && (
              <p className="text-text-secondary text-sm">{arSubhead}</p>
            )}
          </header>

          <figure className="rounded-lg overflow-hidden border border-border-600 bg-bg-700/40">
            <video
              className="w-full h-full"
              src={arClip}
              poster={arPoster}
              controls
              preload="metadata"
              playsInline
            />
            <figcaption className="sr-only">{arHeadline}</figcaption>
          </figure>
        </div>

        {/* VR Block */}
        <div className="rounded-xl border border-border-600 bg-bg-900/60 p-4 hover:border-brand-500 transition-colors">
          <header className="mb-3">
            {vrHeadline && (
              <h3 className="text-xl font-semibold">{vrHeadline}</h3>
            )}
            {vrSubhead && (
              <p className="text-text-secondary text-sm">{vrSubhead}</p>
            )}
          </header>

          <figure className="rounded-lg overflow-hidden border border-border-600 bg-bg-700/40">
            <video
              className="w-full h-full"
              src={vrClip}
              poster={vrPoster}
              controls
              preload="metadata"
              playsInline
            />
            <figcaption className="sr-only">{vrHeadline}</figcaption>
          </figure>
        </div>
      </div>

      {/* Feature-Liste */}
      {features.length > 0 && (
        <div className="mt-8">
          <div className="text-sm font-medium mb-3">Key Features</div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_6px_var(--color-brand-300)]"
                ></span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
