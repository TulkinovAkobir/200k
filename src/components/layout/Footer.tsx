import Link from "next/link";
import { Clock, Instagram, MapPin, Phone, Send } from "lucide-react";
import { categories } from "@/lib/data";
import { contact } from "@/lib/constants";
import { Logo } from "./Logo";

const buyerLinks = [
  { label: "Buyurtma berish", href: "/catalog" },
  { label: "Yetkazib berish", href: "/delivery" },
  { label: "To‘lov usullari", href: "/delivery#payment" },
  { label: "Qaytarish shartlari", href: "/faq" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="container-app grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-12">
        {/* brand */}
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
            200k.uz — O‘zbekiston bo‘ylab trend mahsulotlarni qulay narxlarda buyurtma qilish uchun
            zamonaviy online do‘kon.
          </p>
          <div className="mt-5 flex gap-2.5">
            {[Send, Instagram].map((Icon, i) => (
              <a
                key={i}
                href={contact.telegramHref}
                className="grid h-10 w-10 place-items-center rounded-xl bg-canvas text-gray-600 transition hover:bg-brand-600 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* categories */}
        <div className="lg:col-span-3">
          <h4 className="text-sm font-bold text-ink">Kategoriyalar</h4>
          <ul className="mt-4 space-y-2.5">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="text-[14px] text-muted hover:text-brand-600">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* buyers */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-bold text-ink">Xaridorlar uchun</h4>
          <ul className="mt-4 space-y-2.5">
            {buyerLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[14px] text-muted hover:text-brand-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-sm font-bold text-ink">Aloqa</h4>
          <ul className="mt-4 space-y-3 text-[14px] text-muted">
            <li>
              <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-2.5 hover:text-brand-600">
                <Phone size={16} className="text-brand-600" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.telegramHref} className="flex items-center gap-2.5 hover:text-brand-600">
                <Send size={16} className="text-brand-600" />
                {contact.telegram}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-brand-600" />
              {contact.hours}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-brand-600" />
              O‘zbekiston
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-gray-400 sm:flex-row">
          <p>© 2026 200k.uz. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-brand-600">
              Maxfiylik siyosati
            </Link>
            <Link href="/terms" className="hover:text-brand-600">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
