const steps = [
  { n: 1, title: "Mahsulotni tanlang", text: "Katalogdan kerakli mahsulotni toping" },
  { n: 2, title: "Tez buyurtma bosing", text: "“Tez buyurtma” tugmasini bosing" },
  { n: 3, title: "Raqamingizni qoldiring", text: "Telefon raqamingizni kiriting" },
  { n: 4, title: "Operator bog‘lanadi", text: "Operatorimiz buyurtmani tasdiqlaydi" },
  { n: 5, title: "Mahsulotni qabul qiling", text: "Tez orada qo‘lingizda bo‘ladi" },
];

export function HowItWorks() {
  return (
    <section className="container-app py-8 sm:py-12">
      <div className="mb-8 text-center">
        <h2 className="section-title">Buyurtma berish juda oson</h2>
        <p className="section-sub">Atigi 5 ta qadamda mahsulotni qo‘lingizga oling</p>
      </div>

      <div className="relative">
        {/* connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-200 via-violet-200 to-accent-200 lg:block" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {steps.map((s) => (
            <div key={s.n} className="relative flex gap-4 lg:flex-col lg:gap-0">
              <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-500 text-xl font-extrabold text-white shadow-lift lg:mx-auto">
                {s.n}
              </div>
              <div className="lg:mt-4 lg:text-center">
                <h3 className="text-[15px] font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
