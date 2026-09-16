"use client";

import { useState, useRef, useEffect } from "react";

export type BtsVideo = {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
  aspectRatio?: string;
};

export const BTS_ITEMS: BtsVideo[] = [
  {
    id: "bts-1",
    src: "/videos/bts/crew-warehouse.mp4",
    title: "Warehouse Studio Setup",
    subtitle: "Lighting grid and multi-camera setup in action",
    category: "Behind The Lens",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "bts-2",
    src: "/videos/bts/clapperboard.mp4",
    title: "Take One — Commercial Set",
    subtitle: "Precision timing on a high-speed commercial production",
    category: "Production",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "bts-3",
    src: "/videos/bts/backstage.mp4",
    title: "Backstage & Directing",
    subtitle: "Guiding talent and fine-tuning frame composition",
    category: "Directing",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: "bts-4",
    src: "/videos/bts/interview-bts.mp4",
    title: "Executive Interview Studio",
    subtitle: "Soundproof studio setup for talking head content",
    category: "Studio",
    aspectRatio: "aspect-square",
  },
  {
    id: "bts-5",
    src: "/videos/bts/tv-manager.mp4",
    title: "Live Switching & Monitoring",
    subtitle: "Real-time production coordination on set",
    category: "Live Production",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "bts-6",
    src: "/videos/bts/cameraman-city.mp4",
    title: "Location Shooting — Lagos",
    subtitle: "Capturing authentic city visuals and handheld motion",
    category: "Cinematography",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "bts-7",
    src: "/videos/bts/talkshow-bts.mp4",
    title: "Multi-Cam Broadcast",
    subtitle: "Behind the scene of live talkshow coverage",
    category: "Broadcast",
    aspectRatio: "aspect-[4/5]",
  },
];

function BtsCard({
  item,
  onOpenModal,
}: {
  item: BtsVideo;
  onOpenModal: (video: BtsVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer ${
        item.aspectRatio || "aspect-[4/3]"
      }`}
    >
      <video
        ref={videoRef}
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-accent">
          {item.category}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute preview" : "Mute preview"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white transition-transform hover:scale-110"
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.14-.58.53-.44.89.14.36.53.58.89.44.78-.31 1.5-.73 2.15-1.24l1.4 1.4a.996.996 0 101.41-1.41L5.04 3.63a.996.996 0 00-1.41 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.37-.14-.77.04-.92.41-.14.37.04.77.41.92C17.49 6.09 19 8.87 19 12zm-3.5 0c0-.85-.3-1.63-.8-2.25l1.5-1.5C17.2 9.25 17.5 10.58 17.5 12c0 1.95-.97 3.68-2.46 4.74-.32.23-.39.68-.16 1 .23.32.68.39 1 .16C17.65 16.69 19 14.49 19 12zM12 4v2.18l2 2V4.71c0-.89-1.08-1.34-1.71-.71L12 4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-md text-accent shadow-xl transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <h4 className="font-heading text-lg font-bold text-white group-hover:text-accent transition-colors">
          {item.title}
        </h4>
        <p className="mt-1 font-body text-xs text-white/70 line-clamp-1">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export function BtsVideoGallery() {
  const [activeVideo, setActiveVideo] = useState<BtsVideo | null>(null);

  return (
    <div className="relative">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
          ON SET AT NEO LENS
        </p>
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          What it looks like behind the lens<span className="text-accent">.</span>
        </h2>
        <p className="mt-4 font-body text-base text-text-muted">
          A glimpse of the crew, the camera gear and the intentional craft that goes into every production. Click any video to play in full screen.
        </p>
      </div>

      {/* Grid of BTS Videos */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {BTS_ITEMS.map((item) => (
          <BtsCard key={item.id} item={item} onOpenModal={setActiveVideo} />
        ))}
      </div>

      {/* Lightbox Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <span className="font-body text-[10px] font-bold uppercase tracking-wider text-accent">
                  {activeVideo.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Subtitle */}
            <div className="p-6 bg-surface">
              <p className="font-body text-sm text-text-muted">
                {activeVideo.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
