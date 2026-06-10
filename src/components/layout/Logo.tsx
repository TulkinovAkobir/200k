import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-500 shadow-lift transition-transform group-hover:scale-105">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "text-[20px] font-extrabold tracking-tight",
          light ? "text-white" : "text-ink"
        )}
      >
        200k
        <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
          .uz
        </span>
      </span>
    </Link>
  );
}
