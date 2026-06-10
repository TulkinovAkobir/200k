import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function AppCta() {
  return (
    <section className="container-app py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-center shadow-lift sm:p-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-600/40 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-violet-600/40 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl" />
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
            <Zap size={14} className="fill-accent-400 text-accent-400" />
            200k.uz — har kuni foydali takliflar
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-extrabold leading-tight text-white sm:text-[40px]">
            Bugun xaridni boshlang
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/75">
            Trend mahsulotlar, chegirmalar va tez yetkazib berish — barchasi 200k.uz’da.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/catalog" className="btn bg-white px-6 text-ink btn-lg hover:bg-gray-100">
              Katalogni ko‘rish
              <ArrowRight size={18} />
            </Link>
            <Link href="/catalog" className="btn-accent btn-lg px-6">
              <Zap size={18} />
              Tez buyurtma berish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
