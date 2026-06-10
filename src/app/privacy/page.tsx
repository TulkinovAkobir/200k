import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Maxfiylik siyosati" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Maxfiylik siyosati"
      updated="2026-yil"
      sections={[
        {
          heading: "Umumiy qoidalar",
          body: "200k.uz foydalanuvchilarning shaxsiy ma’lumotlari maxfiyligini ta’minlashga jiddiy yondashadi. Ushbu siyosat qanday ma’lumotlar to‘planishi va ulardan qanday foydalanilishini tushuntiradi.",
        },
        {
          heading: "Qanday ma’lumotlar to‘planadi",
          body: "Buyurtma berishda siz taqdim etgan ism, telefon raqam va yetkazib berish manzili to‘planadi. Bu ma’lumotlar faqat buyurtmani bajarish va siz bilan bog‘lanish uchun ishlatiladi.",
        },
        {
          heading: "Ma’lumotlardan foydalanish",
          body: "Sizning ma’lumotlaringiz uchinchi shaxslarga sotilmaydi. Ular faqat buyurtmani qayta ishlash, yetkazib berish va mijozlarga xizmat ko‘rsatish maqsadida ishlatiladi.",
        },
        {
          heading: "Xavfsizlik",
          body: "Biz sizning ma’lumotlaringizni ruxsatsiz kirishdan himoya qilish uchun zamonaviy texnik va tashkiliy choralarni qo‘llaymiz.",
        },
        {
          heading: "Bog‘lanish",
          body: "Maxfiylik bo‘yicha savollaringiz bo‘lsa, call-center yoki Telegram orqali biz bilan bog‘lanishingiz mumkin.",
        },
      ]}
    />
  );
}
