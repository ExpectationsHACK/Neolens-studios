import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { isMedia } from "@/types";
import { PROJECT_CATEGORIES } from "@/lib/nav";

function categoryLabel(value: string) {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const coverImage = isMedia(project.coverImage) ? project.coverImage : null;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden border border-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-base">
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
        <span className="absolute left-3 top-3 rounded-full bg-base/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-4">
        <div>
          <h3 className="font-display text-lg font-medium text-text">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {categoryLabel(project.category)}
            {project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
