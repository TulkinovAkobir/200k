import { CreditCard, Gift, Headphones, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Tezkor yetkazib berish",
    text: "O‘zbekiston bo‘ylab 3 kungacha yetkazib berish",
    gradient: "from-brand-600 to-violet-500",
  },
  {
    icon: CreditCard,
    title: "Qulay to‘lov",
    text: "Click, Payme yoki naqd to‘lov",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Headphones,
    title: "Call-center",
    text: "Har kuni mijozlarga yordam",
    gradient: "from-accent-500 to-accent-400",
  },
  {
    icon: Gift,
    title: "Bonus va sovg‘alar",
    text: "Doimiy xaridorlar uchun maxsus takliflar",
    gradient: "from-fuchsia-600 to-pink-500",
  },
];

export function TrustBar() {
  return (
    <section className="container-app -mt-2 py-6 sm:py-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group flex items-start gap-3 rounded-3xl bg-white p-4 shadow-card ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lift sm:p-5"
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${b.gradient}`}
            >
              <b.icon size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="text-[14px] font-bold text-ink sm:text-[15px]">{b.title}</h3>
              <p className="mt-0.5 text-[12px] leading-snug text-muted sm:text-[13px]">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
