"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { categories } from "@/lib/data";
import { contact } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useStore } from "@/store/StoreProvider";
import { Logo } from "./Logo";

const suggestions = ["Go‘zallik", "Uy-ro‘zg‘or", "Bolalar uchun", "Avto aksessuar", "Kitoblar", "Quloqchin"];

export function Header() {
  const router = useRouter();
  const { cartCount, wishlist, hydrated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const catsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (catsRef.current && !catsRef.current.contains(e.target as Node)) setCatsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submitSearch = (q: string) => {
    if (!q.trim()) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow",
          scrolled ? "border-gray-100 shadow-soft" : "border-transparent"
        )}
      >
        <div className="container-app flex h-16 items-center gap-3 lg:h-[72px]">
          {/* mobile menu btn */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menyu"
            className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Logo />

          {/* categories dropdown (desktop) */}
          <div ref={catsRef} className="relative hidden lg:block">
            <button
              onClick={() => setCatsOpen((v) => !v)}
              className="ml-2 flex h-11 items-center gap-2 rounded-2xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <LayoutGrid size={18} />
              Kategoriyalar
              <ChevronDown size={16} className={cn("transition", catsOpen && "rotate-180")} />
            </button>
            {catsOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-[560px] animate-scale-in rounded-3xl border border-gray-100 bg-white p-3 shadow-lift">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      onClick={() => setCatsOpen(false)}
                      className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-canvas"
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-lg",
                          c.gradient
                        )}
                      >
                        {c.emoji}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{c.name}</span>
                        <span className="block text-[12px] text-gray-400">{c.productsCount}+ mahsulot</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* search (desktop) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch(query);
            }}
            className="relative ml-2 hidden flex-1 lg:block"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot qidirish..."
              className="h-11 w-full rounded-2xl border border-gray-200 bg-canvas pl-11 pr-4 text-[15px] outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </form>

          {/* actions */}
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Qidirish"
              className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-gray-100 lg:hidden"
            >
              <Search size={21} />
            </button>

            <Link
              href="/profile"
              className="hidden flex-col items-center px-2.5 text-gray-600 hover:text-brand-600 lg:flex"
            >
              <User size={21} />
              <span className="mt-0.5 text-[11px] font-medium">Profil</span>
            </Link>

            <Link
              href="/profile?tab=orders"
              className="hidden flex-col items-center px-2.5 text-gray-600 hover:text-brand-600 lg:flex"
            >
              <Package size={21} />
              <span className="mt-0.5 text-[11px] font-medium">Buyurtmalar</span>
            </Link>

            <Link
              href="/profile?tab=wishlist"
              className="relative hidden flex-col items-center px-2.5 text-gray-600 hover:text-brand-600 lg:flex"
            >
              <Heart size={21} />
              <span className="mt-0.5 text-[11px] font-medium">Saqlangan</span>
              {hydrated && wishlist.length > 0 && (
                <span className="absolute right-1 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative ml-1 flex h-10 items-center gap-2 rounded-2xl bg-ink px-3 text-white transition hover:bg-gray-800 lg:px-4"
            >
              <span className="relative">
                <ShoppingCart size={20} />
                {hydrated && cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="hidden text-sm font-semibold lg:inline">Savatcha</span>
            </Link>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[84%] max-w-sm animate-[slide-up_0.25s] flex-col bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <Logo />
              <button onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-xl bg-gray-100 text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wide text-gray-400">Kategoriyalar</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl bg-canvas p-2.5"
                  >
                    <span className={cn("grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-base", c.gradient)}>
                      {c.emoji}
                    </span>
                    <span className="text-[13px] font-semibold text-ink">{c.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 space-y-1">
                {[
                  { href: "/catalog", label: "Barcha mahsulotlar", icon: LayoutGrid },
                  { href: "/profile", label: "Mening profilim", icon: User },
                  { href: "/profile?tab=orders", label: "Buyurtmalarim", icon: Package },
                  { href: "/profile?tab=wishlist", label: "Saqlangan", icon: Heart },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl p-3 text-[15px] font-semibold text-ink hover:bg-canvas"
                  >
                    <l.icon size={20} className="text-brand-600" />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <a
              href={`tel:${contact.phoneHref}`}
              className="flex items-center gap-3 border-t border-gray-100 p-4 text-[15px] font-semibold text-ink"
            >
              <Phone size={20} className="text-accent-500" />
              {contact.phone}
            </a>
          </div>
        </div>
      )}

      {/* mobile search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] bg-white lg:hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(query);
              }}
              className="relative flex-1"
            >
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Mahsulot qidirish..."
                className="h-11 w-full rounded-2xl border border-gray-200 bg-canvas pl-11 pr-4 text-[15px] outline-none focus:border-brand-500"
              />
            </form>
            <button onClick={() => setSearchOpen(false)} className="grid h-11 w-11 place-items-center rounded-xl text-gray-500">
              <X size={22} />
            </button>
          </div>
          <div className="p-4">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-gray-400">Ommabop qidiruvlar</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => submitSearch(s)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-300 hover:text-brand-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
