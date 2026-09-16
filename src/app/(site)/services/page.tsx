import type { Metadata } from "next";
import Link from "next/link";
import { ALL_SERVICES } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Commercials, Brand Content, Documentary Films, Corporate Video, Live Production, Video Podcasts, Talking Head Videos and Photography from Neo Lens Studios.",
};

export default function ServicesPage() {
  return (
    <div className="bg-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
            WHAT WE DO
          </p>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Our Services & Capabilities<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 font-body text-base text-text-muted">
            Eight formats, one process: understand the goal, then build the format around it. From concept development to post-production and delivery.
          </p>
        </div>

        {/* List of 8 Services */}
        <div className="grid gap-8 sm:grid-cols-2">
          {ALL_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 transition-all duration-300 hover:border-accent/60 hover:bg-surface-raised shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black mb-6">
                  <video
                    src={service.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-md bg-black/70 backdrop-blur-md px-3 py-1 font-heading text-xs font-bold text-accent border border-white/10">
                    {service.number}
                  </span>
                </div>

                <h2 className="font-heading text-2xl font-bold text-white group-hover:text-accent transition-colors">
                  {service.number} — {service.title}
                </h2>

                <p className="mt-3 font-body text-sm text-text-muted leading-relaxed">
                  {service.description}
                </p>

                {(service.perfectFor || service.deliverables) && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                      {service.perfectFor ? "Perfect for" : "Deliverables include"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(service.perfectFor || service.deliverables)?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-body text-xs text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/contact?project=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-white group-hover:text-accent transition-colors"
                >
                  Request Quote
                  <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-surface-raised p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
            Not sure which format fits your goals?
          </h2>
          <p className="mt-3 font-body text-base text-text-muted max-w-xl mx-auto">
            Tell us your idea and budget, and our creative team will recommend the right format and production strategy.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-black hover:bg-accent-hover transition-all"
            >
              Start a Project
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
