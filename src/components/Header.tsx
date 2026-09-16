"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0c0e]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo className="text-white" variant="light" />

        <nav className="hidden items-center gap-8 font-body text-sm font-semibold tracking-wide md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-accent hover:bg-accent hover:text-black md:inline-flex"
        >
          Get in Touch
          <span className="text-base leading-none">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-2 border-t border-white/10 bg-[#0b0c0e] px-6 py-6 font-body text-base font-semibold md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 text-white/80 hover:text-accent">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 rounded-full bg-accent py-3 text-center text-xs font-semibold uppercase tracking-wider text-black"
          >
            Get in Touch →
          </Link>
        </nav>
      )}
    </header>
  );
}
