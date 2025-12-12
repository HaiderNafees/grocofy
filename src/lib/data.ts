import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      imageUrl: "https://picsum.photos/seed/error/600/600",
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
    name: 'Christmas Gift Basket-0258862',
    price: 80330,
    image: getImage('product-1').imageUrl,
    imageHint: 'gift basket christmas',
    category: 'Gifts',
  },
  {
    id: 'prod-2',
    name: 'Christmas Gift Basket-0258860',
    price: 23550,
    image: getImage('product-2').imageUrl,
    imageHint: 'christmas basket',
    category: 'Gifts',
  },
  {
    id: 'prod-3',
    name: 'Christmas Gift Basket-0258859',
    price: 14760,
    image: getImage('product-3').imageUrl,
    imageHint: 'holiday basket',
    category: 'Gifts',
  },
  {
    id: 'prod-4',
    name: 'Christmas Gift Crate-0258854',
    price: 32410,
    image: getImage('product-4').imageUrl,
    imageHint: 'gift crate',
    category: 'Gifts',
  },
  {
    id: 'prod-5',
    name: 'Christmas Gift Crate-0258850',
    price: 57040,
    image: getImage('product-5').imageUrl,
    imageHint: 'holiday crate',
    category: 'Gifts',
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
