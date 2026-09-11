"use client";

import { useMemo, useState } from "react";
import { PhoneGalleryTile } from "@/components/PhoneGalleryTile";
import { PROJECT_CATEGORIES } from "@/lib/nav";
import type { Project } from "@/types";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [projects, active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full border px-4 py-2 transition-colors ${
            active === "all"
              ? "border-text bg-text text-base"
              : "border-border text-text-muted hover:text-text"
          }`}
        >
          All
        </button>
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = active === cat.value;
          return (
            <button
              type="button"
              key={cat.value}
              onClick={() => setActive(cat.value)}
              style={
                isActive
                  ? { borderColor: cat.color, backgroundColor: cat.color, color: "white" }
                  : undefined
              }
              className={`rounded-full border px-4 py-2 transition-colors ${
                isActive ? "" : "border-border text-text-muted hover:text-text"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
          {filtered.map((project, index) => (
            <PhoneGalleryTile key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-10 border border-dashed border-border p-10 text-center text-text-muted">
          <p className="text-sm">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
