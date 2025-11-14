import { useRef } from "react";

export default function PodcastPanel({
  headline,
  subhead,
  episodeTitle,
  description,
  audio,
  cover,
  duration,
}) {
  const audioRef = useRef(null);

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
        {/* Cover */}
        <div className="lg:col-span-2">
          <figure className="rounded-xl overflow-hidden border border-border-600 bg-bg-900/60">
            <img
              src={cover}
              alt={`Cover: ${episodeTitle || "Podcast Episode"}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border-600 bg-bg-900/60 p-6 flex flex-col gap-4">
            <div className="">
              {episodeTitle && (
                <h3 className="text-xl font-semibold">{episodeTitle}</h3>
              )}
              {description && (
                <p className="text-text-secondary mt-1 text-sm">
                  {description}
                </p>
              )}
              {Number.isFinite(duration) && (
                <p className="text-text-tertiary text-xs mt-1">Dauer: 3:13</p>
              )}
            </div>

            <audio
              ref={audioRef}
              className="w-full"
              src={audio}
              controls
              preload="metadata"
              aria-label={episodeTitle || "Podcast"}
            />
            {/* Download-Link */}
            <div className="mt-6 text-xs flex gap-4 items-center justify-end">
              <a className="btn-link--ghost" href={audio} download>
                Audio herunterladen
              </a>
              <a href="#" className="btn-link">
                Zur gesamten Folge
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
