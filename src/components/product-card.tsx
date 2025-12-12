"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    // As per instruction, toast is for errors only.
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // });
  };
  
  return (
    <Card className="group overflow-hidden border-none shadow-none rounded-lg transition-all duration-300 hover:shadow-lg">
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
          <div className="absolute bottom-2 left-2 right-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
             <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
        <div className="p-4 bg-card">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
