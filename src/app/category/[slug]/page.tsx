import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogView } from "@/components/catalog/CatalogView";
import { categories, getCategoryBySlug, products } from "@/lib/data";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Kategoriya" };
  return {
    title: `${category.name} — mahsulotlar`,
    description: `${category.name} bo‘yicha eng yaxshi mahsulotlar 200k.uz’da.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const inCategory = products.filter((p) => p.category === category.slug);

  return (
    <div>
      <div className="container-app pt-6">
        <Breadcrumb
          items={[{ label: "Bosh sahifa", href: "/" }, { label: "Katalog", href: "/catalog" }, { label: category.name }]}
        />
        <div className="mt-4 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
          <span className={cn("grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-3xl shadow-sm", category.gradient)}>
            {category.emoji}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{category.name}</h1>
            <p className="mt-0.5 text-muted">{category.productsCount}+ mahsulot mavjud</p>
          </div>
        </div>
      </div>

      {inCategory.length > 0 ? (
        <CatalogView products={inCategory} lockCategory={category.slug} />
      ) : (
        <div className="container-app py-16">
          <div className="grid place-items-center rounded-3xl bg-white py-20 text-center shadow-card ring-1 ring-gray-100">
            <div className="text-5xl">{category.emoji}</div>
            <p className="mt-4 text-lg font-bold text-ink">Bu kategoriyada mahsulotlar tez orada qo‘shiladi</p>
            <p className="mt-1 text-sm text-muted">Boshqa kategoriyalarni ko‘rib chiqing</p>
          </div>
        </div>
      )}
    </div>
  );
}
