import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";
import { BrandStatementCards } from "@/components/BrandStatementCards";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { ClientLogos, LogoMarqueeSkeleton } from "@/components/ClientLogos";
import { LazyVideo } from "@/components/LazyVideo";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollHighlight } from "@/components/ScrollHighlight";
import { RevealWords } from "@/components/RevealWords";
import { ServicesTicker } from "@/components/ServicesTicker";
import { ScrollReveal } from "@/components/ScrollReveal";

const ABOUT_PILLARS = [
  { title: "Story first", text: "We agree the story and the goal with you before we talk cameras or locations." },
  { title: "Planned craft", text: "Lighting, sound, framing and colour are planned before the shoot, not fixed after it." },
  { title: "Made for the platform", text: "Each film is cut for where it will run: a TV spot, a 15-second reel or a YouTube episode." },
  { title: "Dates you can plan around", text: "We agree the schedule and delivery dates before the shoot, then keep to them." },
];

const VISION_POINTS = [
  {
    title: "African stories on screen",
    text: "Films about African businesses, people and ideas, made for audiences at home and abroad.",
  },
  {
    title: "International quality",
    text: "Cinematography, sound and colour that hold up next to international broadcast and streaming work.",
  },
  {
    title: "Clients who stay",
    text: "From a first campaign to years of monthly content with the same team.",
  },
];

// Serve a cached copy and re-render in the background at most once a minute,
// instead of querying the database on every visit.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION — Clean wordmark & hero video, paragraph removed as requested */}
      <section className="relative flex h-[85vh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-black">
        <HeroVideo
          src="/videos/bts/hero-video.mp4"
          className="hero-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div aria-hidden="true" className="hero-dim pointer-events-none absolute inset-0 bg-black opacity-0" />

        <div className="hero-content relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p
            aria-hidden="true"
            className="font-heading text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            <HeroWord word="NEO" offset={0} />{" "}
            <HeroWord word="LENS" offset={3} className="text-accent" />
          </p>

          <div className="animate-fade-up-late mt-8 flex flex-wrap items-center justify-center gap-4 font-body text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/work"
              className="btn-shine btn-shine-idle rounded-full bg-accent px-8 py-3.5 text-black transition-all hover:bg-accent-hover hover:scale-105 shadow-lg shadow-accent/20"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3.5 text-white transition-all hover:border-accent hover:bg-white hover:text-black"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div aria-hidden="true" className="animate-fade-up-late absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="hero-content flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
            <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </section>

      {/* 2. SHORT INTRO SECTION */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealWords
            as="h1"
            text="We plan, film and edit video for brands in Lagos"
            suffix={<span className="text-accent">.</span>}
            className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          />
          <p data-reveal className="mx-auto mt-6 max-w-lg font-body text-base text-text-muted leading-relaxed">
            Commercials, documentaries, corporate and event films, live
            broadcasts, video podcasts and photography, for local and
            international clients.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="btn-shine rounded-full bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-accent-hover"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 bg-surface px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BRAND STATEMENT CARDS — Old UI Card Style (As in Reference Images 2, 3, 4) */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-6xl px-6">
          <BrandStatementCards />
        </div>
      </section>

      {/* 4. ABOUT US */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <p data-reveal="fade" className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-accent">
              About us
            </p>
            <RevealWords
              text="One team, from the first idea to the final cut"
              suffix={<span className="text-accent">.</span>}
              className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl"
            />
            <p data-reveal className="mt-6 font-body text-lg leading-relaxed text-white/80">
              Neo Lens Studios plans, films and edits video for brands,
              businesses, organisations and creators. The same team handles the
              concept, script, crew, shoot, edit and delivery, so you brief one
              studio instead of hiring each part separately.
            </p>
            <Link
              href="/about"
              data-reveal
              className="mt-8 inline-block font-body text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              More about us <span className="link-arrow">→</span>
            </Link>
          </div>
          <div className="lg:pt-8">
            <p data-reveal className="font-body text-base leading-relaxed text-text-muted">
              Before we quote, we ask four questions. What&apos;s the story?
              Who is it for? What should they feel? What should the film
              achieve? The answers decide the script, the look, the crew and
              the edit.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2">
              {ABOUT_PILLARS.map((pillar) => (
                <div key={pillar.title} data-reveal>
                  <dt className="font-heading text-base font-bold text-white">{pillar.title}</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-text-muted">{pillar.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ServicesTicker />

      {/* 5. WHAT WE DO — SERVICES CAROUSEL */}
      <section className="border-b border-border bg-surface py-24">
        <ServicesCarousel />
      </section>

      {/* 6. CONTENT PARTNERS — ONGOING WORK */}
      <section className="bg-base py-24 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p data-reveal="fade" className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              ONGOING WORK
            </p>
            <RevealWords
              text="New video every month on one retainer"
              accentLast={3}
              className="font-heading text-4xl font-extrabold uppercase leading-[1.05] text-white sm:text-5xl"
            />
            <p data-reveal className="mt-6 font-body text-base text-white/70 leading-relaxed">
              Instead of briefing a new project each time, agree a monthly
              package with us. We plan the month&apos;s shoots in advance and
              deliver social cuts, reels and longer brand films from the same
              team, in the same style.
            </p>
            <Link
              href="/contact"
              data-reveal
              className="btn-shine mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-accent-hover hover:scale-105"
            >
              Ask about retainers <span className="link-arrow">→</span>
            </Link>
          </div>
          <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl">
            <LazyVideo
              src="/videos/bts/crew-warehouse.mp4"
              aria-hidden="true"
              className="parallax-media h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. CLIENTS — LOGO MARQUEE */}
      <section className="py-24 bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Trusted by" title="Brands we've worked with" align="center" />
        </div>
        <div data-reveal="fade" className="mt-12">
          <Suspense fallback={<LogoMarqueeSkeleton />}>
            <ClientLogos />
          </Suspense>
        </div>
      </section>

      {/* 8. CREATIVE DIRECTOR */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
          <div data-reveal="image" className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/videos/bts/Director.jpeg"
              alt="Goodness Eweama, Creative Director of Neo Lens Studios"
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              className="parallax-media object-cover"
            />
          </div>
          <div>
            <p data-reveal="fade" className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-accent">
              The team
            </p>
            <RevealWords
              text="Goodness Eweama"
              className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            />
            <p data-reveal="fade" className="mt-2 font-body text-xs font-semibold uppercase tracking-widest text-text-muted">
              Creative Director
            </p>
            <p data-reveal className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/80">
              Goodness leads creative direction at Neo Lens Studios. She shapes
              the story, plans the shoot and keeps each production organised,
              from the first brief to the final edit.
            </p>
            <Link
              href="/about"
              data-reveal
              className="mt-8 inline-block font-body text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              About the studio <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. VISION */}
      <section className="border-b border-border bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p data-reveal="fade" className="mb-6 font-body text-xs font-bold uppercase tracking-widest text-accent">
            Our vision
          </p>
          <ScrollHighlight
            text="To make films in Lagos that match the quality of productions anywhere in the world, and to put African stories in front of global audiences."
            className="max-w-4xl font-heading text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
          />
          <p data-reveal className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-muted">
            African brands and creators shouldn&apos;t have to choose between
            a crew that knows the local market and work that stands next to
            international productions. We&apos;re building a studio that offers
            both on every project.
          </p>
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
            {VISION_POINTS.map((point, index) => (
              <div key={point.title} data-reveal>
                <p className="font-heading text-sm font-bold text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-xl font-bold text-white">{point.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="relative overflow-hidden bg-accent py-24">
        <div
          aria-hidden="true"
          className="cta-glow pointer-events-none absolute -inset-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <RevealWords
            text="Have a project in mind?"
            className="font-heading text-4xl font-extrabold tracking-tight text-black sm:text-5xl"
          />
          <p data-reveal className="mt-4 font-body text-lg text-black/80">
            Send us the format, budget and timeline. We reply within two
            working days.
          </p>
          <Link
            href="/contact"
            data-reveal
            className="btn-shine mt-8 inline-block rounded-full bg-black px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-black/80 hover:scale-105"
          >
            Start a project <span className="link-arrow">→</span>
          </Link>
        </div>
      </section>
      <ScrollReveal />
    </>
  );
}

function HeroWord({ word, offset, className = "" }: { word: string; offset: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block overflow-hidden pb-[0.06em] ${className}`}>
      {word.split("").map((letter, i) => (
        <span key={i} className="hero-letter" style={{ "--i": offset + i } as React.CSSProperties}>
          {letter}
        </span>
      ))}
    </span>
  );
}
