import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

const DATA_FILE = join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  require('fs').mkdirSync(dataDir, { recursive: true });
}

export function loadProducts(): Product[] {
  try {
    if (existsSync(DATA_FILE)) {
      const fileContent = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(fileContent);
    }
    // If file doesn't exist, create it with initial products
    writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));
    return initialProducts;
  } catch (error) {
    console.error('Error loading products:', error);
    return initialProducts;
  }
}

export function saveProducts(products: Product[]): void {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error saving products:', error);
    throw new Error('Failed to save products');
  }
}

export function addProduct(product: Product): Product[] {
  const products = loadProducts();
  const newProducts = [...products, product];
  saveProducts(newProducts);
  return newProducts;
}

export function updateProduct(updatedProduct: Product): Product[] {
  const products = loadProducts();
  const newProducts = products.map(p => 
    p.id === updatedProduct.id ? updatedProduct : p
  );
  saveProducts(newProducts);
  return newProducts;
}

export function deleteProduct(productId: string): Product[] {
  const products = loadProducts();
  const newProducts = products.filter(p => p.id !== productId);
  saveProducts(newProducts);
  return newProducts;
}
