type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" is for use on red/black section backgrounds. */
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: Props) {
  const titleColor = tone === "light" ? "text-white" : "text-text";
  const descriptionColor = tone === "light" ? "text-white/70" : "text-text-muted";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent sm:text-sm">
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`mt-4 text-lg ${descriptionColor}`}>{description}</p>}
    </div>
  );
}
