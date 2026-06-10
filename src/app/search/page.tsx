import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogView } from "@/components/catalog/CatalogView";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Qidiruv natijalari",
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";

  return (
    <div>
      <div className="container-app pt-6">
        <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: "Qidiruv" }]} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
          {q ? <>“{q}” bo‘yicha natijalar</> : "Qidiruv"}
        </h1>
        <p className="mt-1 text-muted">Mahsulot nomini kiriting yoki filtrlardan foydalaning</p>
      </div>
      <CatalogView products={products} initialQuery={q} />
    </div>
  );
}
