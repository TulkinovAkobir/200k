import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-[13px] text-gray-400">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {it.href ? (
            <Link href={it.href} className="hover:text-brand-600">
              {it.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-600">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={14} className="text-gray-300" />}
        </span>
      ))}
    </nav>
  );
}
