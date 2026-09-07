"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src?: string | null;
  poster?: string | null;
  alt: string;
  className?: string;
};

export function VideoPlayer({ src, poster, alt, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return (
      <div className={`relative overflow-hidden bg-surface ${className}`}>
        {poster ? (
          <Image src={poster} alt={alt} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Footage coming soon
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden bg-surface ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster ?? undefined}
        playsInline
        muted
        loop
        preload="none"
        aria-label={alt}
        className="h-full w-full object-cover"
        onMouseEnter={() => {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        }}
        onMouseLeave={() => {
          videoRef.current?.pause();
          setPlaying(false);
        }}
      />
      {!playing && (
        <span className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/60 bg-base/70 font-mono text-[10px] text-accent">
          {"▶"}
        </span>
      )}
    </div>
  );
}
