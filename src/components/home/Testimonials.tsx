import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Stars } from "@/components/ui/Stars";

const avatarColors = [
  "from-brand-600 to-violet-500",
  "from-emerald-500 to-teal-400",
  "from-accent-500 to-accent-400",
  "from-fuchsia-600 to-pink-500",
  "from-sky-500 to-blue-400",
  "from-rose-500 to-pink-400",
];

export function Testimonials() {
  return (
    <section className="container-app py-8 sm:py-12">
      <div className="mb-8 text-center">
        <h2 className="section-title">Mijozlarimiz fikri</h2>
        <p className="section-sub">200k.uz orqali xarid qilgan mijozlar tajribasi</p>
      </div>

      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="relative w-[280px] shrink-0 snap-start rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100 sm:w-auto"
          >
            <Quote size={28} className="text-brand-100" />
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700">{t.text}</p>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-[15px] font-bold text-white ${
                  avatarColors[i % avatarColors.length]
                }`}
              >
                {t.name.charAt(0)}
              </span>
              <div>
                <p className="text-[14px] font-bold text-ink">{t.name}</p>
                <p className="text-[12px] text-gray-400">{t.city}</p>
              </div>
              <div className="ml-auto">
                <Stars rating={t.rating} size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
