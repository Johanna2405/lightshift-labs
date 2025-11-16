export default function ArvrModelViewerPanel({
  headline,
  subhead,
  modelSrc,
  poster,
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

      {/* Layout */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* 3D MODEL */}
        <div className="rounded-xl border border-border-600 bg-bg-900/60 p-4">
          <model-viewer
            src={modelSrc}
            poster={poster}
            auto-rotate
            rotation-per-second="15deg"
            camera-controls
            touch-action="pan-y"
            interaction-prompt="none"
            disable-zoom
            exposure="0.9"
            shadow-intensity="1"
            orientation="0deg 90deg 0deg"
            style={{
              width: "100%",
              height: "420px",
              outline: "none",
            }}
          ></model-viewer>
        </div>

        {/* FEATURES */}
        <aside className="rounded-xl border border-border-600 bg-bg-900/60 p-5">
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border-600 bg-bg-800/60 px-3 py-2"
              >
                <span
                  aria-hidden
                  className="mt-1 inline-block h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_6px_var(--color-brand-300)]"
                ></span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
