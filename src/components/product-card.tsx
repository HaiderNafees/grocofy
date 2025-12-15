
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
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

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
        router.push(`/products/${product.id}`);
    }
  };
  
  return (
    <Card className="group overflow-hidden relative border border-gray-200 shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                data-ai-hint={product.imageHint}
                />
                {product.isNew && (
                    <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white text-black rounded-md text-xs font-semibold px-2 py-1 shadow-sm">NEW</Badge>
                )}
                {product.soldOut && (
                    <Badge variant="secondary" className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black rounded-md text-xs font-semibold px-2 py-1 shadow-sm">SOLD OUT</Badge>
                )}
                {!product.soldOut && (
                    <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-orange-400 hover:bg-orange-500 shadow-sm" onClick={handleViewClick}>
                            <Search className="h-4 w-4" />
                        </Button>
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-orange-400 hover:bg-orange-500 shadow-sm" onClick={handleAddToCart}>
                        <Plus className="h-4 w-4" />
                    </Button>
                    </div>
                )}
            </div>
        </Link>
        <div className="p-4 text-left space-y-2">
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-sans text-sm text-gray-700 line-clamp-2 leading-tight">{product.name}</h3>
          </Link>
          <p className="text-base font-bold text-gray-900">Rs. {product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
