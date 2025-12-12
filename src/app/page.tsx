"use client";

import { useState } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import Link from "next/link";
import { PopularCategories } from "@/components/popular-categories";
import { PromoSection } from "@/components/promo-section";
import { FeaturedBrands } from "@/components/featured-brands";
import { AboutUsSection } from "@/components/about-us-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ProductDetail } from "@/components/product-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Product } from "@/lib/types";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

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
          {products.slice(0, 5).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onView={() => handleProductView(product)}
            />
          ))}
        </div>
      </div>
      <PopularCategories />
      <PromoSection />
      <FeaturedBrands />
      <AboutUsSection />
      <NewsletterSignup />

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="max-w-md p-0">
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
