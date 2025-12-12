"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { CartSheet } from './cart-sheet';

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
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="p-6">
                <Link href="/" className="mb-8 block">
                  <Logo />
                  <span className="sr-only">SHAMS Home</span>
                </Link>
                <nav className="grid gap-4">
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

        <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
                {navLinks.slice(0, 2).map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
                >
                    {link.label}
                </Link>
                ))}
            </nav>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
                <Logo />
                <span className="sr-only">SHAMS Home</span>
            </Link>
        </div>
        
        <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-6">
                {navLinks.slice(2).map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
                >
                    {link.label}
                </Link>
                ))}
            </nav>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
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
