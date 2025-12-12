"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from './cart-sheet';
import { Input } from '@/components/ui/input';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '#', label: 'SHOP' },
  { href: '#', label: 'ABOUT US' },
  { href: '#', label: 'CONTACT US' },
  { href: '#', label: 'TRACK YOUR ORDER' },
];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile and Tablet */}
        <div className="flex items-center gap-2 lg:hidden">
            <Link href="/">
                <Logo />
                <span className="sr-only">SHAMS Home</span>
            </Link>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
             <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
            </Button>
             <CartSheet>
                <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -right-1 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                    </span>
                )}
                <span className="sr-only">Shopping Cart</span>
                </Button>
            </CartSheet>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0">
                  <div className="p-6">
                      <nav className="grid gap-4 pt-12">
                      {navLinks.map((link) => (
                          <Link
                          key={link.label}
                          href={link.href}
                          className="flex w-full items-center py-2 text-base font-semibold"
                          >
                          {link.label}
                          </Link>
                      ))}
                      </nav>
                  </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                <div className="p-6">
                    <nav className="grid gap-4 pt-12">
                    {navLinks.map((link) => (
                        <Link
                        key={link.label}
                        href={link.href}
                        className="flex w-full items-center py-2 text-base font-semibold"
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
                </SheetContent>
            </Sheet>
            <Link href="/">
                <Logo />
                <span className="sr-only">SHAMS Home</span>
            </Link>
        </div>
        
        <div className="hidden lg:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
            </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
