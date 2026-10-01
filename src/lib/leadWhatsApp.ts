import { WHATSAPP_URL } from "@/lib/nav";

export type Option = { value: string; label: string };

export const PROJECT_TYPES: Option[] = [
  { value: "documentary", label: "Documentary" },
  { value: "commercial", label: "Commercial" },
  { value: "corporate", label: "Corporate Video" },
  { value: "live-production", label: "Live Production" },
  { value: "brand-content", label: "Brand Content" },
  { value: "video-podcast", label: "Video Podcast" },
  { value: "other", label: "Other" },
];

export const BUDGET_BANDS: Option[] = [
  { value: "under-1m", label: "Under ₦1,000,000" },
  { value: "1m-5m", label: "₦1,000,000 – ₦5,000,000" },
  { value: "5m-15m", label: "₦5,000,000 – ₦15,000,000" },
  { value: "above-15m", label: "Above ₦15,000,000" },
  { value: "not-sure", label: "Not sure yet" },
];

export const TIMELINES: Option[] = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
];

function optionLabel(options: Option[], value: string) {
  return options.find((opt) => opt.value === value)?.label;
}

/**
 * Formats a "Start a project" submission as a WhatsApp chat to the studio.
 * Shared by the form (opens it on submit) and the server action (returns it,
 * so visitors whose submit beat the page's JavaScript still get the link).
 */
export function buildLeadWhatsAppUrl(data: FormData) {
  const get = (key: string) => String(data.get(key) || "").trim();

  const fields: [string, string | undefined][] = [
    ["Name", get("name")],
    ["Company / Brand", get("company")],
    ["Email", get("email")],
    ["Phone", get("phone")],
    ["Project type", optionLabel(PROJECT_TYPES, get("projectType"))],
    ["Budget", optionLabel(BUDGET_BANDS, get("budgetBand"))],
    ["Timeline", optionLabel(TIMELINES, get("timeline"))],
  ];

  const text = [
    "*New project inquiry: Neo Lens Studios website*",
    "",
    ...fields.filter(([, value]) => value).map(([label, value]) => `*${label}:* ${value}`),
    "",
    "*Project description:*",
    get("message"),
  ].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
