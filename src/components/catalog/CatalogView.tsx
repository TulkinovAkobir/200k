"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { categories, discountPercent } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/cn";

type Sort = "popular" | "new" | "cheap" | "expensive" | "discount";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "popular", label: "Ommabop" },
  { value: "new", label: "Yangi" },
  { value: "cheap", label: "Arzon" },
  { value: "expensive", label: "Qimmat" },
  { value: "discount", label: "Chegirmadagi" },
];

const PRICE_MAX = 400000;

export function CatalogView({
  products,
  initialSort = "popular",
  lockCategory,
  initialQuery = "",
}: {
  products: Product[];
  initialSort?: Sort;
  lockCategory?: string;
  initialQuery?: string;
}) {
  const [sort, setSort] = useState<Sort>(initialSort);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [onlyDiscount, setOnlyDiscount] = useState(initialSort === "discount");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (!lockCategory && selectedCats.length) {
      list = list.filter((p) => selectedCats.includes(p.category));
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (onlyDiscount) list = list.filter((p) => !!p.oldPrice);

    switch (sort) {
      case "new":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.ordersCount - a.ordersCount);
        break;
      case "cheap":
        list.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        list.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list.sort((a, b) => discountPercent(b) - discountPercent(a));
        break;
      default:
        list.sort((a, b) => b.ordersCount - a.ordersCount);
    }
    return list;
  }, [products, query, selectedCats, maxPrice, onlyDiscount, sort, lockCategory]);

  const toggleCat = (slug: string) =>
    setSelectedCats((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const resetFilters = () => {
    setSelectedCats([]);
    setMaxPrice(PRICE_MAX);
    setOnlyDiscount(false);
  };

  const FiltersBody = (
    <div className="space-y-6">
      {!lockCategory && (
        <div>
          <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-gray-500">Kategoriya</h4>
          <div className="space-y-1.5">
            {categories.map((c) => (
              <label key={c.id} className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-canvas">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(c.slug)}
                  onChange={() => toggleCat(c.slug)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-[14px] text-gray-700">{c.name}</span>
                <span className="ml-auto text-[12px] text-gray-300">{c.productsCount}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-gray-500">Narx oralig‘i</h4>
        <input
          type="range"
          min={9000}
          max={PRICE_MAX}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="mt-2 flex justify-between text-[13px] text-gray-500">
          <span>9 000 so‘m</span>
          <span className="font-semibold text-ink">{maxPrice.toLocaleString("ru-RU")} so‘m</span>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={onlyDiscount}
          onChange={(e) => setOnlyDiscount(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
        />
        <span className="text-[14px] font-medium text-gray-700">Faqat chegirmadagilar</span>
      </label>

      <button onClick={resetFilters} className="text-[13px] font-semibold text-brand-600 hover:underline">
        Filtrlarni tozalash
      </button>
    </div>
  );

  return (
    <div className="container-app py-6">
      {/* search + sort bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Mahsulot qidirish..."
          className="input sm:max-w-xs"
        />
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setSort(o.value)}
              className={cn(
                "h-10 shrink-0 rounded-xl px-3.5 text-[13px] font-semibold transition",
                sort === o.value
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand-300"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="ml-auto flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-[13px] font-semibold text-ink ring-1 ring-gray-200 lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filtr
        </button>
      </div>

      <div className="flex gap-6">
        {/* sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-3xl bg-white p-5 shadow-card ring-1 ring-gray-100">
            <h3 className="mb-4 text-[15px] font-bold text-ink">Filtrlar</h3>
            {FiltersBody}
          </div>
        </aside>

        {/* grid */}
        <div className="flex-1">
          <p className="mb-4 text-[13px] text-gray-400">{filtered.length} ta mahsulot topildi</p>
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl bg-white py-20 text-center shadow-card ring-1 ring-gray-100">
              <div className="text-5xl">🔍</div>
              <p className="mt-4 text-lg font-bold text-ink">Hech narsa topilmadi</p>
              <p className="mt-1 text-sm text-muted">Filtrlarni o‘zgartirib ko‘ring</p>
              <button onClick={resetFilters} className="btn-ghost btn-md mt-5">
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter bottom sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-slide-up overflow-y-auto rounded-t-3xl bg-white p-5 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Filtrlar</h3>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-xl bg-gray-100 text-gray-500">
                <X size={18} />
              </button>
            </div>
            {FiltersBody}
            <button onClick={() => setFiltersOpen(false)} className="btn-primary btn-lg mt-6 w-full">
              {filtered.length} ta mahsulotni ko‘rish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
