import { FaqAccordion } from "@/components/ui/FaqAccordion";

export function FaqSection() {
  return (
    <section className="container-app py-8 sm:py-12">
      <div className="mb-8 text-center">
        <h2 className="section-title">Ko‘p so‘raladigan savollar</h2>
        <p className="section-sub">Eng ko‘p beriladigan savollarga javoblar</p>
      </div>
      <FaqAccordion />
    </section>
  );
}
