"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={cn(
              "overflow-hidden rounded-2xl bg-white ring-1 transition",
              isOpen ? "shadow-card ring-brand-200" : "ring-gray-100"
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
            >
              <span className="text-[15px] font-bold text-ink">{f.q}</span>
              <ChevronDown
                size={20}
                className={cn("shrink-0 text-brand-600 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-[14px] leading-relaxed text-muted sm:px-5 sm:pb-5">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
