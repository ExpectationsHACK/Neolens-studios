/**
 * Loading-state building blocks. `Skeleton` is a shimmering placeholder block;
 * size and shape it with className (h-*, w-*, rounded-*, aspect-*).
 */
export function Skeleton({ className = "" }: { className?: string }) {
  // Only default the radius when the caller didn't pick one; two rounded-*
  // classes would fight and the stylesheet order, not the caller, would win.
  const radius = /(^|\s)rounded-/.test(className) ? "" : "rounded-md";
  return <div aria-hidden="true" className={`skeleton ${radius} ${className}`} />;
}

/** A few lines of placeholder text, with the last line shorter. */
export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-3.5 ${i === lines - 1 ? "w-3/5" : "w-full"}`} />
      ))}
    </div>
  );
}

/** Eyebrow + title + intro, matching SectionHeading. */
export function SkeletonHeading({ align = "left", withText = true }: { align?: "left" | "center"; withText?: boolean }) {
  const center = align === "center";
  return (
    <div aria-hidden="true" className={center ? "mx-auto flex max-w-2xl flex-col items-center" : "max-w-2xl"}>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-10 w-4/5 sm:h-12" />
      {withText && (
        <div className={`mt-5 w-full space-y-2.5 ${center ? "flex flex-col items-center" : ""}`}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
    </div>
  );
}

/** Wraps a page skeleton so screen readers hear one "Loading" announcement. */
export function SkeletonPage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">Loading…</span>
      {children}
    </div>
  );
}
