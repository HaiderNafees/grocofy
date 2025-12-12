import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="container py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-wide uppercase">New Arrivals</h2>
          <p className="text-muted-foreground mt-2">Browse the new collection to stay on trend</p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">View All</Button>
        </div>
      </div>
    </>
  );
}
