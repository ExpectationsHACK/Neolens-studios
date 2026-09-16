import Link from "next/link";

type Props = {
  className?: string;
  variant?: "default" | "light";
};

export function Logo({ className = "text-white", variant = "default" }: Props) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Neo Lens Studios, home"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black font-heading font-extrabold text-lg tracking-tighter shadow-md transition-transform group-hover:scale-105">
        N
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-heading text-sm font-extrabold uppercase tracking-widest text-white">
          NEO LENS<span className="text-accent">.</span>
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-muted mt-0.5">
          STUDIOS
        </span>
      </div>
    </Link>
  );
}

