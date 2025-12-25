
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

// Force static rendering for export
export const dynamic = 'force-static';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="container py-12">
        <div className="flex justify-between items-center mb-10">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-baseline mb-10">
        <h1 className="text-4xl font-serif">My account</h1>
        <button onClick={handleSignOut} className="text-sm underline hover:no-underline">
          Log out
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-x-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-serif mb-4">Order History</h2>
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
        
        <div>
          <h3 className="text-xl font-serif mb-4">Account details</h3>
          <div className="space-y-2">
            <p>{user.full_name || user.email}</p>
            <p>{user.email}</p>
            <Link href="/account/addresses" className="text-sm underline hover:no-underline">
                View addresses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
