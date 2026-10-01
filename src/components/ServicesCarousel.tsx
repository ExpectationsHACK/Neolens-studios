"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LazyVideo } from "@/components/LazyVideo";
import { RevealWords } from "@/components/RevealWords";
import { ALL_SERVICES, type ServiceItem } from "@/lib/servicesData";

// Lines the first card up with the max-w-6xl content column above it while
// letting the track run off the right edge of the viewport.
const TRACK_GUTTER = "max(1.5rem, calc(50% - 34.5rem))";

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href={`/services#${service.id}`}
      data-reveal
      data-glow
      className="group relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-white/10 transition-shadow duration-300 hover:ring-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[320px] lg:w-[360px]"
    >
      <LazyVideo
        src={service.video}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="font-heading text-sm font-bold tracking-wider text-white/80">
          {service.number}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-heading text-2xl font-extrabold leading-tight text-white">
          {service.title}
        </h3>
        <p className="mt-2 max-w-[28ch] font-body text-sm leading-relaxed text-white/70">
          {service.tagline}
        </p>
      </div>
    </Link>
  );
}

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ progress: 0, visible: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScroll({
        progress: max > 0 ? el.scrollLeft / max : 0,
        visible: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
        atStart: el.scrollLeft <= 4,
        atEnd: el.scrollLeft >= max - 4,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const thumbWidth = Math.max(scroll.visible, 0.08) * 100;

  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p data-reveal="fade" className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-accent">
            What we do
          </p>
          <RevealWords
            text="Eight ways we tell your story"
            suffix={<span className="text-accent">.</span>}
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
          />
          <p data-reveal className="mt-3 font-body text-base leading-relaxed text-text-muted">
            Every project starts with the same question: what&apos;s this actually for? The format follows the answer.
          </p>
        </div>

        <div data-reveal="fade" className="flex shrink-0 items-center gap-3">
          <CarouselArrow direction="prev" disabled={scroll.atStart} onClick={() => step(-1)} />
          <CarouselArrow direction="next" disabled={scroll.atEnd} onClick={() => step(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Services"
        tabIndex={0}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] focus-visible:outline-none sm:gap-5 [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: TRACK_GUTTER, scrollPaddingInline: TRACK_GUTTER }}
      >
        {ALL_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div data-reveal="fade" className="mx-auto mt-10 flex max-w-6xl items-center gap-8 px-6">
        <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <span
            className="absolute inset-y-0 rounded-full bg-accent transition-[left] duration-150 ease-out"
            style={{ width: `${thumbWidth}%`, left: `${scroll.progress * (100 - thumbWidth)}%` }}
          />
        </div>
        <Link
          href="/services"
          className="shrink-0 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-accent"
        >
          All services <span className="link-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

function CarouselArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous services" : "Next services"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:bg-accent hover:text-black disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/25 disabled:hover:bg-transparent"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
        <path
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
