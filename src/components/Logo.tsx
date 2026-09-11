import Link from "next/link";

type Props = {
  className?: string;
  /** "light" is for use on red/black backgrounds, where a red "LENS" would disappear. */
  variant?: "default" | "light";
};

export function Logo({ className = "text-text", variant = "default" }: Props) {
  return (
    <Link
      href="/"
      className={`font-display text-lg font-semibold tracking-tight ${className}`}
      aria-label="Neo Lens Studios, home"
    >
      NEO <span className={variant === "light" ? "text-white/90" : "text-accent"}>LENS</span>
    </Link>
  );
}
