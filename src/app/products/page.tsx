'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { useProducts } from '@/hooks/use-products';
import { ProductDetail } from '@/components/product-detail';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-static';

function ProductsContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let filtered = products;
    
    // Filter by category if specified
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search query if specified
    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, products]);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let pageTitle = 'All Products';
  let pageDescription = 'Browse our full collection of products.';
  
  if (search && search.trim()) {
    pageTitle = `Search Results for "${search.trim()}"`;
    pageDescription = `Found ${filteredProducts.length} results for "${search.trim()}".`;
  } else if (category) {
    pageTitle = `${category} Products`;
    pageDescription = `Browse our collection of ${category.toLowerCase()} products.`;
  }

  return (
    <>
      <div className="container py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-serif">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {search && search.trim() 
                ? `No products found for "${search.trim()}". Try a different search term.`
                : 'No products found in this category.'
              }
            </p>
          </div>
        ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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

      <Dialog open={!!selectedProduct} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedProduct?.name || 'Product Details'}
          </DialogTitle>
          {selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense fallback={
      <div className="container py-12">
        <div className="flex justify-between items-center mb-10">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
