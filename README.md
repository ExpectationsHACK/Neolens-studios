# Neo Lens Studios

Full rebuild of the studio's site as a real webapp: a public marketing site,
an admin panel for managing projects, clients, team, blog posts and inbound
leads, and a client portal for project status/deliverables — no more editing
hard-coded HTML to add a new project.

See [docs/DISCOVERY.md](docs/DISCOVERY.md) for the full architecture brief
(sitemap, data model, and the reasoning behind each infra choice).

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4)
- **Payload CMS 3** — self-hosted at `/admin`, Postgres-backed. One admin
  covers projects, clients, team, blog posts, media, and leads.
- **Cloudflare R2** for media/video storage (free tier, zero egress fees)
- **Resend** for email notifications and prospect confirmations
- **Cloudflare Turnstile** for contact-form spam protection (free)
- **Sentry** for error monitoring (free tier)
- **Google Analytics 4** for traffic analytics (free)

## First-time setup

1. **Install dependencies** (already done if you're reading this from the
   scaffolded repo):

   ```bash
   npm install
   ```

2. **Copy the env template** and fill in real values:

   ```bash
   cp .env.example .env.local
   ```

   Required to actually run the app:
   - `PAYLOAD_SECRET` — any long random string.
   - `DATABASE_URL` — a Postgres connection string. Free options:
     [Neon](https://neon.tech) or [Supabase](https://supabase.com).
   - `R2_*` — create a bucket at Cloudflare dash → R2, generate an API
     token, and enable public access (or map a custom domain) for
     `R2_PUBLIC_URL`.

   Optional, each gracefully disabled if left blank:
   - `RESEND_API_KEY` / `CONTACT_NOTIFICATION_EMAIL` — without these,
     leads still save to the admin, they just won't trigger emails.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — contact-form
     CAPTCHA. Without these, the form still has honeypot + rate-limit
     protection, just not Turnstile.
   - `NEXT_PUBLIC_GA_ID` — Google Analytics. No analytics script loads
     without it.
   - `NEXT_PUBLIC_CAL_LINK` — shows a "Book a call instead" link on
     `/contact` pointing at your Cal.com scheduling page.
   - `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_ORG` / `SENTRY_PROJECT` — error
     monitoring. No Sentry code runs without a DSN.

3. **Run the dev server**:

   ```bash
   npm run dev
   ```

   Without `DATABASE_URL` configured, the public pages still render (with
   "no content yet" empty states) but `/admin`, `/portal`, and the contact
   form will show a clean error — that's expected until step 4.

4. **Seed starting content** (real content carried over from the studio's
   existing portfolio, rebranded — not placeholder text):

   ```bash
   npm run seed
   ```

   This creates:
   - one admin user (`admin@neolensstudios.com` / `change-me-now-123!` by
     default — override with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`,
     and change the password after first login)
   - five known past clients and two known past projects (published, so
     they show up on `/work` immediately)
   - one demo client-portal login (`demo@taeillo.com` / `change-me-too-123!`
     by default — override with `SEED_CLIENT_EMAIL` / `SEED_CLIENT_PASSWORD`)
     so `/portal` can be tested right away

   It's intentionally conservative: it does **not** invent project details,
   team members, or client testimonials it can't verify — add those for
   real through `/admin` once assets are ready.

5. Log into `/admin` and add: cover images/video for the two seeded
   projects, remaining past projects, team member profiles, and client
   logos.

## What's built vs. what's still a placeholder

- **Built and wired end-to-end**: home, work (filterable grid + case study
  pages with outcome stat chips), about, services, clients (incl. video
  testimonials), journal (list + detail), contact form with honeypot +
  Turnstile + IP rate-limiting → saves to the `Leads` collection + prospect
  confirmation email + internal notification, a client portal (`/portal`)
  scoped per client company with production-status tracking and gated
  deliverable downloads, role-based access control (admin vs. editor,
  enforced in every collection's access config, not just the `role` field
  existing), draft/publish workflow on Projects and Blog Posts, a floating
  WhatsApp CTA, GA4, Sentry, dynamic per-project OG images, sitemap.xml,
  robots.txt, Organization JSON-LD, per-page metadata.
- **Needs real content before launch**: team member photos/bios (none
  existed on the old site to carry over), most project cover images and
  video files, additional past projects beyond the two seeded ones, a
  proper logo/social handles for the new Neo Lens Studios brand (the
  footer still links to the old FilmbyDT Instagram/Twitter as a
  placeholder).
- **Deliberately deferred**: full rich-text rendering for blog post/project
  body content (the schema supports it; the frontend currently renders
  summary/excerpt only — wire up `@payloadcms/richtext-lexical/react`'s
  `RichText` component when editorial content is ready), a `/careers`
  page, a full in-app draft-preview iframe (drafts are supported and
  hidden from the public API, but there's no signed preview-mode link yet
  for staff to view one before publishing).

## Security notes

- The contact form (`Leads.create`) is intentionally public — that's how
  the form works — but is protected by three independent layers: a
  honeypot field, Cloudflare Turnstile (once configured), and a per-IP
  rate limit (5 submissions/hour). See `src/app/(site)/contact/actions.ts`.
- `Projects.deliverables` has field-level access control so a client's
  download links never appear in the public API response for `/work`,
  even though the rest of the project document is public once published.
  See `src/access/roles.ts`.
- Client-portal logins (`client-accounts` collection) are entirely
  separate from the public-facing `clients` collection (company name/logo/
  testimonial) specifically so a portal password hash can never be
  exposed through the public API that powers `/clients`.
- Payload's staff (`users`) and client-portal (`client-accounts`) sessions
  share one cookie name by design of the framework — logging into both in
  the *same browser* will make the second login replace the first. Use a
  different browser (or incognito) to test the portal while staying
  logged into `/admin`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / run |
| `npm run lint` | ESLint |
| `npm run generate:types` | Regenerate `src/payload-types.ts` from the live schema (needs `DATABASE_URL`) — once run, prefer those generated types over the hand-written ones in `src/types.ts` |
| `npm run seed` | Seed starting content (see above) |

## Deploying

Vercel is the natural fit for the Next.js app. Cloudflare R2 and a hosted
Postgres (Neon/Supabase) both work fine from Vercel's network. Set the same
env vars from `.env.example` in the Vercel project settings.

Both Neon and Supabase run automated backups on their free tiers (Neon:
point-in-time restore within the retention window; Supabase: daily backups
with a 7-day retention on the free plan) — no extra setup needed, but worth
confirming retention length is enough as this becomes the system of record
for real client leads and deliverables.
