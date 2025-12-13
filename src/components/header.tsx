
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { CartSheet } from './cart-sheet';

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
      <div className="container flex h-16 items-center">
        <div className="flex items-center lg:hidden">
           <Link href="/" className="flex-shrink-0">
                <Logo />
                <span className="sr-only">Grocofy Home</span>
            </Link>
        </div>
        
        <div className="hidden lg:flex flex-1 items-center justify-between">
             <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="font-sans uppercase tracking-wider text-gray-700"
                        style={{ fontSize: '14px' }}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
                <Link href="/" className="flex-shrink-0">
                    <Logo />
                    <span className="sr-only">Grocofy Home</span>
                </Link>
            </div>
            
            <div className="flex items-center gap-2">
                <div className="w-full max-w-sm relative">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-none border-0 border-b focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
                <Link href={user ? '/account' : '/login'} passHref>
                    <Button variant="ghost" size="icon">
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
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end lg:hidden">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <Link href={user ? '/account' : '/login'} passHref>
                <Button variant="ghost" size="icon">
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
             <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs p-0">
                <div className="p-6 h-full overflow-y-auto">
                    <nav className="flex flex-col items-start gap-y-2 pt-12">
                    {navLinks.map((link) => (
                        <Link
                        key={link.label}
                        href={link.href}
                        className="py-2 font-sans uppercase tracking-wider text-gray-700"
                        style={{ fontSize: '14px' }}
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
    </header>
  );
}
