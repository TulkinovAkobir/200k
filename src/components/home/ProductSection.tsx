import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductSection({
  title,
  subtitle,
  products,
  href,
  ranked = false,
  icon,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
  ranked?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <section className="container-app py-8 sm:py-10">
      <SectionHeading title={title} subtitle={subtitle} href={href} icon={icon} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} rank={ranked ? i + 1 : undefined} />
        ))}
      </div>
    </section>
  );
}
