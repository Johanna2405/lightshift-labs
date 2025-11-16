import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MenuSidebar({ open, onClose, returnFocusEl }) {
  const panelRef = useRef(null);

  // ESC schließt; Body-Scroll lock; Fokus setzen/trappen
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      panelRef.current?.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      ) || [];

    const firstFocus = () => {
      const f = focusables();
      if (f.length) f[0].focus();
    };

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = focusables();
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

    const t = setTimeout(firstFocus, 0);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Fokus zurück auf Trigger
      if (returnFocusEl && typeof returnFocusEl.focus === "function") {
        returnFocusEl.focus();
      }
    };
  }, [open, onClose, returnFocusEl]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.button
            aria-hidden
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Hauptmenü"
            ref={panelRef}
            className="fixed right-0 top-0 bottom-0 z-50 w-[88vw] max-w-sm bg-brand-500"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="h-full flex flex-col">
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2"></div>
                <button
                  onClick={onClose}
                  className="px-3 py-2 text-2xl focus-visible:focus-ring"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col min-h-4/5 justify-between">
                <nav className="p-5 text-sm">
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-2 text-lg tracking-widest uppercase font-light hover:font-medium"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <details className="group">
                        <summary className="cursor-pointer list-none">
                          <span className="block px-3 py-2 text-lg tracking-widest uppercase font-light hover:font-medium">
                            About +
                          </span>
                        </summary>
                        <ul className="mt-1 ml-4 pl-4 space-y-1">
                          <li>
                            <a
                              href="#"
                              className="block px-3 py-2 text-lg tracking-widest uppercase font-light hover:font-medium"
                            >
                              Historie
                            </a>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-2 text-lg tracking-widest uppercase font-light hover:font-medium"
                      >
                        Erlebe lightshift
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-3 py-2 text-lg tracking-widest uppercase font-light hover:font-medium"
                      >
                        Kontakt
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="mt-6 pt-4 px-8 flex flex-col gap-4">
                  <a
                    href="#"
                    className="hover:text-text-secondary font-light uppercase"
                  >
                    DSGVO
                  </a>
                  <a
                    href="#"
                    className="hover:text-text-secondary font-light uppercase"
                  >
                    Impressum
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
