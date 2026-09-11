import Link from "next/link";
import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";
import { BrandStatementCards } from "@/components/BrandStatementCards";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PhoneGalleryTile } from "@/components/PhoneGalleryTile";
import { SectionHeading } from "@/components/SectionHeading";
import InfiniteSpiral from "@/components/InfiniteSpiral";
import { getAllClients, getFeaturedProjects, getTeamMembers } from "@/lib/data";
import { isMedia } from "@/types";

const BTS_VIDEOS = [
  { src: "/videos/bts/crew-warehouse.mp4", alt: "Crew setting up a shot in a warehouse" },
  { src: "/videos/bts/clapperboard.mp4", alt: "Clapperboard marking a take" },
  { src: "/videos/bts/backstage.mp4", alt: "Backstage during a shoot" },
  { src: "/videos/bts/interview-bts.mp4", alt: "Behind the scenes of an interview setup" },
  { src: "/videos/bts/tv-manager.mp4", alt: "Director giving instructions on set" },
  { src: "/videos/bts/cameraman-city.mp4", alt: "Cameraman filming on location" },
  { src: "/videos/bts/talkshow-bts.mp4", alt: "Behind the camera on a talk-show set" },
];

const SERVICES = [
  { title: "Documentaries", video: "/videos/bts/backstage.mp4" },
  { title: "Commercials", video: "/videos/bts/clapperboard.mp4" },
  { title: "Corporate Events", video: "/videos/bts/tv-manager.mp4" },
  { title: "Live Production", video: "/videos/bts/talkshow-bts.mp4" },
  { title: "Brand Content", video: "/videos/bts/crew-warehouse.mp4" },
  { title: "Video Podcast", video: "/videos/bts/interview-bts.mp4" },
] as const;

export default async function HomePage() {
  const [featuredProjects, allClients, team] = await Promise.all([
    getFeaturedProjects(12),
    getAllClients(),
    getTeamMembers(),
  ]);

  return (
    <>
      {/* Hero — full-bleed video, wordmark centered, nothing else */}
      <section className="relative flex h-[85vh] min-h-[520px] w-full items-center justify-center overflow-hidden">
        <HeroVideo
          src="/videos/bts/cameraman-city.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <p className="relative animate-fade-up font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
          NEO <span className="text-accent">LENS</span>
        </p>
      </section>

      {/* Intro — white */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-7xl">
            We shoot the story before it&apos;s told.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-text-muted">
            A Lagos-based film and video production studio. Documentaries,
            commercials, corporate films, live production and brand content
            for clients building something worth watching.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
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
      </section>

      {/* Brand statement cards — white */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <BrandStatementCards />
        </div>
      </section>

      {/* Our work — phone-gallery masonry — black */}
      <section className="bg-footer py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work" title="Our work" tone="light" />
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:text-white"
            >
              View all work →
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="mt-12 columns-2 gap-3 sm:columns-3 lg:columns-4">
              {featuredProjects.map((project, index) => (
                <PhoneGalleryTile key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-white/20 p-10 text-center text-white/60">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                No projects yet
              </p>
              <p className="mt-2 text-sm">
                Add projects in the admin to show them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Behind the scenes — pale red */}
      <section className="border-b border-border bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="On set"
            title="What it looks like behind the lens"
            description="A glimpse of the crew, the setup and the in-between moments that don't make the final cut."
          />
        </div>
        <div className="relative mt-4 h-[520px] w-full">
          <InfiniteSpiral
            items={BTS_VIDEOS}
            animationMode="all"
            speed={0.45}
            radius={220}
            cardWidth={180}
            cardHeight={110}
            verticalSpacing={72}
            perspective={1100}
            cardRadius={12}
            centerScale={1.25}
            edgeBlur={8}
            cardsPerTurn={7}
            pauseOnHover
          />
        </div>
      </section>

      {/* What we do — gentle auto-scrolling carousel — white */}
      <section className="border-b border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we do"
            title="Six ways we tell your story"
            description="Every project starts with the same question: what's this actually for? The format follows the answer."
            align="center"
          />
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="flex w-max animate-marquee-slow gap-6">
            {[...SERVICES, ...SERVICES].map((service, i) => (
              <div key={i} className="w-[220px] shrink-0 sm:w-[260px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-footer">
                  <video
                    src={service.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center font-display text-base font-extrabold uppercase tracking-wide text-text">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-footer px-8 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent"
          >
            Tell us about your project
          </Link>
        </div>
      </section>

      {/* Content partners — black */}
      <section className="bg-footer py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              Ongoing work
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.05] text-white sm:text-5xl">
              We can become your <span className="text-accent">regular content partners</span>
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Businesses now need more video content than ever, from
              short-form social cuts to full brand films. That&apos;s why we
              offer flexible ongoing packages that keep quality video flowing
              on your terms, without you having to start a new project from
              scratch every time.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
            >
              Learn more
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <video
              src="/videos/bts/crew-warehouse.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clients — animated logo marquee — white */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Trusted by" title="Brands we've worked with" align="center" />
        </div>
        <div className="mt-12">
          <LogoMarquee clients={allClients} />
        </div>
      </section>

      {/* Meet the directors — black */}
      <section className="bg-footer py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="The team" title="Meet the directors" tone="light" align="center" />
          {team.length > 0 ? (
            <div className="mt-12 flex flex-wrap justify-center gap-10">
              {team.map((member) => {
                const photo = isMedia(member.photo) ? member.photo : null;
                return (
                  <div key={member.id} className="w-28 text-center">
                    <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-white/10">
                      {photo?.url ? (
                        <Image src={photo.url} alt={photo.alt || member.name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-lg text-white/50">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white">{member.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {member.role}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-white/20 p-10 text-center text-white/60">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Team profiles coming soon
              </p>
              <p className="mt-2 text-sm">Add team members in the admin to list them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA — red */}
      <section className="bg-accent py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Got a story that needs telling?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us about the project. Budget, timeline, format, and
            we&apos;ll get back to you within two working days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-white/90"
          >
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
