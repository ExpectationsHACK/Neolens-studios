"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ALL_SERVICES } from "@/lib/servicesData";

export function ServicesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "prev" | "next") => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? 280 : 230;
    const amount = direction === "next" ? cardWidth * 2 : -cardWidth * 2;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Centered Header with Top-Right Nav Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
            WHAT WE DO
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Six ways we tell your story<span className="text-accent">.</span>
          </h2>
          <p className="mt-3 font-body text-base text-text-muted leading-relaxed">
            Every project starts with the same question: what&apos;s this actually for? The format follows the answer.
          </p>
        </div>

        {/* Manual Arrow Controls (Previous & Forward Arrow) */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={() => scroll("prev")}
            disabled={!canScrollLeft}
            aria-label="Previous carousel item"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
              canScrollLeft
                ? "border-white/30 bg-white/5 text-white hover:border-accent hover:bg-accent hover:text-black cursor-pointer"
                : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scroll("next")}
            disabled={!canScrollRight}
            aria-label="Next carousel item"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
              canScrollRight
                ? "border-white/30 bg-white/5 text-white hover:border-accent hover:bg-accent hover:text-black cursor-pointer"
                : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Manual Scroll Container (NO Auto-Scroll) */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {ALL_SERVICES.map((service) => (
          <div
            key={service.id}
            className="group w-[220px] shrink-0 snap-start sm:w-[260px] cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-2xl">
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <span className="absolute top-3 left-3 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 font-heading text-xs font-bold text-accent border border-white/10">
                {service.number}
              </span>
            </div>

            <p className="mt-4 text-center font-heading text-base font-extrabold uppercase tracking-wide text-white group-hover:text-accent transition-colors">
              {service.title}
            </p>
          </div>
        ))}
      </div>

      {/* Pill Button Below Carousel */}
      <div className="mt-10 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-surface px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-accent hover:bg-accent hover:text-black shadow-lg"
        >
          Tell us about your project
          <span className="text-sm">→</span>
        </Link>
      </div>
    </div>
  );
}
