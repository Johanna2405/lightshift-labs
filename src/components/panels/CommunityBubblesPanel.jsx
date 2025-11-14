function Bubble({ avatar, user, text, delay = 0, offset = "none" }) {
  // leicht variierende Offsets für organischen Flow
  const offsetClass =
    offset === "small"
      ? "md:translate-x-2"
      : offset === "medium"
      ? "md:translate-x-4"
      : offset === "negative"
      ? "md:-translate-x-3"
      : "";

  return (
    <div
      className={`avoid-break mb-4 animate-bubble ${offsetClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt={`Avatar von ${user}`}
          className="h-8 w-8 rounded-full object-cover bg-bg-700 border border-border-600 mt-1"
          loading="lazy"
          width="32"
          height="32"
        />
        <div className="max-w-full rounded-2xl border border-border-600 bg-bg-800/90 px-4 py-3 animate-float">
          <div className="text-xs text-text-tertiary mb-1">@{user}</div>
          <p className="text-sm text-text-secondary">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function CommunityBubblesPanel({
  headline,
  subhead,
  messages = [],
}) {
  // leichte Variation: Delay & Offsets wiederkehrend nach Index
  const items = messages.map((m, i) => ({
    ...m,
    delay: 35 * i,
    offset:
      i % 5 === 0
        ? "medium"
        : i % 5 === 2
        ? "small"
        : i % 7 === 3
        ? "negative"
        : "none",
  }));

  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      <header className="mb-12">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-2 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      {/* Masonry-Columns: 1 / 2 / 3 Spalten */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {items.map((m, i) => (
          <Bubble
            key={i}
            avatar={m.avatar}
            user={m.user}
            text={m.text}
            delay={m.delay}
            offset={m.offset}
          />
        ))}
      </div>
    </section>
  );
}
