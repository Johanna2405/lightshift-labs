export default function InfographicMultiLayerPanel({
  headline,
  subhead,
  caption,
}) {
  const description = `
Mit der Einführung des Open-Source SDK 2023 haben wir erstmals die gesamte modulare Architektur der Engine transparent offengelegt. 
Das neue Layer-Modell trennt Core-Runtime, Engine-Systeme, SDK-Module, Tools und Anwendungs-Schichten strikt voneinander. Dadurch können Entwickler einzelne Ebenen unabhängig erweitern, eigene Module integrieren oder vorhandene Pipelines ersetzen – ohne den Kern anzutasten. Die klare Struktur verbessert die Wartbarkeit, ermöglicht schnellere Iterationen und bietet unserer Community einen stabilen, erweiterbaren technischen Unterbau für zukünftige Projekte.
  `;

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

      {/* 2-Spalten-Layout */}
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-start">
        {/* SVG Grafik */}
        <div className="flex justify-center md:justify-start">
          <svg
            viewBox="0 0 880 540"
            className="w-full max-w-4xl h-auto"
            role="img"
            aria-label={caption || "SDK Architekturdiagramm"}
          >
            {/* defs */}
            <defs>
              <linearGradient id="g-core" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity="0.85"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent-indigo)"
                  stopOpacity="0.9"
                />
              </linearGradient>
              <linearGradient id="g-sdk" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-accent-luminous)"
                  stopOpacity="0.85"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand-400)"
                  stopOpacity="0.9"
                />
              </linearGradient>
              <linearGradient id="g-tools" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-info)"
                  stopOpacity="0.85"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-success)"
                  stopOpacity="0.9"
                />
              </linearGradient>
              <linearGradient id="g-apps" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-warning)"
                  stopOpacity="0.85"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-error)"
                  stopOpacity="0.9"
                />
              </linearGradient>
              <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer boxes */}
            {[
              {
                y: 380,
                h: 70,
                label: "CORE",
                sub: "Runtime · Memory · Math",
                fill: "url(#g-core)",
              },
              {
                y: 290,
                h: 70,
                label: "ENGINE",
                sub: "Rendering · Physics · IO · Scripting",
                fill: "var(--color-accent-indigo)",
              },
              {
                y: 200,
                h: 70,
                label: "SDK",
                sub: "APIs · Modules · Plugins",
                fill: "url(#g-sdk)",
              },
              {
                y: 110,
                h: 70,
                label: "TOOLS",
                sub: "CLI · Editor · Profiling",
                fill: "url(#g-tools)",
              },
              {
                y: 20,
                h: 70,
                label: "APPS",
                sub: "Games · Demos · Integrations",
                fill: "url(#g-apps)",
              },
            ].map((L, i) => (
              <g key={i} className="group">
                {/* glow/backplate */}
                <rect
                  x="80"
                  y={L.y}
                  rx="16"
                  ry="16"
                  width="720"
                  height={L.h}
                  fill={L.fill}
                  opacity="0.2"
                  filter="url(#soft)"
                />
                {/* main card */}
                <rect
                  x="80"
                  y={L.y}
                  rx="16"
                  ry="16"
                  width="720"
                  height={L.h}
                  fill="transparent"
                  stroke="var(--color-border-600)"
                  strokeWidth="2"
                />
                <rect
                  x="80"
                  y={L.y}
                  rx="16"
                  ry="16"
                  width="720"
                  height={L.h}
                  fill={L.fill}
                  opacity="0.12"
                  className="transition-opacity group-hover:opacity-20"
                />
                {/* labels */}
                <text
                  x="100"
                  y={L.y + 28}
                  fill="var(--color-text-primary)"
                  fontSize="18"
                  fontWeight="700"
                >
                  {L.label}
                </text>
                <text
                  x="100"
                  y={L.y + 50}
                  fill="var(--color-text-secondary)"
                  fontSize="13"
                >
                  {L.sub}
                </text>
              </g>
            ))}

            {/* Connectors */}
            {[
              { y1: 380, y2: 290 },
              { y1: 290, y2: 200 },
              { y1: 200, y2: 110 },
              { y1: 110, y2: 20 },
            ].map((c, i) => (
              <g key={i}>
                <line
                  x1="740"
                  y1={c.y1}
                  x2="740"
                  y2={c.y2 + 70}
                  stroke="var(--color-border-600)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <circle
                  cx="740"
                  cy={c.y1}
                  r="4"
                  fill="var(--color-brand-500)"
                />
                <circle
                  cx="740"
                  cy={c.y2 + 70}
                  r="4"
                  fill="var(--color-brand-500)"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Text */}
        <aside className="rounded-xl border border-border-600 bg-bg-900/60 p-5">
          <p className="text-text-secondary text-s">{description}</p>
        </aside>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-xs text-text-tertiary mt-4 text-center">{caption}</p>
      )}
    </section>
  );
}
