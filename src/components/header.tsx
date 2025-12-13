
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { CartSheet } from './cart-sheet';
import { Input } from '@/components/ui/input';

const navLinks = [
    { href: '/products', label: 'Shop' },
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact Us' },
];

export function Header() {
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">

        {/* Logo - Left */}
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0">
            <Logo />
            <span className="sr-only">Grocofy Home</span>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
            <nav className="flex items-center gap-x-8">
              {navLinks.map((link) => (
                  <Link
                      key={link.label}
                      href={link.href}
                      className="font-sans text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                      {link.label}
                  </Link>
              ))}
            </nav>
        </div>
        
        {/* Icons and Mobile Menu - Right */}
        <div className="flex items-center justify-end gap-1">
            <div className="hidden lg:flex relative w-full max-w-xs">
                <Input placeholder="Search..." className="w-full pr-10 border-gray-300 rounded-full focus:ring-0 focus:border-black" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <Link href={user ? '/account' : '/login'} passHref>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
              </Button>
            </Link>
            <CartSheet>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {itemCount}
                        </span>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                </Button>
            </CartSheet>

            {/* Hamburger Menu - Mobile */}
            <div className="flex items-center lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs p-0">
                    <div className="p-6 h-full overflow-y-auto">
                        <nav className="flex flex-col items-start gap-y-2 pt-12">
                        {navLinks.map((link) => (
                            <Link
                            key={link.label}
                            href={link.href}
                            className="py-2 text-base font-normal uppercase tracking-wider text-gray-700"
                            >
                            {link.label}
                            </Link>
                        ))}
                        </nav>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
