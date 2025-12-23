'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { productsAPI } from '@/lib/api';

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
      const data = await productsAPI.getAll();
      
      // Transform data if needed (snake_case to camelCase)
      const transformedData = (data || []).map((product: any) => ({
        ...product,
        imageHint: product.image_hint || product.imageHint,
        soldOut: product.sold_out || product.soldOut,
        isNew: product.is_new || product.isNew,
        packOptions: typeof product.pack_options === 'string' 
          ? JSON.parse(product.pack_options) 
          : product.packOptions || product.packOptions
      }));
      
      setProducts(transformedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      // Transform camelCase to snake_case for PHP backend
      const backendProduct = {
        name: product.name,
        price: product.price,
        image: product.image,
        image_hint: product.imageHint,
        category: product.category,
        sold_out: product.soldOut,
        is_new: product.isNew,
        pack_options: JSON.stringify(product.packOptions),
        active: true,
        created_at: new Date().toISOString()
      };
      
      await productsAPI.create(backendProduct);
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      // Transform camelCase to snake_case for PHP backend
      const backendProduct = {
        name: product.name,
        price: product.price,
        image: product.image,
        image_hint: product.imageHint,
        category: product.category,
        sold_out: product.soldOut,
        is_new: product.isNew,
        pack_options: JSON.stringify(product.packOptions),
        updated_at: new Date().toISOString()
      };
      
      await productsAPI.update(product.id, backendProduct);
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await productsAPI.delete(productId);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
