"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";

export function CartSheet({ children }: { children: ReactNode }) {
  const { items, itemCount, totalPrice, updateItemQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span>Shopping Cart ({itemCount})</span>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                       <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                          <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          >
                              <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                              <Plus className="h-4 w-4" />
                          </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
                <Button size="lg" className="w-full rounded-none uppercase tracking-wider">
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <SheetTrigger asChild>
                <Link href="/" className="mt-4">
                    <Button variant="outline" className="rounded-none">Continue Shopping</Button>
                </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
