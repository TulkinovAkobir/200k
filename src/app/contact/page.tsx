import type { Metadata } from "next";
import { Clock, Headphones, Mail, MapPin, Phone, Send } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { contact } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aloqa / Call-center",
  description: "200k.uz call-center va aloqa ma’lumotlari.",
};

export default function ContactPage() {
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: "Aloqa" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">Aloqa va call-center</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Savollaringiz bo‘lsa biz bilan bog‘laning — operatorlarimiz har kuni yordam berishga tayyor.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-600 p-6 text-white shadow-lift lg:col-span-1">
          <Headphones size={28} />
          <p className="mt-4 text-[14px] text-white/80">Call-center</p>
          <a href={`tel:${contact.phoneHref}`} className="block text-2xl font-extrabold">
            {contact.phone}
          </a>
          <p className="mt-4 flex items-center gap-2 text-[13px] text-white/70">
            <Clock size={15} /> {contact.hours}
          </p>
        </div>

        <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
          <Card icon={Phone} title="Telefon" value={contact.phone} href={`tel:${contact.phoneHref}`} />
          <Card icon={Send} title="Telegram" value={contact.telegram} href={contact.telegramHref} />
          <Card icon={Mail} title="Email" value="info@200k.uz" href="mailto:info@200k.uz" />
          <Card icon={MapPin} title="Manzil" value="O‘zbekiston, Toshkent" />
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-gray-100">
        <h2 className="text-lg font-bold text-ink">Xabar yuborish</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input placeholder="Ismingiz" className="input" />
          <input placeholder="Telefon raqam" className="input" inputMode="tel" />
          <input placeholder="Xabaringiz" className="input sm:col-span-2" />
        </div>
        <button className="btn-primary btn-lg mt-4">Yuborish</button>
      </div>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-[13px] text-gray-400">{title}</p>
        <p className="font-bold text-ink">{value}</p>
      </div>
    </>
  );
  const cls = "flex items-center gap-3 rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100 transition hover:ring-brand-200";
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
