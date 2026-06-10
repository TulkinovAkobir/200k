import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stars({
  rating,
  size = 14,
  showValue = false,
  className,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
            />
          );
        })}
      </span>
      {showValue && <span className="text-[13px] font-semibold text-gray-600">{rating.toFixed(1)}</span>}
    </span>
  );
}
