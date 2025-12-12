"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from './cart-sheet';
import { Input } from '@/components/ui/input';

const topNavLinks = [
    { href: '#', label: 'EATABLES' },
    { href: '#', label: 'PERSONAL CARE' },
    { href: '#', label: 'BEAUTY' },
    { href: '#', label: 'FRAGRANCE' },
    { href: '#', label: 'GIFTS' },
    { href: '#', label: 'LIFE STYLE' },
    { href: '#', label: 'CLOTHING' },
    { href: '#', label: 'HOME DECOR' },
    { href: '#', label: 'SMOKING' },
];

const bottomNavLinks = [
    { href: '#', label: 'BRANDS' },
    { href: '#', label: 'TRACK ORDER' },
    { href: '#', label: 'CUSTOMIZE GIFT BASKET' },
    { href: '#', label: 'SALE' },
];

const mobileNavLinks = [
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
      <div className="container flex h-16 items-center">
        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between w-full">
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
                            {[...mobileNavLinks, ...topNavLinks, ...bottomNavLinks].map((link) => (
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
            <Link href="/" className="flex-shrink-0">
                <Logo />
                <span className="sr-only">SHAMS Home</span>
            </Link>
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
                <CartSheet>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
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

        {/* Desktop */}
        <div className="hidden lg:flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Logo />
                    <span className="sr-only">SHAMS Home</span>
                </Link>
            </div>
            
            <div className="flex-1 px-8 max-w-lg mx-auto">
                <div className="relative">
                    <Input placeholder="Search..." className="pr-10 border-gray-300 rounded-full focus:ring-0 focus:border-black" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-sm font-normal">
                    <User className="h-5 w-5 mr-2" />
                    ACCOUNT
                </Button>
                <CartSheet>
                    <Button variant="ghost" className="relative text-sm font-normal">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        CART
                        {itemCount > 0 && (
                            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {itemCount}
                            </span>
                        )}
                        <span className="sr-only">Shopping Cart</span>
                    </Button>
                </CartSheet>
            </div>
        </div>
      </div>
      <nav className="hidden lg:flex container items-center justify-center py-2 border-t">
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-6">
                {topNavLinks.map(link => (
                    <Link href={link.href} key={link.label} className="text-sm font-medium hover:underline">{link.label}</Link>
                ))}
            </div>
            <div className="flex items-center gap-6 mt-2">
                 {bottomNavLinks.map(link => (
                    <Link href={link.href} key={link.label} className="text-sm font-medium hover:underline">{link.label}</Link>
                ))}
            </div>
        </div>
      </nav>
    </header>
  );
}
