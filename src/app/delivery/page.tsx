import type { Metadata } from "next";
import { Banknote, CreditCard, MapPin, PackageCheck, Smartphone, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Yetkazib berish va to‘lov",
  description: "200k.uz yetkazib berish muddatlari va to‘lov usullari haqida ma’lumot.",
};

const steps = [
  { icon: PackageCheck, title: "Buyurtma tasdiqlanadi", text: "Operator siz bilan bog‘lanib buyurtmani tasdiqlaydi" },
  { icon: Truck, title: "Jo‘natiladi", text: "Mahsulot eng tez kuryer xizmati orqali jo‘natiladi" },
  { icon: MapPin, title: "Yetkazib beriladi", text: "1–3 kun ichida ko‘rsatilgan manzilga yetkaziladi" },
];

const payments = [
  { icon: Smartphone, title: "Click", text: "Click ilovasi orqali xavfsiz onlayn to‘lov" },
  { icon: CreditCard, title: "Payme", text: "Payme orqali bir necha soniyada to‘lov" },
  { icon: Banknote, title: "Naqd", text: "Mahsulotni qabul qilganda naqd to‘lash" },
];

export default function DeliveryPage() {
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: "Yetkazib berish va to‘lov" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Yetkazib berish va to‘lov</h1>
      <p className="mt-2 max-w-2xl text-muted">
        O‘zbekiston bo‘ylab tez va ishonchli yetkazib berish, qulay to‘lov usullari.
      </p>

      {/* delivery steps */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-ink">Yetkazib berish bosqichlari</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
              <span className="absolute right-5 top-5 text-3xl font-extrabold text-gray-100">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-500 text-white">
                <s.icon size={22} />
              </span>
              <h3 className="mt-4 font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-[14px] text-muted">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100 sm:grid-cols-2">
          <Info label="Toshkent shahri" value="1 kun ichida" />
          <Info label="Viloyatlar" value="1–3 kun ichida" />
          <Info label="Yetkazib berish narxi" value="300 000 so‘mdan ortiq xaridga bepul" />
          <Info label="Qadoqlash" value="Har bir buyurtma puxta qadoqlanadi" />
        </div>
      </section>

      {/* payment */}
      <section id="payment" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-ink">To‘lov usullari</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {payments.map((p) => (
            <div key={p.title} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-canvas text-brand-600">
                <p.icon size={22} />
              </span>
              <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
              <p className="mt-1 text-[14px] text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3">
      <span className="text-[14px] text-gray-500">{label}</span>
      <span className="text-[14px] font-semibold text-ink">{value}</span>
    </div>
  );
}
