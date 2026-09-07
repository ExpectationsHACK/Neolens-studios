import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Documentaries, commercials, corporate video, live production, brand content and video podcasts from Neo Lens Studios.",
};

const SERVICES = [
  {
    tag: "01",
    slug: "documentaries",
    title: "Documentaries",
    description:
      "Long-form, character-driven stories built on real research and access — development, production and edit handled end to end.",
    goodFor: "Founder stories, social-impact features, institutional histories.",
  },
  {
    tag: "02",
    slug: "commercials",
    title: "Commercials",
    description:
      "Brand and product films shot for broadcast, cinema and paid social, storyboarded to cut clean across formats.",
    goodFor: "Product launches, brand campaigns, retail and FMCG spots.",
  },
  {
    tag: "03",
    slug: "corporate-events",
    title: "Corporate Events",
    description:
      "Multi-camera coverage of conferences, product launches and internal events, with same-week turnaround on highlight reels.",
    goodFor: "Conferences, AGMs, product launches, internal comms.",
  },
  {
    tag: "04",
    slug: "live-production",
    title: "Live Production",
    description:
      "Full live-production crews, switching and gear for concerts, ceremonies and broadcast-quality live streams.",
    goodFor: "Concerts, award shows, live broadcasts, hybrid events.",
  },
  {
    tag: "05",
    slug: "brand-content",
    title: "Brand Content",
    description:
      "Ongoing content series built for a brand's own channels — social-first, consistent in voice, produced on a repeatable cadence.",
    goodFor: "Always-on social content, brand documentaries, behind-the-scenes series.",
  },
  {
    tag: "06",
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

      <div className="mt-14 divide-y divide-border border-y border-border">
        {SERVICES.map((service) => (
          <div key={service.slug} className="grid gap-4 py-8 sm:grid-cols-[80px_1fr_1fr]">
            <span className="font-mono text-xs text-accent">{service.tag}</span>
            <div>
              <h2 className="font-display text-xl font-medium text-text">{service.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{service.description}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                Good for
              </p>
              <p className="mt-1 text-sm text-text-muted sm:ml-auto sm:max-w-xs">
                {service.goodFor}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border border-border bg-surface p-10 text-center">
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
