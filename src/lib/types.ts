import type { ImagePlaceholder } from './placeholder-images';

export interface PackOption {
  quantity: number;
  price: number;
  label: string;
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
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
