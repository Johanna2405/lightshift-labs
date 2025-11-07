export default function TimelineRail({
  years,
  activeYear,
  onSelect,
  onPrev,
  onNext,
}) {
  const isFirst = activeYear === years[0];
  const isLast = activeYear === years[years.length - 1];

  return (
    <nav className="sticky bottom-0 z-20">
      <div className="mx-auto my-6 max-w-6xl px-4 py-3 flex items-center gap-3">
        <button
          className="px-3 py-2 text-2xl rounded-md border border-border-600 hover:border-border-500 disabled:opacity-40 focus-visible:focus-ring"
          onClick={onPrev}
          aria-label="Vorheriges Jahr"
          disabled={isFirst}
        >
          ←
        </button>

        <div className="flex-1 flex items-center gap-4 overflow-x-auto no-scrollbar px-2">
          <ol className="flex justify-between gap-6 w-full">
            {years.map((y) => {
              const active = y === activeYear;
              return (
                <li key={y} className="text-center">
                  <button
                    onClick={() => onSelect(y)}
                    className={`px-2 py-1 text-sm rounded-full transition focus-visible:focus-ring
                        ${
                          active
                            ? "text-text-primary font-semibold tracking-wide"
                            : "text-text-tertiary hover:text-text-secondary tracking-wide font-light"
                        }`}
                    aria-current={active ? "page" : undefined}
                    aria-label={`Jahr ${y}`}
                  >
                    <span
                      aria-hidden
                      className={`block h-2 w-2 rounded-full mx-auto mb-3
                          ${
                            active
                              ? "bg-brand-500 shadow-[0_0_0_4px_rgba(163,138,255,0.35)]"
                              : "bg-border-500"
                          }`}
                    />
                    {y}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <button
          className="px-3 py-2 text-2xl rounded-md border border-border-600 hover:border-border-500 disabled:opacity-40 focus-visible:focus-ring"
          onClick={onNext}
          aria-label="Nächstes Jahr"
          disabled={isLast}
        >
          →
        </button>
      </div>
    </nav>
  );
}
