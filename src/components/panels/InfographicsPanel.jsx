export default function InfographicPanel({ headline, subhead, caption }) {
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

      {/* Infografik */}
      <div className="w-full flex justify-center">
        <svg
          viewBox="0 0 600 600"
          className="w-full max-w-3xl h-auto"
          role="img"
          aria-label={caption || "Infografik"}
        >
          {/* Background glow */}
          <circle
            cx="300"
            cy="300"
            r="260"
            fill="none"
            stroke="var(--color-brand-300)"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="300"
            r="200"
            fill="none"
            stroke="var(--color-brand-400)"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="300"
            r="140"
            fill="none"
            stroke="var(--color-accent-luminous)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          {/* Core */}
          <circle
            cx="300"
            cy="300"
            r="70"
            fill="var(--color-brand-500)"
            opacity="0.25"
          />
          <text
            x="300"
            y="300"
            fill="var(--color-text-primary)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="600"
          >
            CORE
          </text>

          {/* Module labels */}
          <text
            x="300"
            y="130"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="14"
          >
            Rendering
          </text>

          <text
            x="480"
            y="310"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="14"
          >
            IO / FileSystem
          </text>

          <text
            x="300"
            y="500"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="14"
          >
            Physics
          </text>

          <text
            x="120"
            y="310"
            textAnchor="middle"
            fill="var(--color-text-secondary)"
            fontSize="14"
          >
            Scripting
          </text>

          {/* Outer Nodes */}
          {[
            { x: 300, y: 70, label: "CLI Tools" },
            { x: 530, y: 300, label: "Extensions" },
            { x: 300, y: 530, label: "Integrations" },
            { x: 70, y: 300, label: "Templates" },
          ].map((n, i) => (
            <g key={i} className="group">
              <circle
                cx={n.x}
                cy={n.y}
                r="28"
                fill="var(--color-bg-900)"
                stroke="var(--color-border-600)"
                strokeWidth="2"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="28"
                fill="none"
                stroke="var(--color-accent-luminous)"
                strokeOpacity="0.3"
                strokeWidth="2"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fill="var(--color-text-secondary)"
                fontSize="12"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {caption && (
        <p className="text-xs text-text-tertiary mt-4 text-center">{caption}</p>
      )}
    </section>
  );
}
