export default function ArvrModelViewerPanel({
  headline,
  subhead,
  modelSrc,
  features = [],
}) {
  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      {/* Header mit Titel und Unterzeile */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      {/* Zweispaltiges Layout: links 3D-Model, rechts Featureliste */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* 3D-Model-Container */}
        <div className="rounded-xl border border-border-600 bg-bg-900/60 p-4">
          {/* <model-viewer> Webkomponente */}
          <model-viewer
            src={modelSrc} /* Pfad zur .glb-Datei */
            auto-rotate /* langsame Auto-Rotation aktivieren */
            rotation-per-second="15deg" /* Rotationsgeschwindigkeit */
            camera-controls /* Maus-/Touch-Steuerung erlauben */
            touch-action="pan-y" /* verhindert Scroll-Konflikte auf Mobile */
            interaction-prompt="none" /* kein Interaktionshinweis-Overlay */
            disable-zoom /* Zoom deaktivieren */
            exposure="0.9" /* Helligkeit des Renderings */
            shadow-intensity="1" /* Schattentiefe für mehr Plastizität */
            orientation="0deg 90deg 0deg" /* Initiale Ausrichtung des Modells (X Y Z) */
            style={{
              width: "100%",
              height: "420px",
              outline: "none",
            }}
          ></model-viewer>
        </div>

        {/* Featureliste als ergänzende Beschreibung */}
        <aside className="rounded-xl border border-border-600 bg-bg-900/60 p-5">
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border-600 bg-bg-800/60 px-3 py-2"
              >
                {/* Markierungspunkt */}
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
