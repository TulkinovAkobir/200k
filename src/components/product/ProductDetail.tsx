"use client";

import { useState } from "react";
import {
  Check,
  CreditCard,
  Heart,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPercent, formatPrice } from "@/lib/data";
import { useStore } from "@/store/StoreProvider";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductBadge, DiscountBadge } from "@/components/ui/ProductBadge";
import { Stars } from "@/components/ui/Stars";

const trust = [
  { icon: Truck, text: "3 kungacha yetkazib berish" },
  { icon: CreditCard, text: "Naqd to‘lov mavjud" },
  { icon: Phone, text: "Operator bog‘lanadi" },
  { icon: Users, text: "Mijozlar tanlovi" },
];

const tabs = ["Tavsif", "Xususiyatlar", "Yetkazib berish", "Fikrlar"] as const;
type Tab = (typeof tabs)[number];

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished, openQuickOrder } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Tavsif");
  const [activeImg, setActiveImg] = useState(0);
  const disc = discountPercent(product);
  const wished = isWished(product.id);

  // simulated gallery (same visual, varied emoji tint)
  const gallery = [product.emoji, "📦", "✨", "⭐️"];

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-gray-100">
            <ProductImage
              emoji={gallery[activeImg]}
              gradient={product.gradient}
              className="aspect-square w-full"
              emojiClassName="text-[120px]"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {disc > 0 && <DiscountBadge percent={disc} />}
              {product.badges.map((b) => (
                <ProductBadge key={b} label={b} />
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-2xl ring-2 transition",
                  activeImg === i ? "ring-brand-600" : "ring-transparent hover:ring-gray-200"
                )}
              >
                <ProductImage emoji={g} gradient={product.gradient} className="h-full w-full" emojiClassName="text-2xl" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-[30px]">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Stars rating={product.rating} showValue />
            <span className="text-[13px] text-gray-400">{product.reviewsCount} ta fikr</span>
            <span className="text-[13px] text-gray-400">
              {product.ordersCount.toLocaleString("ru-RU")} buyurtma
            </span>
            {product.inStock && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-600">
                <Check size={13} /> Omborda mavjud
              </span>
            )}
          </div>

          {/* price */}
          <div className="mt-5 flex items-end gap-3 rounded-3xl bg-canvas p-5">
            <span className="text-[32px] font-extrabold tracking-tight text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <div className="mb-1.5">
                <span className="block text-[15px] font-medium text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {disc > 0 && <span className="text-[13px] font-bold text-red-500">{disc}% tejaysiz</span>}
              </div>
            )}
          </div>

          {/* qty + actions */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-2xl border border-gray-200 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center text-gray-500 hover:text-brand-600"
              >
                <Minus size={18} />
              </button>
              <span className="w-10 text-center text-lg font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-12 place-items-center text-gray-500 hover:text-brand-600"
              >
                <Plus size={18} />
              </button>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Saqlash"
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl border transition",
                wished ? "border-red-200 bg-red-50 text-red-500" : "border-gray-200 bg-white text-gray-400 hover:text-red-500"
              )}
            >
              <Heart size={20} className={wished ? "fill-red-500" : ""} />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => openQuickOrder(product)} className="btn-accent btn-lg flex-1">
              <Zap size={18} />
              Tez buyurtma berish
            </button>
            <button onClick={() => addToCart(product, qty)} className="btn-primary btn-lg flex-1">
              <ShoppingCart size={18} />
              Savatchaga qo‘shish
            </button>
          </div>

          {/* trust mini cards */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {trust.map((t) => (
              <div key={t.text} className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-card ring-1 ring-gray-100">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <t.icon size={17} />
                </span>
                <span className="text-[13px] font-medium text-gray-700">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-10">
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-gray-100 no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "h-11 shrink-0 rounded-xl px-5 text-[14px] font-semibold transition",
                tab === t ? "bg-brand-600 text-white shadow-sm" : "text-gray-500 hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-white p-6 shadow-card ring-1 ring-gray-100 sm:p-8">
          {tab === "Tavsif" && (
            <div className="max-w-3xl">
              <p className="text-[15px] leading-relaxed text-gray-700">{product.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {["Sifatli material", "Tez yetkazib berish", "Operator qo‘llab-quvvatlashi", "Ishonchli xarid"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px] text-gray-700">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                        <Check size={14} />
                      </span>
                      {f}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {tab === "Xususiyatlar" && (
            <div className="max-w-2xl overflow-hidden rounded-2xl ring-1 ring-gray-100">
              {product.specifications.map((s, i) => (
                <div
                  key={s.label}
                  className={cn("flex items-center justify-between px-4 py-3 text-[14px]", i % 2 === 0 ? "bg-canvas" : "bg-white")}
                >
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-semibold text-ink">{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "Yetkazib berish" && (
            <div className="max-w-2xl space-y-4 text-[14px] text-gray-700">
              <div className="flex items-start gap-3">
                <Truck size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <p>O‘zbekiston bo‘ylab 1–3 kun ichida yetkazib beriladi. Toshkent shahri bo‘ylab ko‘pincha 1 kunda.</p>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <p>To‘lov Click, Payme yoki mahsulotni qabul qilganda naqd amalga oshiriladi.</p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <p>Buyurtma operator tomonidan tasdiqlanadi, shundan so‘ng jo‘natiladi.</p>
              </div>
            </div>
          )}

          {tab === "Fikrlar" && (
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-ink">{product.rating.toFixed(1)}</p>
                  <Stars rating={product.rating} />
                  <p className="mt-1 text-[12px] text-gray-400">{product.reviewsCount} ta fikr</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-3 text-[12px] text-gray-400">{star}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${star >= 4 ? 80 - (5 - star) * 25 : 8}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {[
                { name: "Nodira", text: "Mahsulot juda yaxshi, tez yetib keldi. Tavsiya qilaman!" },
                { name: "Sardor", text: "Narxi arzon, sifati esa yaxshi chiqdi. Rahmat 200k.uz." },
              ].map((r) => (
                <div key={r.name} className="rounded-2xl bg-canvas p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{r.name}</span>
                    <Stars rating={5} size={13} />
                  </div>
                  <p className="mt-1.5 text-[14px] text-gray-600">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-[60px] z-30 border-t border-gray-100 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="container-app flex items-center gap-3 px-0">
          <div className="shrink-0">
            <p className="text-[11px] text-gray-400">Narx</p>
            <p className="text-[17px] font-extrabold text-ink">{formatPrice(product.price)}</p>
          </div>
          <button onClick={() => openQuickOrder(product)} className="btn-accent btn-md flex-1">
            <Zap size={16} />
            Tez buyurtma
          </button>
          <button
            onClick={() => addToCart(product, qty)}
            aria-label="Savatchaga"
            className="grid h-11 w-12 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white"
          >
            <ShoppingCart size={19} />
          </button>
        </div>
      </div>
    </>
  );
}
