import { useMemo, useRef, useState } from "react";

function formatTime(s = 0) {
  const sec = Math.max(0, Math.floor(s));
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const r = (sec % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}

export default function PodcastPanel({
  headline,
  subhead,
  episodeTitle,
  description,
  audio,
  cover,
  duration,
  chapters = [],
  transcript = [],
}) {
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasTranscript = Array.isArray(transcript) && transcript.length > 0;
  const safeChapters = useMemo(
    () =>
      Array.isArray(chapters)
        ? chapters.filter((c) => Number.isFinite(c.time))
        : [],
    [chapters]
  );

  const onSeek = (t) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      audioRef.current.play?.();
    }
  };

  return (
    <section className="w-full rounded-2xl border border-border-600 p-6 md:p-8 bg-bg-800/40">
      {/* Panel-Header */}
      <header className="mb-6">
        {headline && (
          <h2 className="text-2xl md:text-3xl mb-1 font-semibold">
            {headline}
          </h2>
        )}
        {subhead && <p className="text-text-secondary">{subhead}</p>}
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Cover + Meta */}
        <div className="lg:col-span-2">
          <figure className="rounded-xl overflow-hidden border border-border-600 bg-bg-900/60">
            <img
              src={cover}
              alt={`Cover: ${episodeTitle || "Podcast Episode"}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>

          <div className="mt-4">
            {episodeTitle && (
              <h3 className="text-xl font-semibold">{episodeTitle}</h3>
            )}
            {description && (
              <p className="text-text-secondary mt-1 text-sm">{description}</p>
            )}
            {Number.isFinite(duration) && (
              <p className="text-text-tertiary text-xs mt-1">
                Dauer: {formatTime(duration)}
              </p>
            )}
          </div>
        </div>

        {/* Player + Kapitel + Transcript */}
        <div className="lg:col-span-3">
          {/* Native Player (zugänglich, einfach, performant) */}
          <div className="rounded-xl border border-border-600 bg-bg-900/60 p-4">
            <audio
              ref={audioRef}
              className="w-full"
              src={audio}
              controls
              preload="metadata"
              aria-label={episodeTitle || "Podcast"}
            />
            {/* Optional: Download-Link */}
            <div className="mt-2 text-xs">
              <a
                className="underline hover:text-text-secondary"
                href={audio}
                download
              >
                Audio herunterladen
              </a>
            </div>
          </div>

          {/* Chapters */}
          {safeChapters.length > 0 && (
            <div className="mt-5">
              <div className="text-sm font-medium mb-2">Kapitel</div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {safeChapters.map((c, i) => (
                  <li key={i}>
                    <button
                      onClick={() => onSeek(c.time)}
                      className="w-full text-left px-3 py-2 rounded-lg border border-border-600 hover:border-border-500 hover:bg-bg-700 focus-visible:focus-ring"
                    >
                      <span className="text-xs text-text-tertiary mr-2">
                        {formatTime(c.time)}
                      </span>
                      <span>{c.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transcript (auf/zu) */}
          {hasTranscript && (
            <div className="mt-6 border-t border-border-600 pt-4">
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="px-3 py-2 rounded-lg border border-border-600 hover:border-border-500 hover:bg-bg-700 focus-visible:focus-ring text-sm"
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls="transcript-panel"
              >
                {isOpen ? "Transkript ausblenden" : "Transkript anzeigen"}
              </button>

              <div
                id="transcript-panel"
                hidden={!isOpen}
                className="mt-3 space-y-2 text-sm text-text-secondary"
              >
                {transcript.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
