import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Gift,
  Headphones,
  MapPin,
  RefreshCw,
  Wallet,
} from "lucide-react";

const benefits = [
  { icon: RefreshCw, text: "Mahsulotlar tez yangilanadi" },
  { icon: Boxes, text: "Ommabop va trend tovarlar" },
  { icon: Headphones, text: "Operatorlar tez bog‘lanadi" },
  { icon: MapPin, text: "Viloyatlarga yetkazib berish" },
  { icon: Wallet, text: "Qulay to‘lov usullari" },
  { icon: Gift, text: "Doimiy mijozlarga bonus" },
];

export function ValueSection() {
  return (
    <section className="container-app py-8 sm:py-12">
      <div className="grid items-center gap-8 rounded-[28px] bg-white p-6 shadow-card ring-1 ring-gray-100 sm:p-10 lg:grid-cols-2">
        {/* visual */}
        <div className="relative order-2 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-500 to-violet-600 p-8 lg:order-1">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4 text-white">
            {[
              { v: "10 000+", l: "Mamnun mijoz" },
              { v: "500+", l: "Mahsulot turi" },
              { v: "14", l: "Viloyat qamrovi" },
              { v: "4.9★", l: "O‘rtacha reyting" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-ink">
                <p className="text-2xl font-extrabold">{s.v}</p>
                <p className="text-[13px] text-gray-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <h2 className="section-title">Nega aynan 200k.uz?</h2>
          <p className="section-sub mb-6">Xaridni qulay, tez va ishonchli qiladigan afzalliklar</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <b.icon size={18} />
                </span>
                <span className="text-[14px] font-medium text-ink">{b.text}</span>
              </li>
            ))}
          </ul>
          <Link href="/catalog" className="btn-primary btn-lg mt-7">
            Katalogni ko‘rish
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
