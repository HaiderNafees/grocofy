import { NextResponse } from 'next/server';
import { loadProducts, addProduct, updateProduct, deleteProduct } from '@/lib/product-storage';

export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const productWithId = {
      ...product,
      id: product?.id ?? `product-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    };
    addProduct(productWithId);
    return NextResponse.json(productWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updates = await request.json();

    if (id) {
      const products = loadProducts();
      const existing = products.find(p => (p as any)?.id === id);

      if (!existing) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      const merged = { ...existing, ...updates, id };
      updateProduct(merged as any);
      return NextResponse.json(merged, { status: 200 });
    }

    updateProduct(updates);
    return NextResponse.json(updates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    deleteProduct(id);
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
