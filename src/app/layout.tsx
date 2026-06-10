import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { QuickOrderModal } from "@/components/QuickOrderModal";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://200k.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "200k.uz — O‘zbekistonda trend mahsulotlar online do‘koni",
    template: "%s — 200k.uz",
  },
  description:
    "200k.uz orqali ommabop mahsulotlarni qulay narxlarda buyurtma qiling. Tez yetkazib berish, Click, Payme va naqd to‘lov imkoniyati.",
  keywords: ["200k", "online do‘kon", "marketplace", "O‘zbekiston", "tez buyurtma", "chegirma"],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    siteName: "200k.uz",
    title: "200k.uz — O‘zbekistonda trend mahsulotlar online do‘koni",
    description:
      "Ommabop mahsulotlarni qulay narxlarda buyurtma qiling. Tez yetkazib berish, Click, Payme va naqd to‘lov.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1238FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className="min-h-screen">
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main className="pb-20 lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <QuickOrderModal />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
