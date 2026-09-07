import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPortalUser } from "@/lib/portal";
import { getClientProjects } from "@/lib/data";
import { isMedia } from "@/types";
import { portalLogout } from "@/app/(site)/portal/actions";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  "in-production": "In Production",
  "in-review": "In Review",
  delivered: "Delivered",
};

export default async function PortalPage() {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");

  const projects = await getClientProjects(user.client);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Client Portal
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
            Welcome{user.name ? `, ${user.name}` : ""}
          </h1>
        </div>
        <form action={portalLogout}>
          <button
            type="submit"
            className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:border-accent hover:text-accent"
          >
            Sign out
          </button>
        </form>
      </div>

      {projects.length > 0 ? (
        <div className="mt-12 space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-border bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-medium text-text">{project.title}</h2>
                <span className="rounded-full border border-accent/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {STATUS_LABELS[project.productionStatus ?? "planning"]}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-muted">{project.summary}</p>

              {project.deliverables && project.deliverables.length > 0 ? (
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    Deliverables
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.deliverables.map((item, i) => {
                      const file = isMedia(item.file) ? item.file : null;
                      if (!file?.url) return null;
                      return (
                        <li key={i}>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm text-accent hover:text-accent-hover"
                          >
                            {item.label} ↓
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 border-t border-border pt-4 text-sm text-text-muted">
                  No deliverables uploaded yet.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-dashed border-border p-10 text-center text-text-muted">
          <p className="text-sm">
            No projects linked to your account yet — your producer will add
            them here once your project kicks off.
          </p>
        </div>
      )}
    </div>
  );
}
