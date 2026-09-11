import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { isMedia } from "@/types";
import { PROJECT_CATEGORIES, categoryColor } from "@/lib/nav";

function categoryLabel(value: string) {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function ProjectCard({ project }: { project: Project }) {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;
  const color = categoryColor(project.category);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-base shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              No cover yet
            </span>
          </div>
        )}
      </div>
      <div className="p-4" style={{ borderTop: `3px solid ${color}` }}>
        <h3 className="font-display text-lg font-medium text-text">{project.title}</h3>
        <p className="mt-1 flex items-center gap-2 text-xs text-text-muted">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {categoryLabel(project.category)}
          {project.year ? ` · ${project.year}` : ""}
        </p>
      </div>
    </Link>
  );
}
