"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Eye, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
  };
  
  return (
    <Card className="group overflow-hidden relative border-none shadow-none rounded-none transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Link href="#">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </Link>
          <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
             <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                <Eye className="h-4 w-4" />
             </Button>
             <Button size="icon" variant="secondary" className="rounded-full h-10 w-10" onClick={handleAddToCart}>
                <ShoppingBag className="h-4 w-4" />
             </Button>
          </div>
        </div>
        <div className="p-4 text-center bg-card">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <p className="text-sm font-semibold mt-1">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
