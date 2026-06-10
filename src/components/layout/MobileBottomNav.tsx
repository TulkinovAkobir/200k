"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { useStore } from "@/store/StoreProvider";

const items = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/catalog", label: "Katalog", icon: LayoutGrid },
  { href: "/search", label: "Qidiruv", icon: Search },
  { href: "/cart", label: "Savatcha", icon: ShoppingCart, cart: true },
  { href: "/profile", label: "Profil", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, hydrated } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-5">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition",
                active ? "text-brand-600" : "text-gray-400"
              )}
            >
              <span className="relative">
                <it.icon size={22} className={active ? "stroke-[2.4]" : ""} />
                {it.cart && hydrated && cartCount > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              {it.label}
              {active && <span className="absolute -top-px h-0.5 w-8 rounded-full bg-brand-600" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
