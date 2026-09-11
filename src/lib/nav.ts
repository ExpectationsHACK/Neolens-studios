export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const PROJECT_CATEGORIES = [
  { value: "documentaries", label: "Documentaries", color: "var(--color-card-indigo)" },
  { value: "live-production", label: "Live Production", color: "var(--color-card-magenta)" },
  { value: "corporate-events", label: "Corporate Events", color: "var(--color-card-teal)" },
  { value: "brand-content", label: "Brand Content", color: "var(--color-card-green)" },
  { value: "commercials", label: "Commercials", color: "var(--color-card-red)" },
  { value: "video-podcast", label: "Video Podcast", color: "var(--color-card-violet)" },
] as const;

export const CARD_COLORS = [
  "var(--color-card-red)",
  "var(--color-card-teal)",
  "var(--color-card-indigo)",
  "var(--color-card-magenta)",
  "var(--color-card-green)",
  "var(--color-card-violet)",
] as const;

export function categoryColor(value: string): string {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.color ?? "var(--color-card-red)";
}

export const SITE_NAME = "Neo Lens Studios";
export const SITE_DESCRIPTION =
  "Neo Lens Studios is a Lagos-based film and video production company crafting documentaries, commercials, corporate films, live production and brand content for local and international clients.";
export const CONTACT_EMAIL = "hello@neolensstudios.com";
export const CONTACT_PHONE = "+234 814 010 4523";
export const WHATSAPP_NUMBER = CONTACT_PHONE.replace(/[^0-9]/g, "");
export const STUDIO_ADDRESS = "2b Kayode Falowo St, Diamond Estate, Lagos";
