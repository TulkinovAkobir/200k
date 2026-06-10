import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogView } from "@/components/catalog/CatalogView";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mahsulotlar katalogi",
  description: "200k.uz katalogidagi barcha trend va ommabop mahsulotlar.",
};

type Sort = "popular" | "new" | "cheap" | "expensive" | "discount";

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const sortParam = (searchParams.sort ?? "popular") as Sort;
  const valid: Sort[] = ["popular", "new", "cheap", "expensive", "discount"];
  const initialSort = valid.includes(sortParam) ? sortParam : "popular";

  return (
    <div>
      <div className="container-app pt-6">
        <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: "Katalog" }]} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Barcha mahsulotlar</h1>
        <p className="mt-1 text-muted">Trend, ommabop va chegirmadagi mahsulotlar bir joyda</p>
      </div>
      <CatalogView products={products} initialSort={initialSort} />
    </div>
  );
}
