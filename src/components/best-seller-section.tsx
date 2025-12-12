import { ProductCard } from "@/components/product-card";
import { bestSellers } from "@/lib/data";
import Link from "next/link";

export function BestSellerSection() {
  return (
    <section className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold tracking-wide">Best Seller</h2>
        <Link href="#" className="text-sm font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
