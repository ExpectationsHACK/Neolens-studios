"use client";

import { useEffect, useImperativeHandle, useRef, type Ref, type VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "preload" | "src"> & {
  src: string;
  ref?: Ref<HTMLVideoElement>;
};

/**
 * A muted, looping background video that downloads nothing until it's near
 * the viewport and only plays while it's on screen. Use it instead of
 * `<video autoPlay>` anywhere more than one clip can be on a page.
 */
export function LazyVideo({ src, ref, muted = true, loop = true, playsInline = true, ...rest }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (reduceMotion) {
          // Show a still first frame instead of motion.
          video.preload = "metadata";
          observer.disconnect();
          return;
        }
        video.play().catch(() => {});
      },
      // Start fetching a little before the clip scrolls into view.
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      preload="none"
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...rest}
    />
  );
}
