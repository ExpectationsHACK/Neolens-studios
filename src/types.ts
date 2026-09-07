/**
 * Hand-written mirrors of the Payload collections for use before a live
 * database is connected. Once DATABASE_URL is set, run `npm run generate:types`
 * and switch these imports to the generated `src/payload-types.ts` instead.
 */

export type Media = {
  id: string;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

export type Client = {
  id: string;
  name: string;
  logo?: Media | string | null;
  website?: string | null;
  testimonialQuote?: string | null;
  testimonialAuthor?: string | null;
  testimonialRole?: string | null;
  testimonialVideo?: Media | string | null;
  featured?: boolean;
};

export type ProjectCategory =
  | "documentaries"
  | "live-production"
  | "corporate-events"
  | "brand-content"
  | "commercials"
  | "video-podcast";

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  client?: Client | string | null;
  year?: number | null;
  summary: string;
  coverImage?: Media | string | null;
  gallery?: { image: Media | string }[];
  videoFile?: Media | string | null;
  credits?: { role?: string; name?: string }[];
  outcomes?: { value: string; label: string }[];
  featured?: boolean;
  productionStatus?: "planning" | "in-production" | "in-review" | "delivered";
  deliverables?: { label: string; file: Media | string }[];
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: Media | string };
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: Media | string | null;
  bio?: string | null;
  order?: number;
  socialLinks?: { platform?: string; url?: string }[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  coverImage?: Media | string | null;
  excerpt: string;
  author?: TeamMember | string | null;
  publishedDate?: string | null;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: Media | string };
};

export function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

export function mediaUrl(value: Media | string | null | undefined): string | undefined {
  if (!value) return undefined;
  if (isMedia(value)) return value.url ?? undefined;
  return undefined;
}
