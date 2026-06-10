"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ChevronLeft, CreditCard, Loader2, MapPin, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { formatPrice } from "@/lib/data";
import { regions } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { ProductImage } from "@/components/ui/ProductImage";

type Pay = "Click" | "Payme" | "Naqd";
const steps = ["Ma’lumot", "To‘lov", "Tasdiqlash"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, hydrated } = useStore();
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState<Pay>("Naqd");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", region: "", district: "", address: "", note: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const delivery = cartTotal > 300000 ? 0 : 25000;
  const total = cartTotal + delivery;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateInfo = () => {
    const next: Record<string, boolean> = {};
    if (!form.name.trim()) next.name = true;
    if (!form.phone.trim()) next.phone = true;
    if (!form.region) next.region = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateInfo()) return;
    setStep((s) => Math.min(2, s + 1));
  };

  const placeOrder = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      clearCart();
    }, 1400);
  };

  if (!hydrated) return <div className="container-app py-16 text-center text-muted">Yuklanmoqda...</div>;

  if (done) {
    return (
      <div className="container-app py-16">
        <div className="mx-auto grid max-w-md place-items-center rounded-3xl bg-white py-16 text-center shadow-card ring-1 ring-gray-100">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-500">
            <CheckCircle2 size={44} />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-ink">Buyurtmangiz qabul qilindi!</h1>
          <p className="mt-2 max-w-xs text-[15px] text-muted">
            Operatorimiz tez orada siz bilan bog‘lanadi va buyurtmani tasdiqlaydi.
          </p>
          <p className="mt-4 rounded-full bg-canvas px-4 py-2 text-sm font-semibold text-ink">
            Buyurtma raqami: 200K-{Math.floor(10000 + cartTotal % 9000)}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/profile?tab=orders" className="btn-ghost btn-lg">Buyurtmalarim</Link>
            <Link href="/catalog" className="btn-primary btn-lg">Xaridni davom ettirish</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-app py-16">
        <div className="mx-auto grid max-w-md place-items-center rounded-3xl bg-white py-16 text-center shadow-card ring-1 ring-gray-100">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-600">
            <ShoppingBag size={36} />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ink">Savatcha bo‘sh</h1>
          <p className="mt-2 text-[15px] text-muted">Buyurtma berish uchun avval mahsulot qo‘shing.</p>
          <Link href="/catalog" className="btn-primary btn-lg mt-6">Mahsulotlarni ko‘rish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-500 hover:text-brand-600">
        <ChevronLeft size={18} /> Savatchaga qaytish
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Buyurtma berish</h1>

      {/* progress */}
      <div className="mt-6 flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition",
                  i < step ? "bg-emerald-500 text-white" : i === step ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-400"
                )}
              >
                {i < step ? <Check size={18} /> : i + 1}
              </span>
              <span className={cn("hidden text-[14px] font-semibold sm:block", i <= step ? "text-ink" : "text-gray-400")}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-3 h-0.5 flex-1 rounded-full", i < step ? "bg-emerald-500" : "bg-gray-200")} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100 sm:p-6">
          {step === 0 && (
            <>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <User size={20} className="text-brand-600" /> Kontakt va manzil
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Field label="Ism" error={errors.name}>
                  <input value={form.name} onChange={set("name")} placeholder="Ismingiz" className="input" />
                </Field>
                <Field label="Telefon" error={errors.phone}>
                  <input value={form.phone} onChange={set("phone")} inputMode="tel" placeholder="+998 90 123 45 67" className="input" />
                </Field>
                <Field label="Viloyat" error={errors.region}>
                  <select value={form.region} onChange={set("region")} className="input">
                    <option value="">Tanlang</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Tuman / shahar">
                  <input value={form.district} onChange={set("district")} placeholder="Tuman" className="input" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Manzil">
                    <input value={form.address} onChange={set("address")} placeholder="Ko‘cha, uy, kvartira" className="input" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Izoh">
                    <input value={form.note} onChange={set("note")} placeholder="Qo‘shimcha izoh (ixtiyoriy)" className="input" />
                  </Field>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <CreditCard size={20} className="text-brand-600" /> To‘lov usuli
              </h3>
              <div className="mt-4 space-y-2.5">
                {(["Click", "Payme", "Naqd"] as Pay[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPay(m)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition",
                      pay === m ? "border-brand-600 bg-brand-50 ring-2 ring-brand-500/15" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border-2",
                        pay === m ? "border-brand-600 bg-brand-600 text-white" : "border-gray-300"
                      )}
                    >
                      {pay === m && <Check size={12} />}
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold text-ink">{m}</span>
                      <span className="block text-[13px] text-gray-400">
                        {m === "Naqd" ? "Mahsulotni qabul qilganda to‘lash" : `${m} ilovasi orqali onlayn to‘lov`}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <MapPin size={20} className="text-brand-600" /> Buyurtmani tasdiqlang
              </h3>
              <div className="mt-4 space-y-4 text-[14px]">
                <SummaryBlock title="Qabul qiluvchi">
                  {form.name || "—"} · {form.phone || "—"}
                </SummaryBlock>
                <SummaryBlock title="Manzil">
                  {[form.region, form.district, form.address].filter(Boolean).join(", ") || "—"}
                </SummaryBlock>
                <SummaryBlock title="To‘lov usuli">{pay}</SummaryBlock>
                {form.note && <SummaryBlock title="Izoh">{form.note}</SummaryBlock>}
              </div>
            </>
          )}

          {/* nav buttons */}
          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost btn-lg">
                Orqaga
              </button>
            )}
            {step < 2 ? (
              <button onClick={next} className="btn-primary btn-lg flex-1">
                Davom etish
              </button>
            ) : (
              <button onClick={placeOrder} disabled={submitting} className="btn-primary btn-lg flex-1">
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Yuborilmoqda...
                  </>
                ) : (
                  "Buyurtmani yakunlash"
                )}
              </button>
            )}
          </div>
        </div>

        {/* order summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
            <h3 className="text-lg font-bold text-ink">Buyurtma tarkibi</h3>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <ProductImage emoji={item.emoji} gradient={item.gradient} className="h-12 w-12 shrink-0 rounded-xl" emojiClassName="text-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-[13px] font-semibold text-ink">{item.title}</p>
                    <p className="text-[12px] text-gray-400">{item.quantity} x {formatPrice(item.price)}</p>
                  </div>
                  <span className="text-[13px] font-bold text-ink">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2.5 border-t border-dashed border-gray-200 pt-4 text-[14px]">
              <div className="flex justify-between text-gray-500">
                <span>Mahsulotlar</span>
                <span className="font-semibold text-ink">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Yetkazib berish</span>
                <span className={cn("font-semibold", delivery === 0 ? "text-emerald-600" : "text-ink")}>
                  {delivery === 0 ? "Bepul" : formatPrice(delivery)}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-gray-200 pt-3">
                <span className="text-[15px] font-bold text-ink">Yakuniy summa</span>
                <span className="text-xl font-extrabold text-ink">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {error && <span className="ml-1 text-red-500">— majburiy</span>}
      </span>
      <div className={cn(error && "[&_.input]:border-red-400")}>{children}</div>
    </label>
  );
}

function SummaryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-canvas p-3.5">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-400">{title}</p>
      <p className="mt-1 font-medium text-ink">{children}</p>
    </div>
  );
}
