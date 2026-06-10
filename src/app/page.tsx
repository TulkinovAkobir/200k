import { Flame, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FlashSale } from "@/components/home/FlashSale";
import { ProductSection } from "@/components/home/ProductSection";
import { ValueSection } from "@/components/home/ValueSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { AppCta } from "@/components/home/AppCta";
import { FaqSection } from "@/components/home/FaqSection";
import { newProducts, popularProducts } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoriesSection />
      <FlashSale />
      <ProductSection
        title="Yangi kelgan mahsulotlar"
        subtitle="Eng so‘nggi qo‘shilgan va tez sotilayotgan mahsulotlar"
        products={newProducts}
        href="/catalog?sort=new"
        icon={<Sparkles size={24} className="text-accent-500" />}
      />
      <ProductSection
        title="Ommabop mahsulotlar"
        subtitle="Mijozlar eng ko‘p buyurtma qilayotgan mahsulotlar"
        products={popularProducts}
        href="/catalog?sort=popular"
        ranked
        icon={<Flame size={24} className="text-red-500" />}
      />
      <ValueSection />
      <HowItWorks />
      <Testimonials />
      <AppCta />
      <FaqSection />
    </>
  );
}
