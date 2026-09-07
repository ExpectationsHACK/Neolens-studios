import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-text"
      aria-label="Neo Lens Studios — home"
    >
      <span
        aria-hidden
        className="relative flex h-6 w-6 items-center justify-center rounded-full border border-accent/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
      </span>
      <span>
        NEO <span className="text-accent">LENS</span>
      </span>
    </Link>
  );
}
