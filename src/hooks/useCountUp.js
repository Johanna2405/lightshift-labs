import { useEffect, useRef, useState } from "react";

export default function useCountUp(
  target = 0,
  { duration = 1200, startOnView = true } = {}
) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    const run = () => {
      if (started.current) return;
      started.current = true;

      if (prefersReduced || duration <= 0) {
        setValue(target);
        return;
      }

      const t0 = performance.now();
      const anim = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    };

    if (!startOnView) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && (run(), io.disconnect())),
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration, startOnView]);

  return { ref, value };
}
