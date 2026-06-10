import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app grid min-h-[60vh] place-items-center py-16">
      <div className="text-center">
        <p className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-[80px] font-extrabold leading-none text-transparent sm:text-[120px]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">Sahifa topilmadi</h1>
        <p className="mt-2 text-muted">Siz qidirayotgan sahifa mavjud emas yoki ko‘chirilgan.</p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/" className="btn-primary btn-lg">
            <Home size={18} /> Bosh sahifa
          </Link>
          <Link href="/catalog" className="btn-ghost btn-lg">
            <Search size={18} /> Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
