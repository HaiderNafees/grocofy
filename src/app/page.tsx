import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">New In</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
