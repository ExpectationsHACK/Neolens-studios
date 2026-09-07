import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/data";
import { PROJECT_CATEGORIES } from "@/lib/nav";

export const alt = "Neo Lens Studios project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const title = project?.title ?? "Neo Lens Studios";
  const category = project
    ? PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label ?? project.category
    : "Film & Video Production";
  const client = typeof project?.client === "object" ? project.client?.name : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0d10",
          padding: 80,
          color: "#f4f2ed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              border: "3px solid #e8a34c",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, display: "flex" }}>
            NEO <span style={{ color: "#e8a34c", marginLeft: 10 }}>LENS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 22, color: "#e8a34c", textTransform: "uppercase", letterSpacing: 2 }}>
            {category}
            {client ? ` · ${client}` : ""}
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>{title}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
