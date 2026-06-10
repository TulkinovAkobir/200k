export type Badge =
  | "Yangi"
  | "Top"
  | "Chegirma"
  | "Hot"
  | "Ko‘p sotilgan"
  | "Bugun trendda";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string; // category slug
  price: number;
  oldPrice?: number;
  emoji: string;
  gradient: string; // tailwind gradient classes for placeholder
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  badges: Badge[];
  description: string;
  specifications: Spec[];
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  productsCount: number;
  gradient: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  emoji: string;
  gradient: string;
  slug: string;
}

export type OrderStatus =
  | "Yangi"
  | "Operator bog‘landi"
  | "Yetkazilmoqda"
  | "Yetkazildi"
  | "Bekor qilindi";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
  items: { title: string; emoji: string; gradient: string }[];
}

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
}
