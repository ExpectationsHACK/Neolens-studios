# Neo Lens Studios — Discovery & Architecture Brief

_Phase 1 output. This is the reference document every design and code decision downstream should trace back to._

## 1. Who this is for, and the one job the site must do

**Business**: Neo Lens Studios (rebrand of FilmbyDT) — a Lagos, Nigeria–based video production company. Corporate videos, documentaries, commercials, live production, brand content, video podcasts.

**Primary conversion**: A qualified project inquiry through the contact form — someone who tells us their project type, budget range, and timeline, not just "hello@..." in a mail client. Every page on the site should either move a visitor toward that form or toward the portfolio content that builds enough trust to get them there.

**Secondary goal**: Organic search visibility (near-zero today — no meta descriptions, no robots.txt, no sitemap, no indexable project pages) so the studio is findable beyond word-of-mouth and Instagram.

## 2. Sitemap & Information Architecture

| Route | Job | Primary CTA | If visitor does nothing |
|---|---|---|---|
| `/` (Home) | Prove quality fast, route to the right next step | "See our work" / "Start a project" | Sees enough (reel + featured work + client logos) to remember the name |
| `/work` | Let visitors filter by category and browse credibly | Click into a case study | Scrolls featured work, still exposed to client logos |
| `/work/[slug]` | Sell one project as proof — credits, process, outcome | "Start a similar project" | Related work links keep them browsing instead of bouncing |
| `/about` | Build trust in the team behind the work | "Meet the team" → contact | Client logos + team bios still land as social proof |
| `/services` | Clarify what's offered and for whom, filter out bad-fit leads before the form | "Get a quote" per service | Falls back to general contact CTA |
| `/clients` | Testimonials + logos, each optionally linking to its case study | Click through to related `/work/[slug]` | Still reinforces credibility passively |
| `/journal` (blog) | SEO surface area + behind-the-scenes content that keeps the site fresh for Google | Read → internal links to `/work` and `/contact` | Content still gets indexed even if unread today |
| `/journal/[slug]` | Individual article | CTA block at the end → contact | — |
| `/contact` | Capture a qualified lead (name, email, project type, budget band, timeline, optional file/brief upload) | Submit inquiry | Phone/email/WhatsApp still visible as fallback |
| `/careers` (optional, phase-in later) | Attract crew/freelancers | Apply / send reel | Passive, low priority |
| `/admin/*` | Internal only — everything below | — | — |

**Primary flow**: Home → Work (filtered by category) → case study → Contact (pre-filled with "similar to [project]" context).
**Secondary flow**: Journal article (found via search) → internal link to a relevant case study → Contact.
**Admin flow**: Editor logs in → adds a new project (uploads video + stills, writes credits/copy, picks category, links client) → publishes → it appears on `/work` and its own `/work/[slug]` immediately, no redeploy.

## 3. Data & System Architecture

**Framework**: Next.js 16 (App Router), TypeScript strict, deployed on Vercel.

**CMS/Admin**: **Payload CMS**, self-hosted inside the same Next.js app (runs at `/admin`), Postgres-backed. Chosen over Sanity because it gives us one unified admin for everything the brief calls for — content collections AND the leads dashboard AND role-based users — instead of a CMS studio plus a separately-built dashboard. Free and self-hosted; only cost is DB + hosting.

**Collections (Payload)**:
- `Projects` — title, slug, category (enum: Documentary/Commercial/Corporate/Live/Brand/Podcast), client (relation), year, credits, cover image, gallery, video reference(s), summary, body (rich text), featured flag, SEO fields
- `Clients` — name, logo, website, testimonial(s), related projects (auto-derived)
- `TeamMembers` — name, role, photo, bio, social links
- `BlogPosts` — title, slug, cover image, body, author (relation to TeamMembers), published date, SEO fields
- `Leads` — name, email, phone, project type, budget band, timeline, message, file upload, status (New / Contacted / Quoted / Won / Lost), internal notes, created date — this collection **is** the leads dashboard; Payload's admin UI gives filtering/sorting/status updates for free
- `Media` — Payload's built-in upload collection, backed by Cloudflare R2 (via S3-compatible storage adapter)
- `Users` — admin/editor roles

**Video pipeline**: Raw video → compressed/optimized MP4 (H.264, 1080p + a lighter mobile rendition) at upload time → stored in Cloudflare R2 (free tier: 10GB storage, zero egress fees) → served via a custom `<VideoPlayer>` component: poster image first, video loads only on play/hover-intent, native HTML5 range-request streaming. No per-minute-delivered billing, unlike Mux/Stream. If volume grows well beyond the free tier later, this swaps cleanly to Cloudflare Stream without changing the frontend contract.

**Forms**: Contact form → Next.js Server Action → writes to `Leads` collection directly (shows up in admin instantly) + sends a notification email via Resend. No third-party form service needed.

**Auth**: Payload's built-in auth for `/admin` (email/password to start; can add roles later — Admin vs Editor).

**SEO infra**: `generateMetadata` per route, per-project and per-post OG images, `sitemap.ts`, `robots.ts`, `Organization`/`LocalBusiness`/`VideoObject` JSON-LD.

## 4. Content inventory / status

- **Have**: existing project videos/stills from FilmbyDT's current portfolio (Artefact Space, Sounds of Lagos Fashion Week, Knorr campaign, etc.), existing client logos (Taeillo, Still Earth Holdings, Chipper, Casava, 9mobile), existing copy tone (warm, story-driven).
- **Pending**: new Neo Lens Studios brand name needs a logotype/visual identity (no existing logo — will design a wordmark as part of Phase 2), final decision on which existing projects carry over vs. get relabeled under the new brand, team bios/photos, finalized service-tier copy.
- **Plan**: build the full IA and CMS now with real structure; seed it with the existing project content (rebranded) so the site is never showing lorem ipsum, and swap in new material as you provide it — since it's all CMS-driven, that's a content edit, not a rebuild.

## 5. Open assumptions (flag if wrong)

- Domain: assuming a domain like `neolensstudios.com` will be secured — not yet configured, doesn't block build.
- Single primary admin user at launch, with room to add editor roles later.
- Hosting budget: Vercel (free/hobby tier sufficient to start) + Neon or Supabase Postgres (free tier) + Cloudflare R2 (free tier) = $0/month to launch.
