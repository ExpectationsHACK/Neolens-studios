import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data";
import { isMedia } from "@/types";
import { PROJECT_CATEGORIES } from "@/lib/nav";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = project.seo?.metaTitle || project.title;
  const description = project.seo?.metaDescription || project.summary;
  return { title, description, openGraph: { title, description } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project.category, project.slug);
  const cover = isMedia(project.coverImage) ? project.coverImage : null;
  const video = isMedia(project.videoFile) ? project.videoFile : null;
  const client = typeof project.client === "object" && project.client ? project.client : null;
  const categoryLabel =
    PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label ?? project.category;

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-widest text-accent hover:text-accent-hover"
          >
            {"← All work"}
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">
            {categoryLabel}
            {project.year ? ` · ${project.year}` : ""}
            {client ? ` · ${client.name}` : ""}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-text-muted">{project.summary}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <VideoPlayer
          src={video?.url}
          poster={cover?.url}
          alt={project.title}
          className="aspect-video w-full"
        />
      </div>

      {project.outcomes && project.outcomes.length > 0 && (
        <div className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Outcome</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {project.outcomes.map((outcome, i) => (
                <div key={i} className="border border-border bg-surface p-6 text-center">
                  <p className="font-display text-4xl font-semibold text-accent">
                    {outcome.value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {project.credits && project.credits.length > 0 && (
        <div className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Credits</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.credits.map((credit, i) => (
                <div key={i} className="border-b border-border pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    {credit.role}
                  </dt>
                  <dd className="mt-1 text-text">{credit.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Stills</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((item, i) => {
                const image = isMedia(item.image) ? item.image : null;
                if (!image?.url) return null;
                return (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={image.url}
                      alt={image.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              More {categoryLabel}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border bg-surface py-16 text-center">
        <p className="font-display text-2xl font-medium text-text">
          Want something like this?
        </p>
        <Link
          href={`/contact?project=${encodeURIComponent(project.title)}`}
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-base hover:bg-accent-hover"
        >
          Start a similar project
        </Link>
      </div>
    </article>
  );
}
