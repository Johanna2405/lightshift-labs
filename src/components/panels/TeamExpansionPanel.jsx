import { useState, useEffect, useRef } from "react";
import useCountUp from "../../hooks/useCountUp";

// Zähler
function StatCard({ label, value, delay = 0, onJoin }) {
  const { ref, value: v } = useCountUp(value, {
    duration: 1000 + delay,
    startOnView: true,
  });
  const isHiring = label.toLowerCase().includes("offene stellen");

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border-600 bg-bg-900/60 p-4 text-center flex flex-col items-center justify-center"
    >
      <div className="text-2xl font-semibold text-text-primary">{v}</div>
      <div className="text-sm text-text-tertiary mb-3">{label}</div>
      {isHiring && (
        <button onClick={onJoin} className="mt-auto btn-link">
          Join us
        </button>
      )}
    </div>
  );
}

// Stellen Pop-Up
function JoinUsModal({ open, onClose, roles = [], returnFocusEl }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusables = () =>
      panelRef.current?.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      ) || [];

    const focusFirst = () => {
      const f = getFocusables();
      if (f.length) f[0].focus();
    };

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = getFocusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const t = setTimeout(focusFirst, 0);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (returnFocusEl && typeof returnFocusEl.focus === "function")
        returnFocusEl.focus();
    };
  }, [open, onClose, returnFocusEl]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <button
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Stellenangebote"
        ref={panelRef}
        className="fixed inset-x-0 top-[10vh] z-50 mx-auto w-[92vw] max-w-2xl max-h-[80vh] overflow-y-auto overscroll-contain rounded-2xl border border-border-600 bg-bg-800 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-border-600">
          <h3 className="text-lg font-semibold">Join us</h3>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md border border-border-600 hover:border-border-500 focus-visible:focus-ring"
          >
            X
          </button>
        </header>

        <div className="p-5">
          <p className="text-text-secondary mb-4">
            Wir wachsen weiter – hier sind unsere offenen Stellen:
          </p>

          <ul className="grid sm:grid-cols-2 gap-4">
            {roles.map((r, i) => (
              <li
                key={i}
                className="rounded-xl border border-border-600 bg-bg-900/60 p-4"
              >
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-text-tertiary mb-3">{r.mode}</div>
                <ul className="flex flex-wrap gap-2 text-xs mb-4">
                  {r.tags?.map((t, j) => (
                    <li
                      key={j}
                      className="px-2 py-1 rounded-full border border-border-500 text-text-tertiary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={r.href || "#"} className="btn-link">
                  Jetzt bewerben
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs text-text-tertiary mt-4">
            Keine passende Rolle dabei? Schreib uns an{" "}
            <a className="underline hover:text-text-secondary" href="#">
              careers@lightshiftlabs.dev
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}

export default function TeamExpansionPanel({
  headline,
  subhead,
  teamPhoto,
  stats = [],
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [returnFocus, setReturnFocus] = useState(null);

  const roles = [
    {
      title: "Rendering Engineer",
      mode: "Vollzeit · Remote/Hybrid",
      tags: ["C++", "GPU", "Shaders"],
      href: "#",
    },
    {
      title: "Developer Tools Engineer",
      mode: "Vollzeit · Berlin",
      tags: ["Node", "CLI", "DX"],
      href: "#",
    },
    {
      title: "UX Designer (Tools)",
      mode: "Teilzeit · Remote",
      tags: ["Figma", "Design Systems"],
      href: "#",
    },
    {
      title: "Technical Producer",
      mode: "Vollzeit · Berlin",
      tags: ["Agile", "Roadmaps"],
      href: "#",
    },
  ];

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
      {/* Zähler */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              label={s.label}
              value={s.value}
              delay={i * 120}
              onJoin={(e) => {
                setReturnFocus(e.currentTarget);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      )}
      {/* Team */}
      <figure className="rounded-xl overflow-hidden border border-border-600 bg-bg-900/60 mb-8">
        <img
          src={teamPhoto}
          alt="Teamfoto 2024"
          className="w-full h-80 object-cover"
          loading="lazy"
        />
      </figure>

      <JoinUsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        roles={roles}
        returnFocusEl={returnFocus}
      />
    </section>
  );
}
