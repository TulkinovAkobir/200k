import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: "Bosh sahifa", href: "/" }, { label: title }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-[13px] text-gray-400">Oxirgi yangilanish: {updated}</p>
        <div className="mt-6 space-y-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-gray-100 sm:p-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-bold text-ink">{s.heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
