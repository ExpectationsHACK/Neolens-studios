// Text colours per card background. The gold card uses black text: white on
// the accent gold is only ~2:1 contrast.
const TONES = {
  night: { mark: "light", sub: "text-white/70", heading: "text-white", footer: "text-white" },
  gold: { mark: "ink", sub: "text-black/60", heading: "text-black", footer: "text-black" },
  outline: { mark: "accent", sub: "text-text-muted", heading: "text-text", footer: "text-accent" },
} as const;

const CARDS = [
  {
    bg: "bg-footer",
    tone: "night" as const,
    pattern: "waves" as const,
    heading: "Script, crew, shoot and edit. One team.",
    sub: "End to end",
  },
  {
    bg: "bg-accent",
    tone: "gold" as const,
    pattern: "rings" as const,
    heading: "An independent film studio based in Lagos.",
    sub: "On location & in studio",
  },
  {
    bg: "bg-base border border-border",
    tone: "outline" as const,
    pattern: "grid" as const,
    heading: "Now booking. We reply within two working days.",
    sub: "Availability",
  },
];

const MARK_COLORS = {
  light: ["bg-white", "bg-white/50"],
  ink: ["bg-black", "bg-black/40"],
  accent: ["bg-accent", "bg-accent/50"],
} as const;

function Mark({ color }: { color: keyof typeof MARK_COLORS }) {
  const [solid, faded] = MARK_COLORS[color];
  return (
    <div className="grid w-fit grid-cols-2 gap-1 opacity-90" aria-hidden="true">
      <span className={`h-2.5 w-2.5 ${solid}`} />
      <span className={`h-2.5 w-2.5 ${faded}`} />
      <span className={`h-2.5 w-2.5 ${faded}`} />
      <span className={`h-2.5 w-2.5 ${solid}`} />
    </div>
  );
}

function Pattern({ variant }: { variant: "waves" | "rings" | "grid" }) {
  if (variant === "waves") {
    return (
      <svg
        viewBox="0 0 300 400"
        className="pattern-drift absolute inset-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-20 260 C 60 200, 100 320, 180 260 S 320 200, 340 260"
          fill="none"
          stroke="white"
          strokeWidth="26"
        />
        <path
          d="M-20 320 C 60 260, 100 380, 180 320 S 320 260, 340 320"
          fill="none"
          stroke="white"
          strokeWidth="14"
          opacity="0.6"
        />
      </svg>
    );
  }
  if (variant === "rings") {
    return (
      <svg
        viewBox="0 0 300 400"
        className="pattern-ripple absolute inset-0 h-full w-full opacity-30"
        aria-hidden="true"
      >
        {[40, 80, 120, 160, 200].map((r, i) => (
          <circle
            key={r}
            style={{ "--i": i } as React.CSSProperties}
            cx="250"
            cy="60"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="var(--color-accent)" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="300" height="400" fill="url(#dotgrid)" />
    </svg>
  );
}

export function BrandStatementCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CARDS.map((card, i) => {
        const tone = TONES[card.tone];
        return (
          <div
            key={i}
            data-reveal
            data-glow
            className={`relative flex aspect-[5/4] transition-transform duration-500 ease-out hover:-translate-y-1.5 flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-4 md:p-5 lg:p-6 ${card.bg}`}
          >
            <Pattern variant={card.pattern} />
            <div className="relative z-10 flex items-center justify-between gap-3">
              <Mark color={tone.mark} />
              <span className={`text-right font-mono text-[10px] uppercase tracking-widest ${tone.sub}`}>
                {card.sub}
              </span>
            </div>
            <p
              className={`relative z-10 font-display text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-[1rem] md:text-xl lg:text-2xl xl:text-3xl ${tone.heading}`}
            >
              {card.heading}
            </p>
            <p className={`relative z-10 font-mono text-xs font-bold uppercase tracking-widest ${tone.footer}`}>
              Neo Lens Studios
            </p>
          </div>
        );
      })}
    </div>
  );
}
