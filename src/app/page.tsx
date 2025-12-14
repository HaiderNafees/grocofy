
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

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="w-full h-96 bg-gray-200 animate-pulse" />
        <div className="container py-12">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      fallback={
        <div className="p-4 text-center">
          <p className="text-red-500">Something went wrong. Please refresh the page.</p>
        </div>
      }
    >
      <>
        <NoSSR 
          fallback={<div className="w-full h-96 bg-gray-200 animate-pulse" />}
        >
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              ))}
            </div>
        ) : (
          <>
            {/* Mobile horizontal scroll */}
            <div className="lg:hidden -mx-4">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-3 px-4">
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

            {/* Desktop 5x2 grid */}
            <div className="hidden lg:grid grid-cols-5 gap-4 md:gap-6">
              {newInStoreProducts.map((product) => (
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
