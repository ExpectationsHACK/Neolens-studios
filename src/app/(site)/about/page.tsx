import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { getTeamMembers } from "@/lib/data";
import { isMedia } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Neo Lens Studios is a Lagos-based film and video production team producing documentaries, commercials and brand content for local and international clients.",
};

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <SectionHeading eyebrow="About" title="Neo Lens Studios" />
          <div className="mt-8 space-y-6 text-lg text-text-muted">
            <p>
              We&apos;re a Lagos-based production team dedicated to pushing the
              boundaries of creativity and craft. Every project we take on is
              built to be unique, not templated. Storytelling comes first;
              cameras, lighting and edit all exist to capture the essence of a
              client&apos;s vision, not to show off.
            </p>
            <p>
              After collaborating with a diverse range of brands, institutions
              and individuals across Nigeria and beyond, we&apos;ve built our
              reputation on one thing: delivering high-quality visuals on time,
              without the story getting lost along the way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="The team" title="Who's behind the lens" />
          {team.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => {
                const photo = isMedia(member.photo) ? member.photo : null;
                return (
                  <div key={member.id} className="rounded-2xl bg-surface p-6 shadow-sm">
                    <div className="relative aspect-square overflow-hidden bg-base">
                      {photo?.url ? (
                        <Image
                          src={photo.url}
                          alt={photo.alt || member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-text-muted">
                          Photo pending
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-medium text-text">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {member.role}
                    </p>
                    {member.bio && <p className="mt-2 text-sm text-text-muted">{member.bio}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-border p-10 text-center text-text-muted">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Team profiles coming soon
              </p>
              <p className="mt-2 text-sm">Add team members in the admin to list them here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
