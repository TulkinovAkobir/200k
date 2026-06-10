import { Phone, Send, Truck } from "lucide-react";
import { contact } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-ink via-brand-800 to-violet-600 text-white">
      <div className="container-app flex h-9 items-center justify-between gap-3 text-[12px] font-medium sm:h-10 sm:text-[13px]">
        <p className="flex items-center gap-2 truncate">
          <Truck size={15} className="shrink-0 text-accent-400" />
          <span className="truncate">
            O‘zbekiston bo‘ylab tez yetkazib berish
            <span className="hidden sm:inline"> | Click, Payme va naqd to‘lov mavjud</span>
          </span>
        </p>
        <div className="hidden items-center gap-4 md:flex">
          <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-1.5 hover:text-accent-400">
            <Phone size={14} />
            {contact.phone}
          </a>
          <a
            href={contact.telegramHref}
            className="flex items-center gap-1.5 hover:text-accent-400"
          >
            <Send size={14} />
            {contact.telegram}
          </a>
        </div>
        <a
          href={`tel:${contact.phoneHref}`}
          className="flex items-center gap-1.5 md:hidden"
        >
          <Phone size={14} className="text-accent-400" />
        </a>
      </div>
    </div>
  );
}
