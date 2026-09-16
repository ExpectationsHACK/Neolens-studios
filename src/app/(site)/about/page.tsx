import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Neo Lens Studios is a Lagos-based film and video production studio creating cinematic films, commercials, documentaries, corporate content and visual stories.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero / Who We Are */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-3">
            ABOUT US — WHO WE ARE
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            Good stories deserve great execution<span className="text-accent">.</span>
          </h1>
          <div className="mt-8 space-y-6 font-body text-base text-text-muted leading-relaxed sm:text-lg">
            <p>
              Neo Lens Studios is a Lagos-based film and video production company built around one simple idea: <strong className="text-white">Good stories deserve great execution.</strong>
            </p>
            <p>
              We work with brands, businesses, organisations, creators and individuals to develop and produce compelling visual content that communicates clearly and leaves an impression.
            </p>
            <p>
              From concept development and pre-production to filming, editing and final delivery, we provide an end-to-end production experience designed to make creating great content easier.
            </p>
            <p>
              Our approach combines <strong className="text-white">storytelling, technology, creative direction and production expertise</strong> to deliver visuals that are not only beautiful, but purposeful.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="border-b border-border bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/10 bg-surface-raised p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-3">
              OUR PHILOSOPHY
            </p>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl mb-6">
              We don&apos;t create content just because content needs to be created.
            </h2>
            <p className="font-body text-base text-text-muted mb-6 leading-relaxed">
              We ask: <strong className="text-white">What is the story? Who are we speaking to? What should they feel? What should they remember?</strong> And most importantly, <strong className="text-accent">what should the content achieve?</strong>
            </p>
            <div className="border-t border-white/10 pt-6 font-heading text-lg font-bold text-accent">
              The answers shape everything we do.
            </div>
          </div>
        </div>
      </section>

      {/* Why Neo Lens? */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-3xl">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              WHY NEO LENS?
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              More Than A Production Company<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 font-body text-base text-text-muted">
              We don&apos;t just operate cameras. We combine storytelling, production expertise and business thinking to make content that has a purpose.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Story-Led",
                desc: "We start with the story and objective—not the equipment.",
              },
              {
                title: "Production-Ready",
                desc: "Our experience across film, commercial and corporate production allows us to build the right team and workflow for every project.",
              },
              {
                title: "Cinematic Craft",
                desc: "We pay attention to cinematography, lighting, sound, composition, editing and every detail that makes a production feel intentional.",
              },
              {
                title: "Business-Minded",
                desc: "Great visuals should achieve something. We create content with your audience, platform and business objective in mind.",
              },
              {
                title: "Reliable Delivery",
                desc: "Clear communication, organised production and professional post-production from start to finish.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-surface p-6 transition-all hover:border-accent/50"
              >
                <div className="h-2 w-8 bg-accent rounded-full mb-4" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              THE TEAM
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              The People Behind The Lens<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 font-body text-base text-text-muted">
              Great productions are built by people. Our team brings together creative direction, cinematography, production, editing, sound and project management to turn ideas into finished stories.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Bethel Eweama */}
            <div className="rounded-2xl border border-white/10 bg-surface-raised p-8 shadow-xl">
              <div className="h-16 w-16 rounded-full bg-accent text-black font-heading font-extrabold text-2xl flex items-center justify-center mb-6">
                BE
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Bethel Eweama
              </h3>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent mt-1">
                Founder / Creative Director
              </p>
              <p className="mt-4 font-body text-sm text-text-muted leading-relaxed">
                Bethel Eweama is a creative entrepreneur and production professional passionate about helping brands, businesses and creatives communicate through powerful visual storytelling. With experience across film production, equipment, creative production and business development, Bethel brings both creative and commercial thinking to every project.
              </p>
              <blockquote className="mt-6 border-l-2 border-accent pl-4 font-body text-xs italic text-white">
                “I believe great creative work should not only look good. It should create value.”
              </blockquote>
            </div>

            {/* Goodness Eweama */}
            <div className="rounded-2xl border border-white/10 bg-surface-raised p-8 shadow-xl">
              <div className="h-16 w-16 rounded-full bg-accent text-black font-heading font-extrabold text-2xl flex items-center justify-center mb-6">
                GE
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Goodness Eweama
              </h3>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent mt-1">
                Director / Creative & Production
              </p>
              <p className="mt-4 font-body text-sm text-text-muted leading-relaxed">
                Goodness Eweama brings strong storytelling, communication, organisation and creative direction to the production process. Her ability to combine creative thinking with structured execution helps projects move from idea to finished production with clarity and purpose.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-black hover:bg-accent-hover transition-all"
            >
              Start a Project
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
