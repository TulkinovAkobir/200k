"use client";

import { CheckCircle2, Info } from "lucide-react";
import { useStore } from "@/store/StoreProvider";

export function Toaster() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-8">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex animate-slide-up items-center gap-2.5 rounded-2xl bg-ink/95 px-4 py-3 text-sm font-medium text-white shadow-lift backdrop-blur"
        >
          {t.tone === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <Info size={18} className="text-brand-300" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}
