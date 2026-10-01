import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neolensstudios.com";

// Rebuild hourly so newly published projects get listed.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/services",
    "/clients",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
