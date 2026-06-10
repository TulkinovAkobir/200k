"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPercent, formatPrice } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useStore } from "@/store/StoreProvider";
import { ProductImage } from "./ProductImage";
import { ProductBadge, DiscountBadge } from "./ProductBadge";
import { Stars } from "./Stars";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const { addToCart, toggleWishlist, isWished, openQuickOrder } = useStore();
  const disc = discountPercent(product);
  const wished = isWished(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Image area */}
      <Link href={`/product/${product.slug}`} className="relative block">
        <ProductImage
          emoji={product.emoji}
          gradient={product.gradient}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* top-left badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {rank && (
            <span className="badge bg-white/95 text-ink shadow-sm">#{rank}</span>
          )}
          {disc > 0 && <DiscountBadge percent={disc} />}
          {product.badges.slice(0, 1).map((b) => (
            <ProductBadge key={b} label={b} />
          ))}
        </div>

        {/* stock */}
        {product.inStock && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Omborda mavjud
          </span>
        )}
      </Link>

      {/* wishlist */}
      <button
        aria-label="Saqlanganlarga qo‘shish"
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105",
          wished ? "text-red-500" : "text-gray-400 hover:text-red-500"
        )}
      >
        <Heart size={18} className={wished ? "fill-red-500" : ""} />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[40px] text-[14px] font-semibold leading-snug text-ink hover:text-brand-600"
        >
          {product.title}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-[12px] text-gray-400">
            • {product.ordersCount.toLocaleString("ru-RU")} buyurtma
          </span>
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-[19px] font-extrabold tracking-tight text-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="mb-0.5 text-[13px] font-medium text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3.5 flex items-center gap-2">
          <button onClick={() => openQuickOrder(product)} className="btn-accent btn-sm flex-1">
            <Zap size={15} />
            Tez buyurtma
          </button>
          <button
            aria-label="Savatchaga qo‘shish"
            onClick={() => addToCart(product)}
            className="grid h-9 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition hover:bg-brand-600 hover:text-white"
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
