
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { ProductProvider } from '@/context/product-context';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'Grocofy',
  description: 'A clone of the SHAMS website built with Next.js and Firebase Studio',
  icons: {
    icon: [
      { url: 'https://iili.io/fYFSwtS.png', type: 'image/png' },
    ],
    shortcut: [
      { url: 'https://iili.io/fYFSwtS.png', type: 'image/png' },
    ],
    apple: [
      { url: 'https://iili.io/fYFSwtS.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          poppins.variable
        )}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
