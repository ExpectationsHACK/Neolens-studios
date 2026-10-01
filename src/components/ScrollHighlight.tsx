"use client";

import { useEffect, useRef } from "react";

/**
 * A heading whose words light up one by one as it scrolls up the screen.
 * Only sets a single CSS variable (--p, 0 → 1); the per-word opacity is
 * computed in globals.css (.scroll-highlight).
 */
export function ScrollHighlight({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the heading's top is at 90% of the viewport, 1 at 30%.
      const progress = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.6)));
      el.style.setProperty("--p", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <h2
      ref={ref}
      className={`scroll-highlight ${className}`}
      style={{ "--n": words.length } as React.CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i} data-word style={{ "--i": i } as React.CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
