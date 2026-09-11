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
    <header className="sticky top-0 z-50 bg-accent">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo className="text-white" variant="light" />

        <nav className="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-2 transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full border border-white/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-accent md:inline-block"
        >
          Start a project
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-white/20 bg-accent px-6 py-4 font-mono text-sm uppercase tracking-widest md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="py-2.5 text-white/80 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full border border-white/60 px-4 py-2.5 text-center text-white"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
