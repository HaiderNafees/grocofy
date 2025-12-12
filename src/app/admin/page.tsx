
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useProducts } from '@/hooks/use-products';
import { ProductForm } from '@/components/admin/product-form';
import { ProductList } from '@/components/admin/product-list';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !user.isAdmin) {
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
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>All Products</CardTitle>
                </CardHeader>
                <CardContent>
                    {productsLoading ? (
                        <p>Loading products...</p>
                    ) : (
                        <ProductList products={products} />
                    )}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
