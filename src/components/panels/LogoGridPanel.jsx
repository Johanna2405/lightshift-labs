export default function LogoGridPanel({ headline, subhead, logos = [] }) {
  const items = Array.isArray(logos) ? logos : [];

  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      <div
        className="
            grid gap-4 sm:gap-6
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
          "
      >
        {items.map((l, i) => {
          const content = (
            <div
              className="
                  h-20 sm:h-24 rounded-xl
                  border border-border-600 bg-bg-900/60
                  flex items-center justify-center
                  hover:border-brand-500 transition-colors
                  group
                "
            >
              <img
                src={l.src}
                alt={l.alt || "Partnerlogo"}
                loading="lazy"
                width="160"
                height="64"
                className="
                    max-h-[60%] max-w-[70%] object-contain
                    opacity-90 group-hover:opacity-100
                  "
              />
            </div>
          );

          return (
            <div key={i}>
              {l.href ? (
                <a
                  href={l.href}
                  className="block focus-visible:focus-ring rounded-xl"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.alt ? `Partner: ${l.alt}` : "Partner"}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {/* Optional: Mini-Hinweiszeile */}
      <p className="mt-4 text-xs text-text-tertiary">
        Logos © jeweilige Eigentümer. Verwendung nur zu Demonstrationszwecken.
      </p>
    </section>
  );
}
