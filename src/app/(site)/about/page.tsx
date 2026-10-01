import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Neo Lens Studios is a film and video production company in Lagos, making commercials, documentaries, corporate and event films, live broadcasts, video podcasts and photography.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero / Who We Are */}
      <section className="border-b border-border bg-base py-24">
        <div data-reveal className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-3">
            ABOUT US — WHO WE ARE
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            A Lagos film studio that handles the whole production<span className="text-accent">.</span>
          </h1>
          <div className="mt-8 space-y-6 font-body text-base text-text-muted leading-relaxed sm:text-lg">
            <p>
              Neo Lens Studios is a film and video production company in Lagos. We plan, film and edit <strong className="text-white">commercials, documentaries, corporate and event films, live broadcasts, video podcasts and photography.</strong>
            </p>
            <p>
              Our clients are brands, businesses, organisations, creators and individuals who need video that explains what they do and gets their audience to act.
            </p>
            <p>
              We handle every stage: concept, script, pre-production, filming, editing, colour, sound and delivery in the formats you need. You work with one team instead of hiring each part separately.
            </p>
            <p>
              Every decision, from the script to the final cut, is made against one question: <strong className="text-white">what should this film achieve?</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="border-b border-border bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div data-reveal="scale" className="rounded-2xl border border-white/10 bg-surface-raised p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-3">
              OUR PHILOSOPHY
            </p>
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl mb-6">
              Every project starts with what the film needs to achieve.
            </h2>
            <p className="font-body text-base text-text-muted mb-6 leading-relaxed">
              We ask: <strong className="text-white">What is the story? Who are we speaking to? What should they feel? What should they remember?</strong> And most importantly, <strong className="text-accent">what should the content achieve?</strong>
            </p>
            <div className="border-t border-white/10 pt-6 font-heading text-lg font-bold text-accent">
              The answers decide the script, the format, the crew and the edit.
            </div>
          </div>
        </div>
      </section>

      {/* Why Neo Lens? */}
      <section className="border-b border-border bg-base py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-14 max-w-3xl">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              WHY NEO LENS?
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              What working with us looks like<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 font-body text-base text-text-muted">
              Five things you can expect on every project.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Story first",
                desc: "We agree the story and the goal with you before we talk about cameras or locations.",
              },
              {
                title: "The right crew",
                desc: "We put together the crew and equipment each format needs, from a small interview setup to multi-camera live coverage.",
              },
              {
                title: "Planned craft",
                desc: "Cinematography, lighting, sound, framing and editing are planned before the shoot, so the finished film looks the way it was designed to.",
              },
              {
                title: "Made for the platform",
                desc: "We cut each film for where it will be seen, whether that's Instagram, YouTube, TV or a conference screen, and for what you want viewers to do next.",
              },
              {
                title: "Dates you can plan around",
                desc: "You get a schedule before the shoot, updates during production, and final files in the formats you need.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                data-reveal
                data-glow
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
          <div data-reveal className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
              THE TEAM
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              The People Behind The Lens<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 font-body text-base text-text-muted">
              Our team covers creative direction, cinematography, production, editing, sound and project management, so your project stays with one crew from brief to delivery.
            </p>
          </div>

          <div data-reveal className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-xl md:grid-cols-[2fr_3fr]">
            <div className="relative aspect-square md:aspect-auto">
              <Image
                src="/videos/bts/Director.jpeg"
                alt="Goodness Eweama, Creative Director of Neo Lens Studios"
                fill
                sizes="(min-width: 768px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 sm:p-10">
              <h3 className="font-heading text-2xl font-bold text-white">
                Goodness Eweama
              </h3>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent mt-1">
                Creative Director
              </p>
              <p className="mt-4 font-body text-sm text-text-muted leading-relaxed">
                Goodness Eweama is Creative Director at Neo Lens Studios. She shapes each project&apos;s story and creative direction, plans the production and keeps the shoot organised, taking every film from the first brief to the final edit.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-black hover:bg-accent-hover transition-all"
            >
              Start a Project
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
      <ScrollReveal />
    </div>
  );
}
