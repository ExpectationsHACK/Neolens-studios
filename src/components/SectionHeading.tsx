import { RevealWords } from "@/components/RevealWords";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" is for use on red/black section backgrounds. */
  tone?: "dark" | "light";
  /** Use "h1" when this is the page's main heading (Work, Clients, Contact). */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as = "h2",
}: Props) {
  const titleColor = tone === "light" ? "text-white" : "text-text";
  const descriptionColor = tone === "light" ? "text-white/70" : "text-text-muted";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p data-reveal="fade" className="font-mono text-xs font-bold uppercase tracking-widest text-accent sm:text-sm">
        {eyebrow}
      </p>
      <RevealWords
        as={as}
        text={title}
        className={`mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${titleColor}`}
      />
      {description && (
        <p data-reveal className={`mt-4 text-lg ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
