import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "./data/timeline.json";
import Header from "./components/Header.jsx";
import TimelineRail from "./components/TimelineRail.jsx";
import MenuSidebar from "./components/MenuSidebar.jsx";
import PanelRenderer from "./components/PanelRenderer.jsx";

const YEARS = data.map((d) => d.year);
const LATEST = Math.max(...YEARS);

export default function App() {
  // Navigation
  const { year } = useParams();
  const navigate = useNavigate();

  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const [returnFocusEl, setReturnFocusEl] = useState(null);

  // Menü-Funktionen
  const openMenu = (triggerEl) => {
    setReturnFocusEl(triggerEl);
    setMenuOpen(true);
  };
  const closeMenu = () => setMenuOpen(false);

  // Timeline-Funktionen
  const currentYear = useMemo(() => {
    const y = parseInt(year, 10);
    return Number.isFinite(y) && YEARS.includes(y) ? y : LATEST;
  }, [year]);

  const idx = YEARS.indexOf(currentYear);
  const prevYear = YEARS[idx - 1];
  const nextYear = YEARS[idx + 1];
  const go = (y) => navigate(`/${y}`, { replace: false });

  useEffect(() => {
    const onKey = (e) => {
      if (menuOpen) return; // Navigation sperren während Menü
      if (e.key === "ArrowLeft" && prevYear) go(prevYear);
      if (e.key === "ArrowRight" && nextYear) go(nextYear);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevYear, nextYear, menuOpen]);

  const current = data.find((d) => d.year === currentYear);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuOpen={openMenu} />

      <main
        className="flex-1 flex items-center justify-center px-6"
        aria-hidden={menuOpen ? "true" : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={currentYear}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            aria-labelledby="year-heading"
            className="w-full max-w-6xl"
          >
            <h1
              id="year-heading"
              className="text-6xl md:text-8xl mb-2 text-brand-500 font-bold tracking-wider"
            >
              {currentYear}
            </h1>
            <div className="space-y-6">
              {(current?.panels ?? []).map((p, i) => (
                <PanelRenderer key={i} panel={p} />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <TimelineRail
        years={YEARS}
        activeYear={currentYear}
        onSelect={go}
        onPrev={() => prevYear && go(prevYear)}
        onNext={() => nextYear && go(nextYear)}
      />

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

      {/* Sidebar */}
      <MenuSidebar
        open={menuOpen}
        onClose={closeMenu}
        returnFocusEl={returnFocusEl}
      />
    </div>
  );
}
