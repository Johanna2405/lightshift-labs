import { useEffect, useMemo, useState } from "react";

// Funktionen für Umfrage
function normalizePercents(options) {
  const total = options.reduce((s, o) => s + (o.percent ?? 0), 0) || 1;
  return options.map((o) => ({
    ...o,
    percent: ((o.percent ?? 0) * 100) / total,
  }));
}

function countsFromPercents(options, baseTotal) {
  const norm = normalizePercents(options);
  const raw = norm.map((o) => ({
    id: o.id,
    label: o.label,
    ideal: (o.percent / 100) * baseTotal,
  }));
  const floored = raw.map((r) => ({ ...r, count: Math.floor(r.ideal) }));
  let diff = baseTotal - floored.reduce((s, r) => s + r.count, 0);
  const byFrac = [...raw]
    .map((r, i) => ({ i, frac: r.ideal - Math.floor(r.ideal) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < diff; k++)
    floored[byFrac[k % floored.length].i].count += 1;
  return floored.map((r, i) => ({
    id: options[i].id,
    label: options[i].label,
    count: floored[i].count,
  }));
}

function percentsFromCounts(counts) {
  const total = Math.max(
    1,
    counts.reduce((s, c) => s + c.count, 0)
  );
  return counts.map((c) => ({
    ...c,
    percent: Math.round((c.count / total) * 100),
  }));
}

export default function FeaturePollPanel({
  headline,
  subhead,
  question,
  pollKey = "feature-poll",
  options = [],
  baseTotal = 1200,
}) {
  const [choice, setChoice] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Auswahl im localStorage hinterlegen
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(pollKey);
      if (stored) {
        setChoice(stored);
        setShowResults(true);
      }
    } catch {}
  }, [pollKey]);

  const baseCounts = useMemo(
    () => countsFromPercents(options, baseTotal),
    [options, baseTotal]
  );

  const computed = useMemo(() => {
    const counts = baseCounts.map((c) => ({ ...c }));
    if (choice) {
      const hit = counts.find((c) => c.id === choice);
      if (hit) hit.count += 1;
    }
    const withPerc = percentsFromCounts(counts);
    const totalVotes = counts.reduce((s, c) => s + c.count, 0);
    return { rows: withPerc, totalVotes };
  }, [baseCounts, choice]);

  const onVote = (id) => {
    if (choice) {
      setShowResults(true);
      return;
    }
    setChoice(id);
    setShowResults(true);
    try {
      window.localStorage.setItem(pollKey, id);
    } catch {}
  };

  const onReset = () => {
    try {
      window.localStorage.removeItem(pollKey);
    } catch {}
    setChoice(null);
    setShowResults(false);
  };

  return (
    <section className="w-full rounded-2xl border border-border-600 bg-bg-800/40 p-6 md:p-8">
      {/* Header */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-1">
            {headline}
          </h2>
        )}
      </header>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <p className="text-text-secondary leading-relaxed max-w-2xl text-base">
          Mit dem Major Release brachten wir 2020 die bislang größte Evolution
          des Toolsets auf den Weg: Realtime-Shader, ein modularer Scene Graph
          und ein GPU-Profiler definierten unsere Engine neu – und prägten den
          Workflow vieler Creator:innen nachhaltig.
        </p>
        <div className="w-24 h-24 flex-shrink-0 animate-[spin_20s_linear_infinite]">
          <img
            src="/media/icon.svg"
            alt="Lightshift Labs Icon"
            className="w-full h-full opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>

      {/* Umfrage */}
      <div className="rounded-2xl border border-border-600 bg-bg-900/60 p-5">
        {question && <h3 className="text-lg font-medium mb-4">{question}</h3>}

        {!showResults ? (
          <div
            role="radiogroup"
            aria-label={question || "Umfrage"}
            className="grid sm:grid-cols-2 gap-3"
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                role="radio"
                aria-checked={choice === opt.id ? "true" : "false"}
                onClick={() => onVote(opt.id)}
                className="text-left rounded-xl border border-border-600 bg-bg-800/60 hover:border-border-500 focus-visible:focus-ring px-4 py-3 transition"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_8px_var(--color-brand-300)]"
                  />
                  <span className="font-medium">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3" aria-live="polite">
            {computed.rows.map((row) => {
              const isChoice = choice === row.id;
              return (
                <div
                  key={row.id}
                  className="rounded-xl border border-border-600 bg-bg-800/60 p-3"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 rounded-full ${
                          isChoice ? "bg-brand-500" : "bg-border-500"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isChoice ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {row.label}
                      </span>
                      {isChoice && (
                        <span className="text-xs px-2 py-0.5 rounded border border-border-600 text-text-tertiary">
                          Deine Wahl
                        </span>
                      )}
                    </div>
                    <div className="text-sm tabular-nums text-text-secondary">
                      <span className="text-text-primary mr-2">
                        {row.percent}%
                      </span>
                      <span>({row.count.toLocaleString()} Stimmen)</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-bg-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-[width] duration-700"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2 text-xs text-text-tertiary">
              <button onClick={onReset} className="btn-link--ghost">
                Zurück
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
