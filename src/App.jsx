// React Hooks für State- und Effekt-Management
import { useEffect, useMemo, useState } from "react";
// Router-Hooks für URL-Parameter und Navigation
import { useNavigate, useParams } from "react-router-dom";
// Framer Motion für Übergangsanimationen zwischen Panels
import { motion, AnimatePresence } from "framer-motion";

// Import der Daten und Hauptkomponenten
import data from "./data/timeline.json";
import Header from "./components/Header.jsx";
import TimelineRail from "./components/TimelineRail.jsx";
import MenuSidebar from "./components/MenuSidebar.jsx";
import PanelRenderer from "./components/PanelRenderer.jsx";

// Liste aller Jahre aus der Timeline und das früheste Jahr bestimmen
const YEARS = data.map((d) => d.year);
const EARLIEST = Math.min(...YEARS);

export default function App() {
  // Routing: aktuelles Jahr aus der URL lesen
  const { year } = useParams();
  const navigate = useNavigate();

  // Zustände für das Menü (Burger-Menü / Sidebar)
  const [menuOpen, setMenuOpen] = useState(false);
  const [returnFocusEl, setReturnFocusEl] = useState(null);

  // Menüsteuerung: Öffnen & Schließen mit Fokusmanagement
  const openMenu = (triggerEl) => {
    setReturnFocusEl(triggerEl);
    setMenuOpen(true);
  };
  const closeMenu = () => setMenuOpen(false);

  // Bestimmt das aktuell angezeigte Jahr
  // Wenn kein Jahr in der URL vorhanden ist, wird standardmäßig 2016 (das früheste) geladen
  const currentYear = useMemo(() => {
    const y = parseInt(year, 10);
    return Number.isFinite(y) && YEARS.includes(y) ? y : EARLIEST;
  }, [year]);

  // Ermittelt die Nachbarjahre für Navigation mit Pfeiltasten
  const idx = YEARS.indexOf(currentYear);
  const prevYear = YEARS[idx - 1];
  const nextYear = YEARS[idx + 1];

  // Funktion zum Wechseln des Jahres (führt Router-Navigation aus)
  const go = (y) => navigate(`/${y}`, { replace: false });

  // Tastaturnavigation mit Pfeiltasten
  // Wird deaktiviert, solange das Menü geöffnet ist
  useEffect(() => {
    const onKey = (e) => {
      if (menuOpen) return;
      if (e.key === "ArrowLeft" && prevYear) go(prevYear);
      if (e.key === "ArrowRight" && nextYear) go(nextYear);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevYear, nextYear, menuOpen]);

  // Aktuelles Jahresobjekt aus der Timeline-Datenstruktur
  const current = data.find((d) => d.year === currentYear);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header mit Logo und Burger-Menü */}
      <Header onMenuOpen={openMenu} />

      {/* Hauptinhalt: Dynamische Anzeige der Panels des gewählten Jahres */}
      <main
        className="flex-1 flex items-center justify-center px-6"
        aria-hidden={menuOpen ? "true" : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={currentYear}
            // Sanfte Überblendung und Slide-Animation beim Wechseln des Jahres
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            aria-labelledby="year-heading"
            className="w-full max-w-6xl"
          >
            {/* Jahresüberschrift */}
            <h1
              id="year-heading"
              className="text-5xl md:text-7xl mb-2 text-brand-500 font-bold tracking-wider"
            >
              {currentYear}
            </h1>

            {/* Panels werden dynamisch über PanelRenderer geladen */}
            <div className="space-y-6">
              {(current?.panels ?? []).map((p, i) => (
                <PanelRenderer key={i} panel={p} />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Zeitleiste am unteren Bildschirmrand */}
      <TimelineRail
        years={YEARS}
        activeYear={currentYear}
        onSelect={go}
        onPrev={() => prevYear && go(prevYear)}
        onNext={() => nextYear && go(nextYear)}
      />

      {/* Footer mit angedeuteten rechtlichen Links */}
      <footer className="text-xs text-text-tertiary px-6 py-4 flex gap-4 justify-between mt-10">
        <span>© lightshift labs</span>
        <div className="flex gap-4">
          <a
            className="hover:text-text-secondary"
            href="#"
            aria-label="Datenschutz"
          >
            DSGVO
          </a>
          <a
            className="hover:text-text-secondary"
            href="#"
            aria-label="Impressum"
          >
            Impressum
          </a>
        </div>
      </footer>

      {/* Sidebar-Menü */}
      <MenuSidebar
        open={menuOpen}
        onClose={closeMenu}
        returnFocusEl={returnFocusEl}
      />
    </div>
  );
}
