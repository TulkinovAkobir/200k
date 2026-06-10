"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function FlashSale() {
  // Target: a fixed window from first client render (12h 45m 20s) counting down.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = Date.now() + (12 * 3600 + 45 * 60 + 20) * 1000;
    const tick = () => setRemaining(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const h = remaining === null ? 12 : Math.floor(remaining / 3600);
  const m = remaining === null ? 45 : Math.floor((remaining % 3600) / 60);
  const s = remaining === null ? 20 : remaining % 60;

  return (
    <section className="container-app py-8 sm:py-10">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-brand-600 to-accent-500 p-6 shadow-lift sm:p-10">
        {/* decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-accent-400/30 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 text-[120px] opacity-10">🔥</div>
        </div>

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold backdrop-blur">
              <Zap size={14} className="fill-white" />
              Cheklangan vaqt
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-[32px]">
              Bugungi super chegirmalar
            </h2>
            <p className="mt-2 text-[15px] text-white/85">
              Cheklangan vaqt ichida eng ommabop mahsulotlarga maxsus narxlar
            </p>

            <Link
              href="/catalog?sort=discount"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-6 text-sm font-bold text-brand-600 shadow-lg transition hover:scale-[1.02]"
            >
              Chegirmalarni ko‘rish
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* countdown */}
          <div className="flex items-center gap-3">
            {[
              { v: h, l: "soat" },
              { v: m, l: "daqiqa" },
              { v: s, l: "soniya" },
            ].map((u, i) => (
              <div key={u.l} className="flex items-center gap-3">
                <div className="glass grid h-[78px] w-[72px] place-items-center rounded-2xl shadow-lift sm:h-24 sm:w-20">
                  <span className="text-3xl font-extrabold text-ink tabular-nums sm:text-4xl">{pad(u.v)}</span>
                  <span className="text-[11px] font-semibold uppercase text-gray-500">{u.l}</span>
                </div>
                {i < 2 && <span className="text-2xl font-bold text-white/70">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
