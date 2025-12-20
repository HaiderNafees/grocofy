
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, User, ShoppingCart, X } from 'lucide-react';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { CartSheet } from './cart-sheet';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const navLinks = [
    { href: '/products', label: 'Shop' },
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact Us' },
];

const mobileNavLinks = [...navLinks];

export function Header() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { products } = useProducts();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products as user types
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleProductClick = (productId: string) => {
    setShowDropdown(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        {/* Large Screen Layout */}
        <div className="hidden lg:flex w-full items-center justify-between">
            <div className="flex items-center">
                 <Link href="/" className="flex-shrink-0">
                    <Logo />
                    <span className="sr-only">Grocofy Home</span>
                </Link>
            </div>

            <div className="w-full max-w-sm relative" ref={searchRef}>
                <form onSubmit={handleSearch}>
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                        className="w-full rounded-none border-0 border-b focus-visible:ring-0 focus-visible:ring-offset-0 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {searchQuery ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={handleClearSearch}
                            >
                                <X className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </Button>
                        ) : (
                            <Search 
                                className="h-4 w-4 text-muted-foreground cursor-pointer" 
                                onClick={handleSearchIconClick}
                            />
                        )}
                    </div>
                </form>
                
                {/* Search Dropdown */}
                {showDropdown && filteredProducts.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">Rs. {product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        <div className="p-2 border-t border-gray-100">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => {
                                    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                                    setShowDropdown(false);
                                }}
                            >
                                View all results for "{searchQuery.trim()}"
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="flex items-center gap-4">
                <nav className="flex items-center gap-8">
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
                </nav>
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

        {/* Small Screen Layout */}
        <div className="flex flex-1 items-center justify-between lg:hidden">
            <Link href="/" className="flex-shrink-0">
                <Logo />
                <span className="sr-only">Grocofy Home</span>
            </Link>

            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => router.push('/products?search=')}>
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
                        {mobileNavLinks.map((link) => (
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
      </div>
    </header>
  );
}
