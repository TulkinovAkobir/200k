import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Box,
  CheckCircle2,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { formatPrice, products, sampleOrders } from "@/lib/data";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/ui/ProductImage";

export const metadata: Metadata = {
  title: "Admin panel — konsept",
  robots: { index: false },
};

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Mahsulotlar", icon: Box },
  { label: "Buyurtmalar", icon: ShoppingCart },
  { label: "Mijozlar", icon: Users },
  { label: "Kategoriyalar", icon: Tag },
  { label: "Chegirmalar", icon: TrendingUp },
  { label: "Statistika", icon: BarChart3 },
  { label: "Sozlamalar", icon: Settings },
];

const stats = [
  { label: "Bugungi buyurtmalar", value: "128", delta: "+12%", icon: ShoppingCart, tone: "from-brand-600 to-violet-500" },
  { label: "Umumiy savdo", value: "48.2 mln", delta: "+8%", icon: TrendingUp, tone: "from-emerald-500 to-teal-400" },
  { label: "Yangi mijozlar", value: "342", delta: "+24%", icon: Users, tone: "from-accent-500 to-accent-400" },
  { label: "Yetkazilgan", value: "1 094", delta: "+5%", icon: CheckCircle2, tone: "from-fuchsia-600 to-pink-500" },
];

const statusStyles: Record<OrderStatus, string> = {
  Yangi: "bg-brand-50 text-brand-600",
  "Operator bog‘landi": "bg-violet-50 text-violet-600",
  Yetkazilmoqda: "bg-amber-50 text-amber-600",
  Yetkazildi: "bg-emerald-50 text-emerald-600",
  "Bekor qilindi": "bg-red-50 text-red-500",
};

const orderRows = [
  { id: "200K-10428", customer: "Aziza R.", phone: "+998 90 111 22 33", product: "Simsiz quloqchin TWS Pro", total: 199000, status: "Yangi" as OrderStatus },
  { id: "200K-10427", customer: "Jasur K.", phone: "+998 93 222 33 44", product: "Quruq shampun", total: 59000, status: "Operator bog‘landi" as OrderStatus },
  { id: "200K-10426", customer: "Madina T.", phone: "+998 94 333 44 55", product: "Oltin yuz niqobi", total: 49000, status: "Yetkazilmoqda" as OrderStatus },
  { id: "200K-10425", customer: "Dilshod A.", phone: "+998 91 444 55 66", product: "Muqaddima to‘plami", total: 289000, status: "Yetkazildi" as OrderStatus },
  { id: "200K-10424", customer: "Sevara M.", phone: "+998 97 555 66 77", product: "Elektr tirnoq kesgich", total: 77000, status: "Bekor qilindi" as OrderStatus },
];

export default function AdminPage() {
  const topProducts = [...products].sort((a, b) => b.ordersCount - a.ordersCount).slice(0, 5);

  return (
    <div className="bg-canvas">
      <div className="container-app py-6">
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2.5 text-[13px] font-medium text-amber-700 ring-1 ring-amber-100">
          <Package size={16} /> Bu admin panel konsepti (demo) — faqat ko‘rgazma uchun.
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl bg-white p-3 shadow-card ring-1 ring-gray-100">
              {nav.map((n) => (
                <button
                  key={n.label}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold transition",
                    n.active ? "bg-brand-600 text-white" : "text-gray-600 hover:bg-canvas"
                  )}
                >
                  <n.icon size={18} />
                  {n.label}
                </button>
              ))}
            </div>
          </aside>

          {/* main */}
          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-ink">Dashboard</h1>
                <p className="text-muted">200k.uz boshqaruv paneli</p>
              </div>
              <Link href="/" className="btn-ghost btn-md hidden sm:inline-flex">Saytga qaytish</Link>
            </div>

            {/* stat cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
                  <div className="flex items-center justify-between">
                    <span className={cn("grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white", s.tone)}>
                      <s.icon size={20} />
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-600">{s.delta}</span>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-ink">{s.value}</p>
                  <p className="text-[13px] text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_340px]">
              {/* orders table */}
              <div className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-gray-100">
                <div className="flex items-center justify-between p-5">
                  <h2 className="font-bold text-ink">So‘nggi buyurtmalar</h2>
                  <span className="text-[13px] font-semibold text-brand-600">Barchasi</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-[13px]">
                    <thead className="bg-canvas text-gray-400">
                      <tr>
                        <th className="px-5 py-3 font-semibold">ID</th>
                        <th className="px-5 py-3 font-semibold">Mijoz</th>
                        <th className="px-5 py-3 font-semibold">Mahsulot</th>
                        <th className="px-5 py-3 font-semibold">Summa</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orderRows.map((o) => (
                        <tr key={o.id} className="hover:bg-canvas/60">
                          <td className="px-5 py-3 font-bold text-ink">{o.id}</td>
                          <td className="px-5 py-3">
                            <p className="font-semibold text-ink">{o.customer}</p>
                            <p className="text-gray-400">{o.phone}</p>
                          </td>
                          <td className="px-5 py-3 text-gray-600">{o.product}</td>
                          <td className="px-5 py-3 font-bold text-ink">{formatPrice(o.total)}</td>
                          <td className="px-5 py-3">
                            <span className={cn("badge", statusStyles[o.status])}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* top products */}
              <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
                <h2 className="font-bold text-ink">Eng ko‘p sotilgan</h2>
                <div className="mt-4 space-y-3">
                  {topProducts.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-[13px] font-extrabold text-gray-300">#{i + 1}</span>
                      <ProductImage emoji={p.emoji} gradient={p.gradient} className="h-10 w-10 shrink-0 rounded-xl" emojiClassName="text-base" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-[13px] font-semibold text-ink">{p.title}</p>
                        <p className="text-[12px] text-gray-400">{p.ordersCount.toLocaleString("ru-RU")} buyurtma</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
