"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { Eye, ShoppingCart, Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };
  
  return (
    <Card className="group overflow-hidden relative border shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-[1/1] overflow-hidden">
          <Link href="#">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </Link>
          <Badge variant="secondary" className="absolute top-2 left-2 bg-green-600 text-white rounded-md">NEW</Badge>
          <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
             <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 bg-orange-400 hover:bg-orange-500">
                <Search className="h-4 w-4" />
             </Button>
             <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 bg-orange-400 hover:bg-orange-500" onClick={handleAddToCart}>
                <Plus className="h-4 w-4" />
             </Button>
          </div>
        </div>
        <div className="p-4 text-left">
          <h3 className="font-normal text-sm text-muted-foreground">{product.name}</h3>
          <p className="text-base font-semibold mt-1">Rs. {product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
