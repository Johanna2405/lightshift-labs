import useCountUp from "../../hooks/useCountUp";

// Einzelelement für eine Kennzahl
function Metric({ label, value, suffix, delay = 0 }) {
  // Der benutzerdefinierte Hook steuert den animierten Zählvorgang
  const { ref, value: v } = useCountUp(typeof value === "number" ? value : 0, {
    duration: 1000 + delay, // Animationsdauer
    startOnView: true, // Startet beim Sichtbarwerden
  });

  // Formatierung der Ausgabe
  const display =
    typeof value === "number" ? v.toLocaleString() : String(value);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border-600 p-4 bg-bg-900/60"
    >
      {/* Animierter Zähler */}
      <div className="text-2xl md:text-3xl font-semibold text-text-primary">
        {display}
        {suffix ? <span className="text-text-secondary"> {suffix}</span> : null}
      </div>
      <div className="text-sm text-text-tertiary mt-1">{label}</div>
    </div>
  );
}

// Container-Komponente für das Panel
export default function MetricsPanel({
  headline,
  subhead,
  metrics,
  text = [],
}) {
  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      {/* Panelüberschrift */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      {/* Layoutstruktur */}
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* Linke Spalte: Beschreibung */}
        <p className="lg:col-span-3 text-text-secondary text-s">{text}</p>

        {/* Rechte Spalte: Kennzahlen */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <Metric
              key={i}
              label={m.label}
              value={m.value}
              suffix={m.suffix}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
