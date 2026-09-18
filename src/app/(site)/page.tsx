import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";
import { BrandStatementCards } from "@/components/BrandStatementCards";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { BtsVideoGallery } from "@/components/BtsVideoGallery";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PhoneGalleryTile } from "@/components/PhoneGalleryTile";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllClients, getFeaturedProjects, getTeamMembers } from "@/lib/data";
import { isMedia } from "@/types";

export default async function HomePage() {
  const [featuredProjects, allClients, team] = await Promise.all([
    getFeaturedProjects(12),
    getAllClients(),
    getTeamMembers(),
  ]);

  return (
    <>
      {/* 1. HERO SECTION — Clean wordmark & hero video, paragraph removed as requested */}
      <section className="relative flex h-[85vh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-black">
        <HeroVideo
          src="/videos/bts/hero-video.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="animate-fade-up font-heading text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            NEO <span className="text-accent">LENS</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-body text-xs font-semibold uppercase tracking-wider">
            <Link
              href="/work"
              className="rounded-full bg-accent px-8 py-3.5 text-black transition-all hover:bg-accent-hover hover:scale-105 shadow-lg shadow-accent/20"
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
      </section>

      {/* 2. SHORT INTRO SECTION */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            We shoot the story before it&apos;s told<span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-body text-base text-text-muted leading-relaxed">
            A Lagos-based film and video production studio. Documentaries,
            commercials, corporate films, live production and brand content
            for clients building something worth watching.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="rounded-full bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-accent-hover"
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

      {/* 4. OUR WORK — PHONE GALLERY MASONRY */}
      <section className="bg-surface py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeading eyebrow="Selected work" title="Our work" tone="light" />
            <Link
              href="/work"
              className="font-body text-xs font-semibold uppercase tracking-widest text-accent hover:text-white transition-colors"
            >
              View all work →
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
              {featuredProjects.map((project, index) => (
                <PhoneGalleryTile key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/20 p-10 text-center text-white/60 rounded-2xl">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent">
                No projects yet
              </p>
              <p className="mt-2 text-sm">
                Add projects in the admin to show them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. BEHIND THE SCENES — BTS VIDEO GALLERY */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-7xl px-6">
          <BtsVideoGallery />
        </div>
      </section>

      {/* 6. WHAT WE DO — SERVICES CAROUSEL (Prev/Next Arrows, Card Style matching Reference Image 1) */}
      <section className="border-b border-border bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ServicesCarousel />
        </div>
      </section>

      {/* 7. CONTENT PARTNERS — ONGOING WORK */}
      <section className="bg-base py-24 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              ONGOING WORK
            </p>
            <h2 className="font-heading text-4xl font-extrabold uppercase leading-[1.05] text-white sm:text-5xl">
              We can become your <span className="text-accent">regular content partners</span>
            </h2>
            <p className="mt-6 font-body text-base text-white/70 leading-relaxed">
              Businesses now need more video content than ever, from
              short-form social cuts to full brand films. That&apos;s why we
              offer flexible ongoing packages that keep quality video flowing
              on your terms, without you having to start a new project from
              scratch every time.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-accent-hover hover:scale-105"
            >
              Learn more
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl">
            <video
              src="/videos/bts/crew-warehouse.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8. CLIENTS — LOGO MARQUEE */}
      <section className="py-24 bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Trusted by" title="Brands we've worked with" align="center" />
        </div>
        <div className="mt-12">
          <LogoMarquee clients={allClients} />
        </div>
      </section>

      {/* 9. MEET THE DIRECTORS (Reference Image 5) */}
      <section className="bg-base py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="THE TEAM" title="MEET THE DIRECTORS" tone="light" align="center" />
          
          <div className="mt-12 flex flex-wrap justify-center gap-12 sm:gap-16">
            {/* Bethel Eweama */}
            <div className="w-44 text-center group">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-accent/40 bg-surface shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-accent">
                <div className="flex h-full items-center justify-center font-heading text-2xl font-extrabold text-white">
                  BE
                </div>
              </div>
              <p className="mt-4 font-heading text-base font-bold text-white uppercase tracking-wider">
                BETHEL EWEAMA
              </p>
              <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-accent mt-1">
                Founder / Creative Director
              </p>
            </div>

            {/* Goodness Eweama */}
            <div className="w-44 text-center group">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-accent/40 bg-surface shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-accent">
                <div className="flex h-full items-center justify-center font-heading text-2xl font-extrabold text-white">
                  GE
                </div>
              </div>
              <p className="mt-4 font-heading text-base font-bold text-white uppercase tracking-wider">
                GOODNESS EWEAMA
              </p>
              <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-accent mt-1">
                Director / Creative & Production
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="bg-accent py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
            Got a story that needs telling?
          </h2>
          <p className="mt-4 font-body text-lg text-black/80">
            Tell us about the project. Budget, timeline, format, and
            we&apos;ll get back to you within two working days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-black px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-black/80 hover:scale-105"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
