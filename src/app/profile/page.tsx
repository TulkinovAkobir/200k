import { Suspense } from "react";
import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "Mening profilim",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="container-app py-16 text-center text-muted">Yuklanmoqda...</div>}>
      <ProfileView />
    </Suspense>
  );
}
