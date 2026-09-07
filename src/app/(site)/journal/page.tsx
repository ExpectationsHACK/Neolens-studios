import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { getBlogPosts } from "@/lib/data";
import { isMedia } from "@/types";

export const metadata: Metadata = {
  title: "Journal",
  description: "Behind-the-scenes notes and updates from Neo Lens Studios.",
};

export default async function JournalPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Journal"
        title="Notes from the field"
        description="Behind-the-scenes writeups, client spotlights and production notes."
      />

      {posts.length > 0 ? (
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const cover = isMedia(post.coverImage) ? post.coverImage : null;
            return (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group block border border-border bg-surface transition-colors hover:border-accent/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-base">
                  {cover?.url ? (
                    <Image
                      src={cover.url}
                      alt={cover.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-text-muted">
                      No cover yet
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {post.publishedDate && (
                    <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {new Date(post.publishedDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-lg font-medium text-text">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{post.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-14 border border-dashed border-border p-10 text-center text-text-muted">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            No posts published yet
          </p>
          <p className="mt-2 text-sm">Publish a post in the admin to see it here.</p>
        </div>
      )}
    </div>
  );
}
