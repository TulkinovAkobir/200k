import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoriesSection() {
  return (
    <section className="container-app py-8 sm:py-10">
      <SectionHeading
        title="Kategoriyalar"
        subtitle="Kerakli mahsulotlarni tez toping"
        href="/catalog"
      />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className="group relative w-36 shrink-0 overflow-hidden rounded-3xl bg-white p-4 shadow-card ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lift sm:w-auto"
          >
            <div
              className={`mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-2xl shadow-sm transition group-hover:scale-105 ${c.gradient}`}
            >
              {c.emoji}
            </div>
            <h3 className="text-[15px] font-bold text-ink">{c.name}</h3>
            <p className="mt-0.5 text-[12px] text-gray-400">{c.productsCount}+ mahsulot</p>
            <ArrowRight
              size={16}
              className="absolute right-4 top-5 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
