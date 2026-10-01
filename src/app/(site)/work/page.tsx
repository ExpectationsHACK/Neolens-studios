import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkGrid } from "@/components/WorkGrid";
import { getAllProjects } from "@/lib/data";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Documentaries, commercials, corporate films, live production and brand content by Neo Lens Studios, Lagos.",
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        as="h1"
        eyebrow="Portfolio"
        title="Our work"
        description="Filter by category, or click into any project for credits, stills and the full film."
      />
      <div className="mt-12">
        <WorkGrid projects={projects} />
      </div>
      <ScrollReveal />
    </div>
  );
}
