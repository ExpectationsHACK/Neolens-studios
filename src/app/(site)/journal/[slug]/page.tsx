import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug } from "@/lib/data";
import { isMedia } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  return { title, description, openGraph: { title, description } };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const cover = isMedia(post.coverImage) ? post.coverImage : null;
  const author = typeof post.author === "object" && post.author ? post.author : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/journal"
        className="font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
      >
        {"← Journal"}
      </Link>

      <header className="mt-6">
        {post.publishedDate && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {new Date(post.publishedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {author ? ` · ${author.name}` : ""}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-text-muted">{post.excerpt}</p>
      </header>

      {cover?.url && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-surface">
          <Image src={cover.url} alt={cover.alt || post.title} fill className="object-cover" />
        </div>
      )}

      <div className="mt-10 border-t border-border pt-10 text-text-muted">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Full article coming soon
        </p>
        <p className="mt-2 text-sm">
          The rich-text body for this post will render here once editorial
          content is published in the admin.
        </p>
      </div>
    </article>
  );
}
