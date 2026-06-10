"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bell,
  Gift,
  Heart,
  LogOut,
  MapPin,
  Package,
  Phone,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { formatPrice, products, sampleOrders } from "@/lib/data";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductImage } from "@/components/ui/ProductImage";

const statusStyles: Record<OrderStatus, string> = {
  Yangi: "bg-brand-50 text-brand-600",
  "Operator bog‘landi": "bg-violet-50 text-violet-600",
  Yetkazilmoqda: "bg-amber-50 text-amber-600",
  Yetkazildi: "bg-emerald-50 text-emerald-600",
  "Bekor qilindi": "bg-red-50 text-red-500",
};

const tabs = [
  { key: "profile", label: "Mening profilim", icon: User },
  { key: "orders", label: "Buyurtmalarim", icon: Package },
  { key: "wishlist", label: "Saqlangan", icon: Heart },
  { key: "addresses", label: "Manzillarim", icon: MapPin },
  { key: "bonuses", label: "Bonuslarim", icon: Gift },
  { key: "settings", label: "Sozlamalar", icon: Settings },
];

export function ProfileView() {
  const params = useSearchParams();
  const initialTab = params.get("tab") ?? "profile";
  const [tab, setTab] = useState(initialTab);
  const [loggedIn, setLoggedIn] = useState(true);
  const { wishlist } = useStore();

  const wished = products.filter((p) => wishlist.includes(p.id));

  if (!loggedIn) {
    return (
      <div className="container-app py-16">
        <div className="mx-auto max-w-sm rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-gray-100">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <Phone size={28} />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-ink">Kirish</h1>
          <p className="mt-1 text-[14px] text-muted">Telefon raqamingiz orqali kiring</p>
          <input placeholder="+998 90 123 45 67" className="input mt-5" inputMode="tel" />
          <button onClick={() => setLoggedIn(true)} className="btn-primary btn-lg mt-3 w-full">
            Kodni olish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Shaxsiy kabinet</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* sidebar */}
        <aside>
          <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-violet-500 text-lg font-bold text-white">
                A
              </span>
              <div>
                <p className="font-bold text-ink">Aziz Karimov</p>
                <p className="text-[13px] text-gray-400">+998 90 123 45 67</p>
              </div>
            </div>
          </div>

          <nav className="mt-3 overflow-x-auto rounded-3xl bg-white p-2 shadow-card ring-1 ring-gray-100 lg:overflow-visible">
            <div className="flex gap-1 lg:flex-col">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold transition",
                    tab === t.key ? "bg-brand-600 text-white shadow-sm" : "text-gray-600 hover:bg-canvas"
                  )}
                >
                  <t.icon size={18} />
                  {t.label}
                </button>
              ))}
              <button
                onClick={() => setLoggedIn(false)}
                className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Chiqish
              </button>
            </div>
          </nav>
        </aside>

        {/* content */}
        <div className="min-w-0">
          {tab === "profile" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { v: sampleOrders.length, l: "Buyurtmalar", icon: Package },
                  { v: wished.length, l: "Saqlangan", icon: Heart },
                  { v: "12 500", l: "Bonus", icon: Gift },
                  { v: 2, l: "Manzil", icon: MapPin },
                ].map((s) => (
                  <div key={s.l} className="rounded-3xl bg-white p-4 shadow-card ring-1 ring-gray-100">
                    <s.icon size={20} className="text-brand-600" />
                    <p className="mt-3 text-2xl font-extrabold text-ink">{s.v}</p>
                    <p className="text-[12px] text-gray-400">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
                <h3 className="text-lg font-bold text-ink">So‘nggi buyurtma</h3>
                <OrderCard order={sampleOrders[0]} />
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-3">
              {sampleOrders.map((o) => (
                <div key={o.id} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
                  <OrderCard order={o} />
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" &&
            (wished.length ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {wished.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Heart size={32} />}
                title="Saqlangan mahsulotlar yo‘q"
                text="Yoqqan mahsulotlarni ❤️ tugmasi orqali saqlang"
              />
            ))}

          {tab === "addresses" && (
            <div className="space-y-3">
              {[
                { label: "Uy", value: "Toshkent shahri, Chilonzor tumani, 12-uy" },
                { label: "Ish", value: "Toshkent shahri, Yunusobod tumani, 5-uy" },
              ].map((a) => (
                <div key={a.label} className="flex items-start gap-3 rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{a.label}</p>
                    <p className="text-[14px] text-muted">{a.value}</p>
                  </div>
                </div>
              ))}
              <button className="btn-ghost btn-lg w-full">+ Yangi manzil qo‘shish</button>
            </div>
          )}

          {tab === "bonuses" && (
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-600 p-6 text-white shadow-lift">
              <Gift size={28} />
              <p className="mt-4 text-[14px] text-white/80">Mavjud bonus ballaringiz</p>
              <p className="text-4xl font-extrabold">12 500</p>
              <p className="mt-2 text-[13px] text-white/70">Har bir xaridda 1% bonus to‘planadi va keyingi buyurtmada ishlatiladi.</p>
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-3">
              {[
                { icon: User, label: "Shaxsiy ma’lumotlar", text: "Ism, telefon raqam" },
                { icon: Bell, label: "Bildirishnomalar", text: "SMS va Telegram orqali xabarlar" },
                { icon: Settings, label: "Maxfiylik", text: "Hisob xavfsizligi sozlamalari" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="flex w-full items-center gap-3 rounded-3xl bg-white p-5 text-left shadow-card ring-1 ring-gray-100 hover:ring-brand-200"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <p className="font-bold text-ink">{s.label}</p>
                    <p className="text-[13px] text-muted">{s.text}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: (typeof sampleOrders)[number] }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-bold text-ink">{order.id}</p>
          <p className="text-[13px] text-gray-400">{order.date} · {order.itemsCount} ta mahsulot</p>
        </div>
        <span className={cn("badge", statusStyles[order.status])}>{order.status}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {order.items.map((it, i) => (
            <ProductImage
              key={i}
              emoji={it.emoji}
              gradient={it.gradient}
              className="h-10 w-10 rounded-xl ring-2 ring-white"
              emojiClassName="text-base"
            />
          ))}
        </div>
        <p className="text-[17px] font-extrabold text-ink">{formatPrice(order.total)}</p>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="grid place-items-center rounded-3xl bg-white py-16 text-center shadow-card ring-1 ring-gray-100">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">{icon}</span>
      <p className="mt-4 text-lg font-bold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
      <Link href="/catalog" className="btn-primary btn-md mt-5">
        <ShoppingBag size={16} /> Mahsulotlarni ko‘rish
      </Link>
    </div>
  );
}
