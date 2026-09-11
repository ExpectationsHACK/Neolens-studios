"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { isMedia } from "@/types";
import { categoryColor } from "@/lib/nav";

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[9/16]", "aspect-[4/5]"];

function MuteIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      {muted ? (
        <path d="M16.5 8.5l5 7M21.5 8.5l-5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <path
          d="M16.5 9a4 4 0 010 6M19 6.5a7.5 7.5 0 010 11"
          fill="none"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function PhoneGalleryTile({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const cover = isMedia(project.coverImage) ? project.coverImage : null;
  const video = isMedia(project.videoFile) ? project.videoFile : null;
  const color = categoryColor(project.category);
  const aspect = ASPECTS[index % ASPECTS.length];

  return (
    <div
      className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-surface ${aspect}`}
    >
      <Link href={`/work/${project.slug}`} className="absolute inset-0 block">
        {video?.url ? (
          <video
            ref={videoRef}
            src={video.url}
            poster={cover?.url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt || project.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              No footage yet
            </span>
          </div>
        )}
      </Link>

      <span
        className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white/70"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {video?.url && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            const el = videoRef.current;
            if (!el) return;
            el.muted = !el.muted;
            setMuted(el.muted);
          }}
          aria-label={muted ? "Unmute preview" : "Mute preview"}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 backdrop-blur transition-transform hover:scale-105"
        >
          <MuteIcon muted={muted} />
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 pt-8">
        <p className="line-clamp-2 text-xs font-medium text-white">{project.title}</p>
      </div>
    </div>
  );
}
