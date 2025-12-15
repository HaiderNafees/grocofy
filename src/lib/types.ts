import type { ImagePlaceholder } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  imageHint: string;
  category: string;
  soldOut?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
