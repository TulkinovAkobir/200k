import { cn } from "@/lib/cn";

/**
 * Lightweight, network-free product visual. Renders a premium gradient
 * surface with a soft pattern and the product emoji — keeps the UI looking
 * rich without external image assets, and is trivially swappable for a real
 * <Image /> later.
 */
export function ProductImage({
  emoji,
  gradient,
  className,
  emojiClassName,
}: {
  emoji: string;
  gradient: string;
  className?: string;
  emojiClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      {/* soft light blobs */}
      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-xl" />
      <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-black/10 blur-xl" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <span className={cn("relative drop-shadow-sm", emojiClassName ?? "text-6xl")}>{emoji}</span>
    </div>
  );
}
