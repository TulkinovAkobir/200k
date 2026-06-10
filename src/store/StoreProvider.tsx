"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/lib/types";

interface Toast {
  id: number;
  message: string;
  tone: "success" | "info";
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  hydrated: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWished: (productId: string) => boolean;
  // quick order modal
  quickOrderProduct: Product | null;
  openQuickOrder: (product: Product) => void;
  closeQuickOrder: () => void;
  // toasts
  toasts: Toast[];
  toast: (message: string, tone?: "success" | "info") => void;
}

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "200k_cart";
const WISH_KEY = "200k_wishlist";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toast = useCallback((message: string, tone: "success" | "info" = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: qty,
            emoji: product.emoji,
            gradient: product.gradient,
            slug: product.slug,
          },
        ];
      });
      toast("Savatchaga qo‘shildi");
    },
    [toast]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        toast(has ? "Saqlanganlardan olib tashlandi" : "Saqlanganlarga qo‘shildi", "info");
        return has ? prev.filter((x) => x !== productId) : [...prev, productId];
      });
    },
    [toast]
  );

  const isWished = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const openQuickOrder = useCallback((product: Product) => setQuickOrderProduct(product), []);
  const closeQuickOrder = useCallback(() => setQuickOrderProduct(null), []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);

  const value: StoreState = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    hydrated,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    isWished,
    quickOrderProduct,
    openQuickOrder,
    closeQuickOrder,
    toasts,
    toast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
