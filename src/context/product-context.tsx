
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { productsAPI } from '@/lib/supabase';

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await productsAPI.getAll();
      if (error) throw error;
      
      // Transform snake_case to camelCase for frontend
      const transformedData = (data || []).map(product => {
        try {
          return {
            ...product,
            imageHint: product.image_hint,
            soldOut: product.sold_out,
            isNew: product.is_new,
            packOptions: typeof product.pack_options === 'string' 
              ? JSON.parse(product.pack_options) 
              : product.pack_options
          };
        } catch (parseError) {
          console.error('Error parsing pack_options for product:', product.id, parseError);
          return {
            ...product,
            imageHint: product.image_hint,
            soldOut: product.sold_out,
            isNew: product.is_new,
            packOptions: []
          };
        }
      });
      
      setProducts(transformedData);
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error message:', (error as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Set up periodic refresh to ensure data is always fresh
    const interval = setInterval(async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error('Periodic refresh failed:', error);
      }
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const addProduct = async (product: Product) => {
    try {
      // Transform camelCase to snake_case for database
      const dbProduct = {
        name: product.name,
        price: product.price,
        image: product.image,
        image_hint: product.imageHint,
        category: product.category,
        sold_out: product.soldOut,
        is_new: product.isNew,
        pack_options: JSON.stringify(product.packOptions)
      };
      
      const { error } = await productsAPI.create(dbProduct);
      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error message:', (error as any)?.message);
      throw error;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      // Transform camelCase to snake_case for database
      const dbProduct = {
        name: product.name,
        price: product.price,
        image: product.image,
        image_hint: product.imageHint,
        category: product.category,
        sold_out: product.soldOut,
        is_new: product.isNew,
        pack_options: JSON.stringify(product.packOptions)
      };
      
      const { error } = await productsAPI.update(product.id, dbProduct);
      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error message:', (error as any)?.message);
      throw error;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await productsAPI.delete(productId);
      if (error) throw error;
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error message:', (error as any)?.message);
      throw error;
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
