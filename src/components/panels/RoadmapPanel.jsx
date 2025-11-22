// React-Hooks für Zustand und Seiteneffekte
import { useEffect, useMemo, useState } from "react";
// Framer Motion für sanfte Übergänge und Animationen
import { motion, AnimatePresence } from "framer-motion";

// Farbzuordnung für verschiedene Item-Typen in der Roadmap
// (definiert über CSS-Variablen für konsistente Farbverwaltung)
const TYPES_COLORS = {
  feature: "var(--color-brand-500)",
  tech: "var(--color-accent-indigo)",
  docs: "var(--color-info)",
  infra: "var(--color-accent-luminous)",
  security: "var(--color-warning)",
  platform: "var(--color-success)",
  tooling: "var(--color-accent-neon)",
  ai: "var(--color-warning)",
  dx: "var(--color-brand-400)",
};

export default function RoadmapPanel({ headline, subhead, quarters = [] }) {
  // Aktiver Quartalszustand (Standard: erstes Quartal)
  const [active, setActive] = useState(quarters[0]?.id || "Q1");

  // Ermittelt das aktuell ausgewählte Quartal aus den übergebenen Daten
  const activeData = useMemo(
    () => quarters.find((q) => q.id === active) || quarters[0],
    [active, quarters]
  );

  // Tastaturnavigation mit Pfeiltasten
  useEffect(() => {
    const onKey = (e) => {
      if (!quarters.length) return;
      const idx = quarters.findIndex((q) => q.id === active);
      if (e.key === "ArrowLeft" && idx > 0) setActive(quarters[idx - 1].id);
      if (e.key === "ArrowRight" && idx < quarters.length - 1)
        setActive(quarters[idx + 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, quarters]);

  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      {/* Header-Bereich mit Überschrift und Untertitel */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      {/* Haupt-Content-Karte für das aktuell aktive Quartal */}
      <div className="rounded-2xl border border-border-600 bg-bg-900/60 p-5 md:p-6 mb-6">
        <AnimatePresence mode="wait">
          {/* Animierter Wechsel zwischen Quartalen */}
          <motion.div
            key={activeData?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            {/* Quartalsüberschrift + Zeitraum */}
            <div className="flex flex-wrap items-end gap-3">
              <h3 className="text-xl md:text-2xl font-semibold">
                {activeData?.title}
              </h3>
              {activeData?.date && (
                <span className="text-xs px-2 py-1 rounded border border-border-600 text-text-tertiary">
                  {activeData.date}
                </span>
              )}
            </div>

            {/* Liste der geplanten Features für das Quartal */}
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {(activeData?.items || []).map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border-600 bg-bg-800/60 px-3 py-2"
                >
                  {/* Farbpunkte als Typindikator */}
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-3 w-3 rounded-full"
                    style={{
                      background:
                        TYPES_COLORS[it.type] || "var(--color-brand-500)",
                    }}
                  />
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>

            {/* Optionaler Call-to-Action-Link pro Quartal */}
            {activeData?.cta && (
              <div className="mt-5">
                <a href={activeData.cta.href} className="btn-link inline-block">
                  {activeData.cta.label}
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigationsbereich: Darstellung aller Quartale (Q1–Q4) */}
      <div className="rounded-xl border border-border-600 bg-bg-900/60 p-3">
        <ol className="flex items-center justify-between gap-2 flex-wrap">
          {quarters.map((q) => {
            const activeQ = q.id === active;
            return (
              <li key={q.id} className="flex-1">
                <button
                  onClick={() => setActive(q.id)}
                  aria-pressed={activeQ ? "true" : "false"}
                  className={`w-full px-3 py-3 rounded-lg border transition focus-visible:focus-ring
                    ${
                      activeQ
                        ? "border-brand-500 bg-bg-800 text-text-primary"
                        : "border-border-600 hover:border-border-500 text-text-secondary"
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {/* Aktives Quartal visuell hervorgehoben */}
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 rounded-full ${
                        activeQ ? "bg-brand-500" : "bg-border-500"
                      }`}
                    />
                    <span className="font-medium">{q.id}</span>
                  </div>
                  <div className="text-xs text-text-tertiary mt-1 truncate">
                    {q.title}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
