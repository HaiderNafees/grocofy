import { NextResponse } from 'next/server';
import { loadProducts, updateProduct, deleteProduct } from '@/lib/product-storage';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await request.json();
    updateProduct(product);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    deleteProduct(params.id);
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
