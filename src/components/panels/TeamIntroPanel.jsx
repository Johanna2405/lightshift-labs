export default function TeamIntroPanel({
  headline,
  subhead,
  members,
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
        <p className="text-text-secondary text-s mt-4"> {text}</p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <li
            key={i}
            className="rounded-xl border border-border-600 p-4 bg-bg-900/60"
          >
            <div className="flex items-center gap-4">
              <img
                src={m.avatar}
                alt={`Avatar ${m.name}`}
                className="h-14 w-14 rounded-full object-cover bg-bg-700"
                loading="lazy"
                width="56"
                height="56"
              />
              <div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-text-tertiary">{m.role}</div>
              </div>
            </div>
            {m.quote && (
              <p className="mt-3 text-sm text-text-secondary">“{m.quote}”</p>
            )}
            {Array.isArray(m.tags) && m.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {m.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full border border-border-500 text-text-tertiary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
