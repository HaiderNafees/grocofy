import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      imageUrl: "https://picsum.photos/seed/error/600/800",
      imageHint: "placeholder image"
    }
  }
  return {
    imageUrl: image.imageUrl,
    imageHint: image.imageHint
  };
}

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Beige Linen Shirt',
    price: 75.00,
    image: getImage('product-1').imageUrl,
    imageHint: getImage('product-1').imageHint,
    category: 'Clothing',
  },
  {
    id: 'prod-2',
    name: 'White Leather Sneakers',
    price: 120.00,
    image: getImage('product-2').imageUrl,
    imageHint: getImage('product-2').imageHint,
    category: 'Shoes',
  },
  {
    id: 'prod-3',
    name: 'Ceramic Plant Pot',
    price: 45.00,
    image: getImage('product-3').imageUrl,
    imageHint: getImage('product-3').imageHint,
    category: 'Homeware',
  },
  {
    id: 'prod-4',
    name: 'Gold-Plated Necklace',
    price: 60.00,
    image: getImage('product-4').imageUrl,
    imageHint: getImage('product-4').imageHint,
    category: 'Accessories',
  },
  {
    id: 'prod-5',
    name: 'Denim Straight-Leg Jeans',
    price: 90.00,
    image: getImage('product-5').imageUrl,
    imageHint: getImage('product-5').imageHint,
    category: 'Clothing',
  },
  {
    id: 'prod-6',
    name: 'Woven Tote Bag',
    price: 55.00,
    image: getImage('product-6').imageUrl,
    imageHint: getImage('product-6').imageHint,
    category: 'Accessories',
  },
  {
    id: 'prod-7',
    name: 'Scented Soy Candle',
    price: 25.00,
    image: getImage('product-7').imageUrl,
    imageHint: getImage('product-7').imageHint,
    category: 'Homeware',
  },
  {
    id: 'prod-8',
    name: 'Black Sunglasses',
    price: 85.00,
    image: getImage('product-8').imageUrl,
    imageHint: getImage('product-8').imageHint,
    category: 'Accessories',
  },
];
