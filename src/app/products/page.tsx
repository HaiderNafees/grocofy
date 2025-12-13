
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { useProducts } from '@/hooks/use-products';
import { ProductDetail } from '@/components/product-detail';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const category = searchParams.get('category');
  const pageTitle = category ? `${category} Products` : 'All Products';
  const pageDescription = category 
    ? `Browse our collection of ${category.toLowerCase()} products.` 
    : 'Browse our full collection of products.';

  return (
    <>
      <div className="container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="mt-2 text-muted-foreground">
            {pageDescription}
          </p>
        </div>
        {loading ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-[1/1]" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                ))}
            </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                onView={() => handleProductView(product)}
                />
            ))}
            </div>
        )}
      </div>

      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="max-w-4xl p-0">
          {selectedProduct && <ProductDetail product={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
