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
    name: 'Christmas Gift Crate-0258848',
    price: 16475,
    image: getImage('product-1').imageUrl,
    imageHint: 'gift basket christmas',
    category: 'Gifts',
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Christmas Gift HatBox-0258844',
    price: 11370,
    image: getImage('product-2').imageUrl,
    imageHint: 'christmas basket',
    category: 'Gifts',
    isNew: true,
  },
  {
    id: 'prod-3',
    name: 'Christmas Gift Basket-0258859',
    price: 14760,
    image: getImage('product-3').imageUrl,
    imageHint: 'holiday basket',
    category: 'Gifts',
    isNew: true,
  },
  {
    id: 'prod-4',
    name: 'Christmas Gift Crate-0258854',
    price: 32410,
    image: getImage('product-4').imageUrl,
    imageHint: 'gift crate',
    category: 'Gifts',
    isNew: true,
  },
  {
    id: 'prod-5',
    name: 'Christmas Gift Crate-0258850',
    price: 57040,
    image: getImage('product-5').imageUrl,
    imageHint: 'holiday crate',
    category: 'Gifts',
    isNew: true,
  },
];

export const bestSellers: Product[] = [
  {
    id: 'best-1',
    name: 'Samyang Hot Chicken Carbo Flavour Noodles 130g',
    price: 570,
    image: getImage('best-seller-1').imageUrl,
    imageHint: 'samyang noodles',
    category: 'Eatables',
  },
  {
    id: 'best-2',
    name: 'Lindt Lindor Milk Ball 200g',
    price: 4250,
    image: getImage('best-seller-2').imageUrl,
    imageHint: 'lindt chocolate',
    category: 'Eatables',
  },
  {
    id: 'best-3',
    name: 'Takis Fuego Hot Chilli Pepper & Lime Tortilla Chips 56g',
    price: 950,
    image: getImage('best-seller-3').imageUrl,
    imageHint: 'takis fuego',
    category: 'Eatables',
  },
  {
    id: 'best-4',
    name: 'Ferrero Nutella Wafer 22g',
    price: 350,
    image: getImage('best-seller-4').imageUrl,
    imageHint: 'nutella wafer',
    category: 'Eatables',
  },
  {
    id: 'best-5',
    name: 'Takis Blue Heat Tortilla Chips 113.4g',
    price: 2050,
    image: getImage('best-seller-5').imageUrl,
    imageHint: 'takis blue',
    category: 'Eatables',
  },
    {
    id: 'best-6',
    name: 'Samyang Buldak Hot Chicken Habanero Lime 135g',
    price: 570,
    image: getImage('best-seller-6').imageUrl,
    imageHint: 'samyang buldak',
    category: 'Eatables',
    soldOut: true,
  },
  {
    id: 'best-7',
    name: 'Takis Mini Hot Chilli Pepper & Lime Tortilla Chips 35g',
    price: 495,
    image: getImage('best-seller-7').imageUrl,
    imageHint: 'takis mini',
    category: 'Eatables',
    soldOut: true,
  },
    {
    id: 'best-8',
    name: 'Takis Hot Chilli Pepper & Lime Tortilla Chips 113.4g',
    price: 1850,
    image: getImage('best-seller-8').imageUrl,
    imageHint: 'takis hot',
    category: 'Eatables',
    soldOut: true,
  },
  {
    id: 'best-9',
    name: 'Kinder Bueno Two Bars 43g',
    price: 595,
    image: getImage('best-seller-9').imageUrl,
    imageHint: 'kinder bueno',
    category: 'Eatables',
    soldOut: true,
  },
  {
    id: 'best-10',
    name: 'Samyang Buldak Cream Carbonara Hot Chicken Flavour Noodles 140g',
    price: 570,
    image: getImage('best-seller-10').imageUrl,
    imageHint: 'samyang carbonara',
    category: 'Eatables',
    soldOut: true,
  },
];
