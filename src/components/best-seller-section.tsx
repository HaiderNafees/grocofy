import { ProductCard } from "@/components/product-card";
import { bestSellers } from "@/lib/data";
import type { Product } from "@/lib/types";
import Link from "next/link";

interface BestSellerSectionProps {
  onViewProduct: (product: Product) => void;
}

export function BestSellerSection({ onViewProduct }: BestSellerSectionProps) {
  return (
    <section className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold tracking-wide">Best Seller</h2>
        <Link href="#" className="text-sm font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} onView={onViewProduct} />
        ))}
      </div>
    </section>
  );
}