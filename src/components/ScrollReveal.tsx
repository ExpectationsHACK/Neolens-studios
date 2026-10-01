"use client";

import { useEffect, useRef } from "react";

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 6;
// Longest entrance in globals.css (a 10-word heading: 0.45s stagger + 0.9s)
// plus slack.
const ENTRANCE_MS = 1600;
// Reveal once an element's top edge passes this fraction of the viewport.
const TRIGGER = 0.92;

/**
 * Reveals the `[data-reveal]` elements inside its parent element as they
 * scroll into view; elements that arrive together (a row of cards) are
 * staggered automatically.
 *
 * Render it as the last child of each page (and the footer) that uses
 * data-reveal — anything outside a ScrollReveal's parent stays hidden. It
 * lives inside the page rather than the layout on purpose: pages with a
 * loading.tsx hydrate after the layout, and touching their elements before
 * React has hydrated them causes hydration mismatches. An effect inside the
 * page only runs once the page itself has hydrated.
 *
 * Checks positions on scroll rather than using IntersectionObserver: a fast
 * scroll or an anchor jump can carry an element from below the fold to above
 * it between two frames, and an observer never reports that, so it would stay
 * hidden. A position check reveals anything at or above the trigger line.
 */
export function ScrollReveal() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = markerRef.current?.parentElement;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending: HTMLElement[] = [];
    let frame = 0;

    const reveal = (el: HTMLElement, delay: number) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.add("is-revealed");
      // Hand the element back to its own transitions (hover effects etc.)
      // once the entrance has finished.
      window.setTimeout(() => {
        el.removeAttribute("data-reveal");
        el.classList.remove("is-revealed");
        el.style.removeProperty("--reveal-delay");
      }, delay + ENTRANCE_MS);
    };

    const check = () => {
      frame = 0;
      const line = window.innerHeight * TRIGGER;
      let step = 0;
      pending = pending.filter((el) => {
        if (!el.isConnected) return false;
        const rect = el.getBoundingClientRect();
        if (rect.top > line) return true;
        // Already scrolled past: no point staggering what nobody can see.
        reveal(el, rect.bottom > 0 ? Math.min(step++, MAX_STAGGER_STEPS) * STAGGER_MS : 0);
        return false;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const collect = () => {
      pending = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
      schedule();
    };

    collect();
    // Content rendered later on the client (e.g. after a filter change).
    const mutations = new MutationObserver(collect);
    mutations.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <span ref={markerRef} hidden />;
}
