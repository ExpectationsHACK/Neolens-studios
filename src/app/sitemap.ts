import type { MetadataRoute } from "next";
import { getAllProjects, getBlogPosts } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neolensstudios.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getAllProjects(), getBlogPosts()]);

  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/services",
    "/clients",
    "/journal",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${siteUrl}/journal/${p.slug}`,
    lastModified: p.publishedDate ? new Date(p.publishedDate) : new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
