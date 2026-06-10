"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { formatPrice } from "@/lib/data";
import { ProductImage } from "@/components/ui/ProductImage";

export default function CartPage() {
  const { cart, cartTotal, setQty, removeFromCart, hydrated } = useStore();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);

  const discount = applied ? Math.round(cartTotal * 0.1) : 0;
  const delivery = cartTotal > 300000 || cart.length === 0 ? 0 : 25000;
  const total = cartTotal - discount + delivery;

  if (!hydrated) {
    return <div className="container-app py-16 text-center text-muted">Yuklanmoqda...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="container-app py-16">
        <div className="mx-auto grid max-w-md place-items-center rounded-3xl bg-white py-16 text-center shadow-card ring-1 ring-gray-100">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-600">
            <ShoppingBag size={36} />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ink">Savatchangiz hozircha bo‘sh</h1>
          <p className="mt-2 max-w-xs text-[15px] text-muted">
            Mahsulotlarni qo‘shing va qulay narxlarda buyurtma bering.
          </p>
          <Link href="/catalog" className="btn-primary btn-lg mt-6">
            Mahsulotlarni ko‘rish
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Savatcha</h1>
      <p className="mt-1 text-muted">{cart.length} ta mahsulot turi savatchangizda</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex gap-3 rounded-3xl bg-white p-3 shadow-card ring-1 ring-gray-100 sm:gap-4 sm:p-4"
            >
              <Link href={`/product/${item.slug}`} className="shrink-0">
                <ProductImage
                  emoji={item.emoji}
                  gradient={item.gradient}
                  className="h-24 w-24 rounded-2xl sm:h-28 sm:w-28"
                  emojiClassName="text-4xl"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/product/${item.slug}`}
                  className="line-clamp-2 text-[14px] font-semibold text-ink hover:text-brand-600 sm:text-[15px]"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-[17px] font-extrabold text-brand-600">{formatPrice(item.price)}</p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-xl border border-gray-200">
                    <button
                      onClick={() => setQty(item.productId, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center text-gray-500 hover:text-brand-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-9 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => setQty(item.productId, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center text-gray-500 hover:text-brand-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[13px] font-medium text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">O‘chirish</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
            <h3 className="text-lg font-bold text-ink">Buyurtma xulosasi</h3>

            {/* promo */}
            <div className="mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Promokod"
                    className="input h-11 pl-10"
                  />
                </div>
                <button
                  onClick={() => setApplied(promo.trim().length > 0)}
                  className="btn-dark btn-md shrink-0"
                >
                  Qo‘llash
                </button>
              </div>
              {applied && <p className="mt-2 text-[12px] font-semibold text-emerald-600">Promokod qo‘llandi: -10%</p>}
            </div>

            <div className="mt-5 space-y-3 text-[14px]">
              <Row label="Mahsulotlar summasi" value={formatPrice(cartTotal)} />
              {discount > 0 && <Row label="Chegirma" value={`- ${formatPrice(discount)}`} accent="text-emerald-600" />}
              <Row
                label="Yetkazib berish"
                value={delivery === 0 ? "Bepul" : formatPrice(delivery)}
                accent={delivery === 0 ? "text-emerald-600" : undefined}
              />
              {delivery > 0 && (
                <p className="flex items-center gap-1.5 text-[12px] text-gray-400">
                  <Truck size={13} /> 300 000 so‘mdan ortiq xaridga bepul yetkazish
                </p>
              )}
              <div className="border-t border-dashed border-gray-200 pt-3">
                <Row label="Yakuniy summa" value={formatPrice(total)} bold />
              </div>
            </div>

            <Link href="/checkout" className="btn-primary btn-lg mt-5 w-full">
              Buyurtma berish
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/catalog"
              className="mt-2 block text-center text-[13px] font-semibold text-brand-600 hover:underline"
            >
              Xaridni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "text-[15px] font-bold text-ink" : "text-gray-500"}>{label}</span>
      <span className={`${bold ? "text-xl font-extrabold text-ink" : "font-semibold text-ink"} ${accent ?? ""}`}>
        {value}
      </span>
    </div>
  );
}
