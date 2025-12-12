
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.soldOut) return;
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(onView) {
      onView(product);
    } else {
        // Fallback for pages where onView is not provided e.g. related products
        window.location.href = `/products/${product.id}`;
    }
  };
  
  return (
    <Card className="group overflow-hidden relative border-none shadow-none rounded-none transition-all duration-300">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
            <div className="relative aspect-[1/1] overflow-hidden bg-gray-100">
                <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.imageHint}
                />
                {product.isNew && (
                    <Badge variant="secondary" className="absolute bottom-2 left-2 bg-white text-black rounded-md text-xs">NEW</Badge>
                )}
                {product.soldOut && (
                    <Badge variant="secondary" className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black rounded-md text-xs">SOLD OUT</Badge>
                )}
                {!product.soldOut && (
                    <div className="absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-orange-400 hover:bg-orange-500" onClick={handleViewClick}>
                            <Search className="h-4 w-4" />
                        </Button>
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-orange-400 hover:bg-orange-500" onClick={handleAddToCart}>
                        <Plus className="h-4 w-4" />
                    </Button>
                    </div>
                )}
            </div>
        </Link>
        <div className="p-4 text-left">
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-sans text-base text-muted-foreground">{product.name}</h3>
          </Link>
          <p className="text-lg font-semibold mt-1">Rs. {product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
