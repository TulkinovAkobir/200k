import { cn } from "@/lib/cn";
import type { Badge } from "@/lib/types";

const styles: Record<string, string> = {
  Yangi: "bg-brand-600 text-white",
  Top: "bg-ink text-white",
  Chegirma: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
  Hot: "bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white",
  "Ko‘p sotilgan": "bg-emerald-500 text-white",
  "Bugun trendda": "bg-gradient-to-r from-violet-600 to-brand-600 text-white",
};

export function ProductBadge({ label }: { label: Badge | string }) {
  return (
    <span className={cn("badge shadow-sm", styles[label] ?? "bg-gray-900 text-white")}>
      {label}
    </span>
  );
}

export function DiscountBadge({ percent }: { percent: number }) {
  return (
    <span className="badge bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm">
      -{percent}%
    </span>
  );
}
