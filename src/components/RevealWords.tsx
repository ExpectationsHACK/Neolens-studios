type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Appended to the last word so it rises with it, e.g. the gold full stop. */
  suffix?: React.ReactNode;
  /** Colour the last N words with the accent. */
  accentLast?: number;
};

/**
 * A heading whose words rise into place one after another when ScrollReveal
 * reaches it. Server component; the motion is pure CSS (globals.css).
 */
export function RevealWords({ text, as: Tag = "h2", className = "", suffix, accentLast = 0 }: Props) {
  const words = text.split(" ");
  const accentFrom = words.length - accentLast;
  return (
    <Tag data-reveal="words" className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="reveal-word-mask">
            <span
              className={`reveal-word ${i >= accentFrom ? "text-accent" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              {word}
              {i === words.length - 1 ? suffix : null}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
