import useCountUp from "../../hooks/useCountUp";

function Metric({ label, value, suffix, delay = 0 }) {
  const { ref, value: v } = useCountUp(typeof value === "number" ? value : 0, {
    duration: 1000 + delay,
    startOnView: true,
  });

  const display =
    typeof value === "number" ? v.toLocaleString() : String(value);
  return (
    <div
      ref={ref}
      className="rounded-xl border border-border-600 p-4 bg-bg-900/60"
    >
      <div className="text-2xl md:text-3xl font-semibold text-text-primary">
        {typeof value === "number" ? display : display}
        {suffix ? <span className="text-text-secondary"> {suffix}</span> : null}
      </div>
      <div className="text-sm text-text-tertiary mt-1">{label}</div>
    </div>
  );
}

export default function MetricsPanel({
  headline,
  subhead,
  metrics,
  text = [],
}) {
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

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        <p className="lg:col-span-3 text-text-secondary text-s">{text}</p>

        {/* Statistiken */}
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
