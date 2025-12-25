
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/firebase-auth-context';
import { useProducts } from '@/hooks/use-products';
import { ProductForm } from '@/components/admin/product-form';
import { ProductList } from '@/components/admin/product-list';
import { OrdersSection } from '@/components/admin/orders-section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Force static rendering for export
export const dynamic = 'force-static';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && isClient) {
      if (!user) {
        router.push('/login');
      }
    }
  }, [user, loading, isClient, router]);
  
  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'all') {
      return products;
    }
    return products.filter(p => p.category === categoryFilter);
  }, [products, categoryFilter]);

  if (!isClient || loading || !user) {
    return (
      <div className="container py-12">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
        <Button onClick={handleSignOut} variant="destructive" className="w-full sm:w-auto">
          Sign Out
        </Button>
      </div>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
          <TabsTrigger value="products" className="text-sm sm:text-base">Manage Products</TabsTrigger>
          <TabsTrigger value="add-product" className="text-sm sm:text-base">Add Product</TabsTrigger>
          <TabsTrigger value="orders" className="text-sm sm:text-base">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">All Products</CardTitle>
               <div className="pt-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                        <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <p>Loading products...</p>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add-product">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <OrdersSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
