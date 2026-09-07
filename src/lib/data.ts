import { getCachedPayload } from "@/lib/payload";
import type { BlogPost, Client, Project, TeamMember } from "@/types";

/**
 * The DB may not be configured yet (fresh checkout, missing DATABASE_URL),
 * so every query falls back to an empty result instead of crashing the page.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[data] query failed, using fallback:", error);
    return fallback;
  }
}

// Local API calls default to overrideAccess: true, which would bypass the
// draft-vs-published read restriction defined on Projects/BlogPosts — so
// every public-facing query below filters explicitly by `_status` itself
// rather than relying on collection-level access control.
const PUBLISHED = { _status: { equals: "published" } };

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "projects",
      where: { and: [{ featured: { equals: true } }, PUBLISHED] },
      depth: 1,
      limit,
      sort: "-createdAt",
    });
    return result.docs as unknown as Project[];
  }, []);
}

export async function getAllProjects(): Promise<Project[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "projects",
      where: PUBLISHED,
      depth: 1,
      limit: 100,
      sort: "-createdAt",
    });
    return result.docs as unknown as Project[];
  }, []);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "projects",
      where: { and: [{ slug: { equals: slug } }, PUBLISHED] },
      depth: 2,
      limit: 1,
    });
    return (result.docs[0] as unknown as Project) ?? null;
  }, null);
}

export async function getRelatedProjects(category: string, excludeSlug: string, limit = 3) {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "projects",
      where: {
        and: [{ category: { equals: category } }, { slug: { not_equals: excludeSlug } }, PUBLISHED],
      },
      depth: 1,
      limit,
    });
    return result.docs as unknown as Project[];
  }, [] as Project[]);
}

/**
 * Portal-only: every project belonging to a client company, regardless of
 * public draft/published state — a client should see their in-progress work
 * even before it's published to the public /work page. Scoping to the
 * caller's own client id happens in the portal page before this is called.
 */
export async function getClientProjects(clientId: string): Promise<Project[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "projects",
      where: { client: { equals: clientId } },
      depth: 2,
      limit: 100,
      sort: "-createdAt",
      overrideAccess: false,
      user: { id: clientId, collection: "client-accounts", client: clientId },
    });
    return result.docs as unknown as Project[];
  }, []);
}

export async function getFeaturedClients(): Promise<Client[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "clients",
      where: { featured: { equals: true } },
      depth: 1,
      limit: 12,
    });
    return result.docs as unknown as Client[];
  }, []);
}

export async function getAllClients(): Promise<Client[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({ collection: "clients", depth: 1, limit: 100 });
    return result.docs as unknown as Client[];
  }, []);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "team-members",
      depth: 1,
      limit: 50,
      sort: "order",
    });
    return result.docs as unknown as TeamMember[];
  }, []);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      where: PUBLISHED,
      depth: 1,
      limit: 50,
      sort: "-publishedDate",
    });
    return result.docs as unknown as BlogPost[];
  }, []);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safe(async () => {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: "blog-posts",
      where: { and: [{ slug: { equals: slug } }, PUBLISHED] },
      depth: 2,
      limit: 1,
    });
    return (result.docs[0] as unknown as BlogPost) ?? null;
  }, null);
}
