import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/ui/ProductCard";
import { getCategoryBySlug, getProductBySlug, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Mahsulot topilmadi" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: { title: product.title, description: product.description.slice(0, 160) },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedProducts = related.length >= 2 ? related : fallback;

  return (
    <div className="container-app py-6 pb-28 lg:pb-6">
      <Breadcrumb
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: category?.name ?? "Katalog", href: category ? `/category/${category.slug}` : "/catalog" },
          { label: product.title },
        ]}
      />

      <div className="mt-5">
        <ProductDetail product={product} />
      </div>

      {/* related */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-ink">O‘xshash mahsulotlar</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            description: product.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "UZS",
              price: product.price,
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewsCount,
            },
          }),
        }}
      />
    </div>
  );
}
