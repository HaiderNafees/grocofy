'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

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
        <div className="container py-12 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-10 w-24" />
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container py-12 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>Welcome back, {user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">User Information</h3>
            <p className="text-sm text-muted-foreground">Email: {user.email}</p>
          </div>
          {user.isAdmin && (
            <Link href="/admin" passHref>
              <Button variant="outline">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Go to Admin Panel
              </Button>
            </Link>
          )}
          <Button onClick={handleSignOut} variant="destructive">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
