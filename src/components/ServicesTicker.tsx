const WORDS = [
  "Commercials",
  "Brand content",
  "Documentaries",
  "Corporate events",
  "Live production",
  "Video podcasts",
  "Photography",
];

/** A big, slow-scrolling band of service names. Decorative, so hidden from screen readers. */
export function ServicesTicker() {
  return (
    <div aria-hidden="true" className="ticker overflow-hidden border-b border-border bg-base py-8 sm:py-10">
      <div className="animate-marquee-ticker flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {WORDS.map((word, i) => (
              <span key={word} className="flex items-center">
                <span
                  className={`px-6 font-heading text-5xl font-extrabold uppercase tracking-tight sm:px-10 sm:text-7xl ${
                    i % 2 ? "text-white" : "ticker-outline"
                  }`}
                >
                  {word}
                </span>
                <span className="h-3 w-3 shrink-0 rounded-full bg-accent sm:h-4 sm:w-4" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
