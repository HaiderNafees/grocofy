import React from 'react';
import { ProductDetailClient } from './product-detail-client';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Return a list of product IDs that should be statically generated
  // For now, return a few sample IDs - in production you'd fetch from your API
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  
  return (
    <ProductDetailClient productId={resolvedParams.id} />
  );
}