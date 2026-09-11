import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CONTACT_EMAIL, CONTACT_PHONE, NAV_LINKS, STUDIO_ADDRESS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo className="text-footer-text" />
            <p className="mt-4 max-w-xs text-sm text-footer-muted">
              A Lagos-based film and video production studio. Documentaries,
              commercials, live production and brand content for local and
              international clients.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm text-footer-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-footer-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2 text-sm text-footer-muted">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-footer-text">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-footer-text">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>{STUDIO_ADDRESS}</li>
            </ul>
            <div className="mt-4 flex gap-4 font-mono text-xs uppercase tracking-widest">
              <a
                href="https://www.instagram.com/filmbydt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-accent"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/FilmbyDT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-muted hover:text-accent"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-footer-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Neo Lens Studios. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/portal/login" className="hover:text-accent">
              Client Login
            </Link>
            <span>Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
