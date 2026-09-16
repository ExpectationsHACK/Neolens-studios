import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CONTACT_EMAIL, CONTACT_PHONE, NAV_LINKS, STUDIO_ADDRESS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-footer-text">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-footer-text" />
            <p className="mt-4 max-w-sm font-body text-sm text-footer-muted leading-relaxed">
              Neo Lens Studios is a Lagos-based film and video production studio creating cinematic films, commercials, documentaries, corporate content, live productions and visual stories.
            </p>
            <p className="mt-3 font-body text-xs font-semibold text-accent">
              Film • Video • Content • Creative — Lagos, Nigeria
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-accent">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-footer-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-accent">
              Contact Us
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-footer-muted">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>{STUDIO_ADDRESS}</li>
            </ul>
            <div className="mt-6 flex gap-4 font-body text-xs font-semibold uppercase tracking-wider">
              <a
                href="https://www.instagram.com/filmbydt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/FilmbyDT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-accent transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 font-body text-xs text-footer-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Neo Lens Studios. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/portal/login" className="hover:text-accent transition-colors">
              Client Portal
            </Link>
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
