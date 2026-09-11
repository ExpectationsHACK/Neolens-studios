import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getAllClients } from "@/lib/data";
import { isMedia } from "@/types";
import { CARD_COLORS } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Clients",
  description: "Brands and organizations Neo Lens Studios has produced video for.",
};

export default async function ClientsPage() {
  const clients = await getAllClients();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="Clients" title="Who we've worked with" />

      {clients.length > 0 ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {clients.map((client, i) => {
            const logo = isMedia(client.logo) ? client.logo : null;
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <div
                key={client.id}
                className="rounded-2xl bg-surface p-8 shadow-sm"
                style={{ borderTop: `4px solid ${color}` }}
              >
                <div className="flex h-12 items-center">
                  {logo?.url ? (
                    <Image
                      src={logo.url}
                      alt={client.name}
                      width={140}
                      height={48}
                      className="max-h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-display text-lg text-text">{client.name}</span>
                  )}
                </div>
                {isMedia(client.testimonialVideo) && client.testimonialVideo.url ? (
                  <VideoPlayer
                    src={client.testimonialVideo.url}
                    alt={`${client.name} testimonial`}
                    className="mt-6 aspect-video w-full"
                  />
                ) : (
                  client.testimonialQuote && (
                    <blockquote className="mt-6 text-text-muted">
                      &ldquo;{client.testimonialQuote}&rdquo;
                    </blockquote>
                  )
                )}
                {client.testimonialAuthor && (
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-accent">
                    {client.testimonialAuthor}
                    {client.testimonialRole ? ` · ${client.testimonialRole}` : ""}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-14 border border-dashed border-border p-10 text-center text-text-muted">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            No clients added yet
          </p>
          <p className="mt-2 text-sm">Add clients in the admin to list them here.</p>
        </div>
      )}

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-block rounded-full border border-accent/50 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-base"
        >
          Become a client
        </Link>
      </div>
    </div>
  );
}
