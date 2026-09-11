import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { categoryColor } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Documentaries, commercials, corporate video, live production, brand content and video podcasts from Neo Lens Studios.",
};

const SERVICES = [
  {
    slug: "documentaries",
    title: "Documentaries",
    description:
      "Long-form, character-driven stories built on real research and access. Development, production and edit handled end to end.",
    goodFor: "Founder stories, social-impact features, institutional histories.",
  },
  {
    slug: "commercials",
    title: "Commercials",
    description:
      "Brand and product films shot for broadcast, cinema and paid social, storyboarded to cut clean across formats.",
    goodFor: "Product launches, brand campaigns, retail and FMCG spots.",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    description:
      "Multi-camera coverage of conferences, product launches and internal events, with same-week turnaround on highlight reels.",
    goodFor: "Conferences, AGMs, product launches, internal comms.",
  },
  {
    slug: "live-production",
    title: "Live Production",
    description:
      "Full live-production crews, switching and gear for concerts, ceremonies and broadcast-quality live streams.",
    goodFor: "Concerts, award shows, live broadcasts, hybrid events.",
  },
  {
    slug: "brand-content",
    title: "Brand Content",
    description:
      "Ongoing content series built for a brand's own channels. Social-first, consistent in voice, produced on a repeatable cadence.",
    goodFor: "Always-on social content, brand documentaries, behind the scenes series.",
  },
  {
    slug: "video-podcast",
    title: "Video Podcast",
    description:
      "Studio and on-location podcast capture, multi-camera, edited into full episodes and short-form clips for distribution.",
    goodFor: "Interview shows, panel discussions, recurring episodic content.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Services"
        title="What we do"
        description="Six formats, one process: understand the goal, then build the format around it."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const color = categoryColor(service.slug);
          return (
            <div
              key={service.slug}
              className="rounded-2xl bg-base p-8 shadow-sm"
              style={{ borderTop: `4px solid ${color}` }}
            >
              <h2 className="font-display text-xl font-medium" style={{ color }}>
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-text-muted">{service.description}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                Good for
              </p>
              <p className="mt-1 text-sm text-text-muted">{service.goodFor}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl bg-surface p-10 text-center">
        <h2 className="font-display text-2xl font-medium text-text">
          Not sure which format fits?
        </h2>
        <p className="mt-2 text-text-muted">
          Tell us the goal and we&apos;ll recommend the right one.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-base hover:bg-accent-hover"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
