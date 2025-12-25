import type { ImagePlaceholder } from './placeholder-images';

export interface PackOption {
  size: string;
  price: number;
  stock: number;
  quantity?: number;
  label?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  imageHint: string;
  category: string;
  soldOut?: boolean;
  isNew?: boolean;
  packOptions?: PackOption[];
  description?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  imageHint?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  position: 'hero' | 'promo' | 'grid';
  isActive: boolean;
  sortOrder: number;
}
