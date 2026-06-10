import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = "Barchasini ko‘rish",
  icon,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-2 section-title">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-600 shadow-card ring-1 ring-gray-100 transition hover:ring-brand-300 sm:flex"
        >
          {hrefLabel}
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
