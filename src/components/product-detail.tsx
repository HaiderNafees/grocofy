"use client";

import type { Product } from "@/lib/types";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, CheckCircle2, Share2, Twitter, Pin } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface ProductDetailProps {
    product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (product.soldOut) return;
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
    };
    
    return (
        <div className="grid md:grid-cols-2 gap-12 items-start p-8">
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
          <p className="text-2xl font-semibold">Rs. {product.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground mt-1">Tax included.</p>

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
            <Button size="lg" className="w-full md:w-auto rounded-none uppercase tracking-wider py-6 bg-orange-500 hover:bg-orange-600">
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
    );
}
