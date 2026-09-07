const BLADE_COUNT = 8;
const BLADE_POINTS = "100,100 128,18 156,42";

export function ApertureMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`animate-aperture ${className}`}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-border)" strokeWidth="1" />
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <polygon
          key={i}
          points={BLADE_POINTS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.25"
          strokeLinejoin="round"
          opacity={0.85}
          transform={`rotate(${(360 / BLADE_COUNT) * i} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="18" fill="var(--color-accent)" opacity="0.9" />
    </svg>
  );
}
