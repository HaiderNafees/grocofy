
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage or use initial data
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(initialProducts);
        localStorage.setItem('products', JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error('Failed to access localStorage', error);
      setProducts(initialProducts);
    } finally {
        setLoading(false);
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('products', JSON.stringify(newProducts));
    } catch (error) {
      console.error('Failed to save products to localStorage', error);
    }
  };

  const addProduct = (product: Product) => {
    saveProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    saveProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    saveProducts(products.filter((p) => p.id !== productId));
  };

  const value = { products, loading, addProduct, updateProduct, deleteProduct };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
