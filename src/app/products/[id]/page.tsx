
'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/use-products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { Minus, Plus, CheckCircle2, Share2, Twitter, Pin } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { addItem, clearCart } = useCart();
  const { products, loading } = useProducts();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState(0);
  const [product, setProduct] = useState(products.find((p) => p.id === resolvedParams.id));

  useEffect(() => {
    if(!loading) {
      const foundProduct = products.find((p) => p.id === resolvedParams.id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        notFound();
      }
    }
  }, [resolvedParams.id, products, loading]);


  if (loading || !product) {
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
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  const currentPrice = product.packOptions ? product.packOptions[selectedPack].price : product.price;
  const currentQuantity = product.packOptions ? product.packOptions[selectedPack].quantity : quantity;

  const handleAddToCart = () => {
    if (product.soldOut) return;
    const productToAdd = {
      ...product,
      price: currentPrice,
      packLabel: product.packOptions ? product.packOptions[selectedPack].label : undefined
    };
    addItem(productToAdd, currentQuantity);
    if (!product.packOptions) {
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (product.soldOut) return;
    // Clear cart first to ensure only this product goes to checkout
    clearCart();
    const productToAdd = {
      ...product,
      price: currentPrice,
      packLabel: product.packOptions ? product.packOptions[selectedPack].label : undefined
    };
    // Add the product to cart
    addItem(productToAdd, currentQuantity);
    // Redirect to checkout page
    router.push('/checkout');
  };

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square bg-gray-100 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            data-ai-hint={product.imageHint}
          />
           {product.isNew && (
            <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 rounded-md text-xs font-semibold">NEW</div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          
          <p className='mt-4 font-semibold'>Price</p>
          <p className="text-2xl font-semibold">Rs. {currentPrice.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">Tax included.</p>

          {product.packOptions && (
            <div className="mt-6">
              <p className="font-medium mb-2">Pack Options</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.packOptions.map((pack, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPack(index)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedPack === index
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{pack.label}</div>
                    <div className="text-sm text-muted-foreground">Rs. {pack.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!product.packOptions && (
            <div className="mt-6">
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-2">
                  <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                      <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-16 flex items-center justify-center border border-input">
                    {quantity}
                  </div>
                  <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => setQuantity(q => q + 1)}
                  >
                      <Plus className="h-4 w-4" />
                  </Button>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex flex-col gap-4">
            <Button 
                size="lg" 
                variant="outline"
                className="w-full md:w-auto rounded-none uppercase tracking-wider py-6"
                onClick={handleAddToCart}
                disabled={product.soldOut}
              >
              Add to Cart
            </Button>
            <Button 
                size="lg" 
                className="w-full md:w-auto rounded-none uppercase tracking-wider py-6 bg-orange-500 hover:bg-orange-600"
                onClick={handleBuyNow}
                disabled={product.soldOut}
              >
              Buy it now
            </Button>
          </div>

          {product.soldOut && (
            <div className="mt-4 text-destructive font-semibold">
                This product is currently sold out.
            </div>
           )}

            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5"/>
                <div>
                    <p className="text-foreground font-medium">Pickup available at Grocofy, F-6 Supermarket, Islamabad.</p>
                    <p>Usually ready in 4 hours</p>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Twitter className="mr-2 h-4 w-4" /> Tweet
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Pin className="mr-2 h-4 w-4" /> Pin it
                </Button>
            </div>
        </div>
      </div>

        {relatedProducts.length > 0 && (
            <div className="mt-24">
                <h2 className="text-2xl font-semibold tracking-wide mb-8">You might also like</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}
