import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "Ko‘p so‘raladigan savollar",
  description: "200k.uz — yetkazib berish, to‘lov va qaytarish bo‘yicha tez-tez beriladigan savollar.",
};

export default function FaqPage() {
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: "FAQ" }]} />
      <div className="mx-auto mt-6 max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Ko‘p so‘raladigan savollar</h1>
        <p className="mt-2 text-muted">Eng ko‘p beriladigan savollarga javoblar</p>
      </div>
      <div className="mt-8">
        <FaqAccordion />
      </div>
    </div>
  );
}
