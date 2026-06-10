"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Phone, X, Zap } from "lucide-react";
import { useStore } from "@/store/StoreProvider";
import { formatPrice } from "@/lib/data";
import { regions } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { ProductImage } from "./ui/ProductImage";

type PayMethod = "Click" | "Payme" | "Naqd";

export function QuickOrderModal() {
  const { quickOrderProduct, closeQuickOrder } = useStore();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [qty, setQty] = useState(1);
  const [pay, setPay] = useState<PayMethod>("Naqd");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const product = quickOrderProduct;

  useEffect(() => {
    if (product) {
      setDone(false);
      setSubmitting(false);
      setQty(1);
      setPay("Naqd");
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, boolean> = {};
    if (!String(data.get("name") || "").trim()) next.name = true;
    if (!String(data.get("phone") || "").trim()) next.phone = true;
    if (!String(data.get("region") || "")) next.region = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    // mock API call — replace with real endpoint later
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      {/* overlay */}
      <div
        className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm"
        onClick={closeQuickOrder}
      />

      {/* sheet / modal */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-lg animate-slide-up overflow-y-auto rounded-t-3xl bg-white shadow-lift sm:animate-scale-in sm:rounded-3xl">
        <button
          onClick={closeQuickOrder}
          aria-label="Yopish"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
              <CheckCircle2 size={44} className="text-emerald-500" />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-ink">Buyurtmangiz qabul qilindi!</h3>
            <p className="mt-2 max-w-xs text-[15px] text-muted">
              Operatorimiz tez orada siz bilan bog‘lanadi va buyurtmani tasdiqlaydi.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              <button onClick={closeQuickOrder} className="btn-primary btn-lg w-full">
                Yaxshi, rahmat
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 pb-6 pt-6 sm:px-6">
            <div className="mb-1 flex items-center gap-2 text-accent-500">
              <Zap size={18} className="fill-accent-500" />
              <span className="text-[13px] font-bold uppercase tracking-wide">Tez buyurtma</span>
            </div>
            <h3 className="text-xl font-extrabold text-ink">Tez buyurtma berish</h3>
            <p className="mt-1 text-[14px] text-muted">
              Ma’lumotlaringizni qoldiring, operatorimiz siz bilan tez orada bog‘lanadi.
            </p>

            {/* product summary */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas p-3">
              <ProductImage
                emoji={product.emoji}
                gradient={product.gradient}
                className="h-14 w-14 shrink-0 rounded-xl"
                emojiClassName="text-2xl"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[14px] font-semibold text-ink">{product.title}</p>
                <p className="text-[15px] font-extrabold text-brand-600">
                  {formatPrice(product.price * qty)}
                </p>
              </div>
              <QtyStepper value={qty} onChange={setQty} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Ism" error={errors.name}>
                <input name="name" placeholder="Ismingiz" className="input" />
              </Field>
              <Field label="Telefon raqam" error={errors.phone}>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="phone"
                    inputMode="tel"
                    placeholder="+998 90 123 45 67"
                    className="input pl-10"
                  />
                </div>
              </Field>
              <Field label="Viloyat" error={errors.region}>
                <select name="region" className="input" defaultValue="">
                  <option value="" disabled>
                    Tanlang
                  </option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tuman / shahar">
                <input name="district" placeholder="Tuman" className="input" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Manzil">
                  <input name="address" placeholder="Ko‘cha, uy, kvartira" className="input" />
                </Field>
              </div>
            </div>

            {/* payment */}
            <div className="mt-4">
              <span className="label">To‘lov turi</span>
              <div className="grid grid-cols-3 gap-2">
                {(["Click", "Payme", "Naqd"] as PayMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPay(m)}
                    className={cn(
                      "h-11 rounded-2xl border text-sm font-semibold transition",
                      pay === m
                        ? "border-brand-600 bg-brand-50 text-brand-600 ring-2 ring-brand-500/15"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Field label="Izoh">
                <input name="note" placeholder="Qo‘shimcha izoh (ixtiyoriy)" className="input" />
              </Field>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary btn-lg mt-5 w-full">
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                "Buyurtmani tasdiqlash"
              )}
            </button>
            <p className="mt-3 text-center text-[12px] text-gray-400">
              Tugmani bosish orqali siz bilan bog‘lanishimizga rozilik bildirasiz
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {error && <span className="ml-1 text-red-500">— majburiy</span>}
      </span>
      <div className={cn(error && "[&_.input]:border-red-400 [&_.input]:ring-red-400/10")}>
        {children}
      </div>
    </label>
  );
}

function QtyStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex shrink-0 items-center rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-9 w-9 place-items-center text-lg font-semibold text-gray-500 hover:text-brand-600"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-bold">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center text-lg font-semibold text-gray-500 hover:text-brand-600"
      >
        +
      </button>
    </div>
  );
}
