"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * The hero background reel. It's the heaviest file on the site, so it only
 * starts downloading once everything else on the page has loaded, fades in
 * when its first frame is ready, and is skipped entirely for visitors on
 * data saver or a 2G connection (they keep the dark hero).
 */
export function HeroVideo({ src, className = "" }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || /2g$/.test(connection?.effectiveType ?? "")) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => {
      if (reduceMotion) {
        // A still first frame instead of motion.
        video.preload = "metadata";
        video.src = src;
        return;
      }
      video.src = src;
      video.play().catch(() => {
        // Autoplay can be refused (e.g. low-power mode); the dark hero stays.
      });
    };

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onLoadedData={() => setReady(true)}
      className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
