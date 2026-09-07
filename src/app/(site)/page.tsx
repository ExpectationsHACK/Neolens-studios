import Link from "next/link";
import Image from "next/image";
import { ApertureMark } from "@/components/ApertureMark";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedClients, getFeaturedProjects } from "@/lib/data";
import { isMedia } from "@/types";

const SERVICES = [
  {
    tag: "01",
    title: "Documentaries",
    description:
      "Long-form, character-driven stories — from development and research through shoot and edit.",
  },
  {
    tag: "02",
    title: "Commercials",
    description:
      "Brand and product films built for broadcast, cinema and paid social, shot to cut down fast.",
  },
  {
    tag: "03",
    title: "Corporate Events",
    description: "Multi-camera capture of conferences, launches and internal events, delivered fast.",
  },
  {
    tag: "04",
    title: "Live Production",
    description: "Full live-production crews and gear for concerts, ceremonies and broadcasts.",
  },
  {
    tag: "05",
    title: "Brand Content",
    description: "Ongoing content series for a brand's own channels — social-first, consistent, on-voice.",
  },
  {
    tag: "06",
    title: "Video Podcast",
    description: "Studio and on-location podcast capture, multi-cam, edited for full episodes and clips.",
  },
] as const;

export default async function HomePage() {
  const [featuredProjects, featuredClients] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedClients(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:items-center md:py-32">
          <div className="animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Neo Lens Studios · Lagos, Nigeria
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-6xl">
              We shoot the story
              <br /> before it&apos;s told.
            </h1>
            <p className="mt-6 max-w-lg text-text-muted">
              A Lagos-based film and video production studio — documentaries,
              commercials, corporate films, live production and brand content
              for clients building something worth watching.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-accent-hover"
              >
                See our work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-text transition-colors hover:border-accent hover:text-accent"
              >
                Start a project
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[280px] md:max-w-none">
            <ApertureMark className="w-full text-accent" />
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading index="/ 01" eyebrow="Selected work" title="Featured projects" />
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
            >
              View all work →
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-border p-10 text-center text-text-muted">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                No featured projects yet
              </p>
              <p className="mt-2 text-sm">
                Add projects in the admin and mark them &ldquo;Featured&rdquo; to
                show them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            index="/ 02"
            eyebrow="What we do"
            title="Six ways we tell your story"
            description="Every project starts with the same question: what's this actually for? The format follows the answer."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-surface p-8">
                <p className="font-mono text-xs text-accent">{service.tag}</p>
                <h3 className="mt-3 font-display text-xl font-medium text-text">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading index="/ 03" eyebrow="Trusted by" title="Brands we've worked with" />
          {featuredClients.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
              {featuredClients.map((client) => {
                const logo = isMedia(client.logo) ? client.logo : null;
                return (
                  <div
                    key={client.id}
                    className="flex h-16 items-center justify-center opacity-70 grayscale transition-opacity hover:opacity-100"
                  >
                    {logo?.url ? (
                      <Image
                        src={logo.url}
                        alt={client.name}
                        width={120}
                        height={48}
                        className="max-h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                        {client.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-border p-10 text-center text-text-muted">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                No clients marked featured yet
              </p>
              <p className="mt-2 text-sm">
                Add clients in the admin and mark them &ldquo;Featured&rdquo; to
                show their logo here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Got a story that needs telling?
          </h2>
          <p className="mt-4 text-text-muted">
            Tell us about the project — budget, timeline, format — and we&apos;ll
            get back to you within two working days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-accent-hover"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
