export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const PROJECT_CATEGORIES = [
  { value: "documentaries", label: "Documentaries" },
  { value: "live-production", label: "Live Production" },
  { value: "corporate-events", label: "Corporate Events" },
  { value: "brand-content", label: "Brand Content" },
  { value: "commercials", label: "Commercials" },
  { value: "video-podcast", label: "Video Podcast" },
] as const;

export const SITE_NAME = "Neo Lens Studios";
export const SITE_DESCRIPTION =
  "Neo Lens Studios is a Lagos-based film and video production company crafting documentaries, commercials, corporate films, live production and brand content for local and international clients.";
export const CONTACT_EMAIL = "hello@neolensstudios.com";
export const CONTACT_PHONE = "+234 814 010 4523";
export const WHATSAPP_NUMBER = CONTACT_PHONE.replace(/[^0-9]/g, "");
export const STUDIO_ADDRESS = "2b Kayode Falowo St, Diamond Estate, Lagos";
