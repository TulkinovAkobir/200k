import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Foydalanish shartlari" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Foydalanish shartlari"
      updated="2026-yil"
      sections={[
        {
          heading: "Shartlarni qabul qilish",
          body: "200k.uz saytidan foydalanish orqali siz ushbu foydalanish shartlariga rozilik bildirasiz. Agar shartlarga rozi bo‘lmasangiz, saytdan foydalanmang.",
        },
        {
          heading: "Buyurtma berish",
          body: "Buyurtma berganingizdan so‘ng operatorimiz siz bilan bog‘lanib, ma’lumotlarni tasdiqlaydi. Buyurtma tasdiqlangandan so‘ng jo‘natiladi.",
        },
        {
          heading: "Narxlar va to‘lov",
          body: "Saytdagi narxlar so‘mda ko‘rsatilgan. To‘lov Click, Payme yoki naqd usulda amalga oshiriladi. Narxlar oldindan ogohlantirishsiz o‘zgartirilishi mumkin.",
        },
        {
          heading: "Qaytarish",
          body: "Qaytarish shartlari mahsulot turiga qarab belgilanadi. Batafsil ma’lumot uchun operator bilan bog‘laning.",
        },
        {
          heading: "Mas’uliyat",
          body: "200k.uz mahsulotlarning sifatli yetkazilishi uchun mas’uldir. Foydalanuvchi tomonidan taqdim etilgan noto‘g‘ri ma’lumotlar uchun sayt javobgar emas.",
        },
      ]}
    />
  );
}
