'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/use-products';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { Minus, Plus, CheckCircle2, Share2, Twitter, Pin } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/lib/types';

export function ProductDetailClient({ productId }: { productId: string }) {
  const { addItem, clearCart } = useCart();
  const { products, loading } = useProducts();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState(product.packOptions?.[0] || { quantity: 1, price: product.price, label: 'Single' });
  const [product, setProduct] = useState(products.find((p) => p.id === productId));

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedPack(foundProduct.packOptions?.[0] || { quantity: 1, price: foundProduct.price, label: 'Single' });
    }
  }, [products, productId]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/products')}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      price: selectedPack.price,
      quantity: quantity * selectedPack.quantity
    };
    addItem(cartItem, 1);
  };

  const relatedProducts = products
    .filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">${selectedPack.price}</p>
          </div>

          <p className="text-gray-600">{product.description || 'No description available'}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Select Size/Option:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.packOptions?.map((option) => (
                  <Button
                    key={option.quantity}
                    variant={selectedPack.quantity === option.quantity ? 'default' : 'outline'}
                    onClick={() => setSelectedPack(option)}
                    disabled={option.stock === 0}
                  >
                    {option.label}
                    {option.stock === 0 && ' (Out of Stock)'}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              disabled={selectedPack.stock === 0}
              className="w-full"
            >
              {selectedPack.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Pin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedPack.stock > 0 && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>In Stock ({selectedPack.stock} available)</span>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
