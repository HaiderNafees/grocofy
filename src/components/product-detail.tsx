
"use client";

import type { Product } from "@/lib/types";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus, CheckCircle2, Share2, Twitter, Pin } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
    product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addItem } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [selectedPack, setSelectedPack] = useState(product.packOptions?.[0] || { quantity: 1, price: product.price, label: 'Single' });

    const handleAddToCart = () => {
        if (product.soldOut) return;
        const cartItem = {
            ...product,
            price: selectedPack.price,
            quantity: quantity * selectedPack.quantity
        };
        addItem(cartItem, 1);
        toast({
            title: "Added to cart",
            description: `${quantity} x ${selectedPack.label} ${product.name} has been added to your cart.`,
        });
        setQuantity(1);
    };
    
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8 xl:gap-12 items-start p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                data-ai-hint={product.imageHint}
            />
            {product.isNew && (
                <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-md text-xs font-semibold">NEW</div>
            )}
            </div>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{product.name}</h1>
                <div className="mt-2 sm:mt-4">
                    <p className='font-semibold text-sm sm:text-base'>Price</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold">Rs. {selectedPack.price.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tax included.</p>
                </div>
            </div>

            <div className="space-y-2">
                <p className="font-medium text-sm sm:text-base">Select Size/Option</p>
                <div className="flex flex-wrap gap-2">
                    {product.packOptions?.map((option) => (
                        <Button 
                            key={option.quantity}
                            variant={selectedPack.quantity === option.quantity ? "default" : "outline"} 
                            size="sm" 
                            className="text-xs"
                            onClick={() => setSelectedPack(option)}
                        >
                            {option.label}
                        </Button>
                    )) || (
                        <>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => setQuantity(3)}
                            >
                                Pack of 3
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => setQuantity(6)}
                            >
                                Pack of 6
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => setQuantity(12)}
                            >
                                Pack of 12
                            </Button>
                        </>
                    )}
                </div>
            </div>
            
            <div className="space-y-2">
                <p className="font-medium text-sm sm:text-base">Quantity</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-none"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <div className="h-8 w-12 sm:h-10 sm:w-16 lg:h-12 lg:w-20 flex items-center justify-center border border-input text-sm sm:text-base">
                    {quantity}
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-none"
                        onClick={() => setQuantity(q => q + 1)}>
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                </div>
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                <Button size="lg" variant="outline" className="w-full rounded-none uppercase tracking-wider py-3 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-base"
                    onClick={handleAddToCart} disabled={product.soldOut}>
                Add to Cart
                </Button>
                <Button size="lg" className="w-full rounded-none uppercase tracking-wider py-3 sm:py-4 lg:py-6 bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm lg:text-base">
                Buy it now
                </Button>
            </div>

            {product.soldOut && (
                <div className="text-destructive font-semibold text-xs sm:text-sm">
                    This product is currently sold out.
                </div>
            )}

            <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-500 mt-0.5"/>
                <div>
                    <p className="text-foreground font-medium">Pickup available at Grocofy, F-6 Supermarket, Islamabad.</p>
                    <p>Usually ready in 4 hours</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                    <Share2 className="mr-1 h-3 w-3 sm:mr-2" /> Share
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                    <Twitter className="mr-1 h-3 w-3 sm:mr-2" /> Tweet
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                    <Pin className="mr-1 h-3 w-3 sm:mr-2" /> Pin it
                </Button>
            </div>
            </div>
      </div>
    );
}
