import { cn } from "@/lib/cn";

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-gray-100">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-full rounded-md" />
        <div className="skeleton h-4 w-2/3 rounded-md" />
        <div className="skeleton h-5 w-1/2 rounded-md" />
        <div className="flex gap-2">
          <div className="skeleton h-9 flex-1 rounded-xl" />
          <div className="skeleton h-9 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
