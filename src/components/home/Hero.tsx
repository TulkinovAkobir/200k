import Link from "next/link";
import { ArrowRight, BadgePercent, Clock, Headphones, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { formatPrice, newProducts } from "@/lib/data";
import { ProductImage } from "@/components/ui/ProductImage";

const stats = [
  { value: "10 000+", label: "buyurtma" },
  { value: "3 kun", label: "yetkazib berish" },
  { value: "24/7", label: "qo‘llab-quvvatlash" },
  { value: "Click/Payme", label: "to‘lov" },
];

export function Hero() {
  const featured = newProducts.slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      {/* gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="container-app grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
        {/* copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-brand-600 shadow-card ring-1 ring-gray-100">
            <Sparkles size={15} className="text-accent-500" />
            Har kuni foydali takliflar
          </span>

          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            Trend mahsulotlar,{" "}
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              qulay narxlar
            </span>{" "}
            va tez yetkazib berish
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            O‘zbekiston bo‘ylab ommabop mahsulotlarni toping, buyurtma qiling va qisqa vaqt ichida
            qabul qiling. Click, Payme yoki naqd to‘lov orqali xarid qiling.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary btn-lg">
              Mahsulotlarni ko‘rish
              <ArrowRight size={18} />
            </Link>
            <Link href="/catalog?sort=discount" className="btn-ghost btn-lg">
              <BadgePercent size={18} className="text-accent-500" />
              Bugungi chegirmalar
            </Link>
          </div>

          {/* trust stats */}
          <div className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-extrabold text-ink">{s.value}</p>
                <p className="text-[13px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="relative hidden h-[460px] lg:block">
          {/* main floating cards */}
          <FloatCard
            product={featured[0]}
            className="left-2 top-4 w-60 rotate-[-4deg]"
            badge={<span className="badge bg-gradient-to-r from-red-500 to-orange-500 text-white">-35% chegirma</span>}
          />
          <FloatCard
            product={featured[1]}
            className="right-2 top-24 w-56 rotate-[5deg] [animation-delay:1.2s]"
            badge={<span className="badge bg-ink text-white">🔥 Hot Deal</span>}
          />
          <FloatCard
            product={featured[2]}
            className="bottom-2 left-16 w-56 rotate-[2deg] [animation-delay:0.6s]"
            badge={
              <span className="badge bg-emerald-500 text-white">
                <Truck size={12} /> Tez yetkazish
              </span>
            }
          />

          {/* glass info chips */}
          <div className="glass absolute right-6 bottom-10 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-lift">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              <ShieldCheck size={18} />
            </span>
            <span>
              <span className="block text-[13px] font-bold text-ink">Ishonchli xarid</span>
              <span className="block text-[11px] text-gray-500">Operator tasdiqlaydi</span>
            </span>
          </div>
        </div>
      </div>

      {/* mobile compact visual strip */}
      <div className="container-app pb-2 lg:hidden">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {newProducts.slice(0, 4).map((p) => (
            <div key={p.id} className="w-36 shrink-0 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-100">
              <ProductImage emoji={p.emoji} gradient={p.gradient} className="aspect-square w-full" emojiClassName="text-4xl" />
              <div className="p-2.5">
                <p className="line-clamp-1 text-[12px] font-semibold text-ink">{p.title}</p>
                <p className="text-[13px] font-extrabold text-brand-600">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  product,
  className,
  badge,
}: {
  product: { title: string; emoji: string; gradient: string; price: number };
  className?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className={`absolute animate-float rounded-3xl bg-white p-3 shadow-lift ring-1 ring-gray-100 ${className}`}>
      <div className="relative">
        <ProductImage emoji={product.emoji} gradient={product.gradient} className="aspect-[4/3] w-full rounded-2xl" emojiClassName="text-5xl" />
        <div className="absolute left-2 top-2">{badge}</div>
      </div>
      <p className="mt-2.5 line-clamp-1 text-[13px] font-semibold text-ink">{product.title}</p>
      <p className="text-[15px] font-extrabold text-brand-600">{formatPrice(product.price)}</p>
    </div>
  );
}
