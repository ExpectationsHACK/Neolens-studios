"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({ src, className = "" }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
}
