const CARDS = [
  {
    bg: "bg-footer",
    pattern: "waves" as const,
    heading: (
      <>
        Moving stories forward,
        <br />
        without losing the truth.
      </>
    ),
    sub: "Craft first",
  },
  {
    bg: "bg-accent",
    pattern: "rings" as const,
    heading: <>The leading independent production studio in Lagos.</>,
    sub: "Est. in Lagos",
  },
  {
    bg: "bg-base border border-border",
    pattern: "grid" as const,
    dark: true,
    heading: (
      <>
        8+ stories told.
        <br />
        One studio built to tell yours next.
      </>
    ),
    sub: "Now booking",
  },
];

function Mark({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`grid w-fit grid-cols-2 gap-1 ${light ? "opacity-90" : "opacity-80"}`}
      aria-hidden="true"
    >
      <span className={`h-2.5 w-2.5 ${light ? "bg-white" : "bg-accent"}`} />
      <span className={`h-2.5 w-2.5 ${light ? "bg-white/50" : "bg-accent/50"}`} />
      <span className={`h-2.5 w-2.5 ${light ? "bg-white/50" : "bg-accent/50"}`} />
      <span className={`h-2.5 w-2.5 ${light ? "bg-white" : "bg-accent"}`} />
    </div>
  );
}

function Pattern({ variant }: { variant: "waves" | "rings" | "grid" }) {
  if (variant === "waves") {
    return (
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 h-full w-full opacity-25"
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
        className="absolute inset-0 h-full w-full opacity-30"
        aria-hidden="true"
      >
        {[40, 80, 120, 160, 200].map((r) => (
          <circle
            key={r}
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
      {CARDS.map((card, i) => (
        <div
          key={i}
          className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl p-6 ${card.bg}`}
        >
          <Pattern variant={card.pattern} />
          <div className="relative z-10 flex items-center justify-between">
            <Mark light={!card.dark} />
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${
                card.dark ? "text-text-muted" : "text-white/70"
              }`}
            >
              {card.sub}
            </span>
          </div>
          <p
            className={`relative z-10 font-display text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-3xl ${
              card.dark ? "text-text" : "text-white"
            }`}
          >
            {card.heading}
          </p>
          <p
            className={`relative z-10 font-mono text-xs font-bold uppercase tracking-widest ${
              card.dark ? "text-accent" : "text-white"
            }`}
          >
            Neo Lens Studios
          </p>
        </div>
      ))}
    </div>
  );
}
