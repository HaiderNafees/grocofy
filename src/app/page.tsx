
"use client";

import { useState, useEffect } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { useProducts } from '@/hooks/use-products';
import Link from "next/link";
import { PopularCategories } from "@/components/popular-categories";
import { PromoSection } from "@/components/promo-section";
import { FeaturedBrands } from "@/components/featured-brands";
import { AboutUsSection } from "@/components/about-us-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ProductDetail } from "@/components/product-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Product } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import { NoSSR } from "@/components/no-ssr";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { products, loading } = useProducts();
  const newInStoreProducts = products.filter((p: Product) => p.isNew).slice(0, 10);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  return (
    <ErrorBoundary fallback={
      <div className="p-4 text-center">
        <p className="text-red-500">Something went wrong. Please refresh the page.</p>
      </div>
    }>
      <>
        <NoSSR fallback={<div className="w-full h-96 bg-gray-200 animate-pulse" />}>
          <HeroCarousel />
        </NoSSR>
        <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-wide">New in store</h2>
          <Link href="/products" className="text-sm font-medium hover:underline">
            View all
          </Link>
        </div>
        
        {loading ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[1/1]" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ))}
            </div>
        ) : (
          <>
            {/* Mobile horizontal scroll */}
            <div className="lg:hidden -mx-4">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 px-4">
                  {newInStoreProducts.map((product) => (
                    <div key={product.id} className="w-40 flex-shrink-0">
                      <ProductCard
                        product={product}
                        onView={() => handleProductView(product)}
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Desktop grid */}
            <div className="hidden lg:grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {newInStoreProducts.slice(0, 5).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={() => handleProductView(product)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <PopularCategories />
      <PromoSection />
      <FeaturedBrands />
      <AboutUsSection />
      <NewsletterSignup />

      <NoSSR fallback={null}>
        <>
          <Dialog open={!!selectedProduct} onOpenChange={(open: boolean) => !open && handleCloseDialog()}>
            <DialogContent className="max-w-4xl p-0">
              {selectedProduct && <ProductDetail product={selectedProduct} />}
            </DialogContent>
          </Dialog>
        </>
      </NoSSR>
      </>
    </ErrorBoundary>
  );
}
