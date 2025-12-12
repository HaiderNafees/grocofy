import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopularCategories } from "@/components/popular-categories";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-wide">New in store</h2>
          <Link href="#" className="text-sm font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <PopularCategories />
    </>
  );
}
