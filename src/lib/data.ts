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
    id: 'pringles-cheesy-cheese',
    name: 'Pringles Snacks Cheesy Cheese — 165g',
    price: 945,
    image: getImage('pringles-cheesy-cheese').imageUrl,
    imageHint: 'pringles cheesy cheese',
    category: 'Snacks',
  },
  {
    id: 'pringles-hot-spicy',
    name: 'Pringles Snacks Hot & Spicy — 165g',
    price: 945,
    image: getImage('pringles-hot-spicy').imageUrl,
    imageHint: 'pringles hot spicy',
    category: 'Snacks',
  },
  {
    id: 'pringles-original',
    name: 'Pringles Snacks Original — 165g',
    price: 945,
    image: getImage('pringles-original').imageUrl,
    imageHint: 'pringles original',
    category: 'Snacks',
  },
  {
    id: 'pringles-paprika',
    name: 'Pringles Snacks Paprika — 165g',
    price: 945,
    image: getImage('pringles-paprika').imageUrl,
    imageHint: 'pringles paprika',
    category: 'Snacks',
  },
  {
    id: 'pringles-sour-cream-onion',
    name: 'Pringles Snacks Sour Cream & Onion — 165g',
    price: 945,
    image: getImage('pringles-sour-cream-onion').imageUrl,
    imageHint: 'pringles sour cream',
    category: 'Snacks',
  },
  {
    id: 'kurkure-naughty-tomato',
    name: 'Kurkure Naughty Tomato — 47.5g',
    price: 75,
    image: getImage('kurkure-naughty-tomato').imageUrl,
    imageHint: 'kurkure tomato',
    category: 'Snacks',
  },
  {
    id: 'kurkure-masala-munch',
    name: 'Kurkure Masala Munch — 47.5g',
    price: 75,
    image: getImage('kurkure-masala-munch').imageUrl,
    imageHint: 'kurkure masala',
    category: 'Snacks',
  },
  {
    id: 'kurkure-chutney-chaska',
    name: 'Kurkure Chutney Chaska — 47.5g',
    price: 75,
    image: getImage('kurkure-chutney-chaska').imageUrl,
    imageHint: 'kurkure chutney',
    category: 'Snacks',
  },
  {
    id: 'kurkure-chilli-chatka',
    name: 'Kurkure Chilli Chatka — 47.5g',
    price: 75,
    image: getImage('kurkure-chilli-chatka').imageUrl,
    imageHint: 'kurkure chilli',
    category: 'Snacks',
  },
  {
    id: 'lays-flamin-hot',
    name: 'Lays Flamin\' Hot — 34.5g',
    price: 75,
    image: getImage('lays-flamin-hot').imageUrl,
    imageHint: 'lays flamin hot',
    category: 'Snacks',
  },
  {
    id: 'lays-french-cheese',
    name: 'Lays French Cheese — 34.5g',
    price: 75,
    image: getImage('lays-french-cheese').imageUrl,
    imageHint: 'lays french cheese',
    category: 'Snacks',
  },
  {
    id: 'lays-classic-salted',
    name: 'Lays Classic Salted — 34.5g',
    price: 75,
    image: getImage('lays-classic-salted').imageUrl,
    imageHint: 'lays classic',
    category: 'Snacks',
  },
  {
    id: 'lays-yogurt-herb',
    name: 'Lays Yogurt & Herb — 34.5g',
    price: 75,
    image: getImage('lays-yogurt-herb').imageUrl,
    imageHint: 'lays yogurt herb',
    category: 'Snacks',
  },
  {
    id: 'slanty-cheese-flavor',
    name: 'Slanty Cheese Flavor — 20g',
    price: 35,
    image: getImage('slanty-cheese-flavor').imageUrl,
    imageHint: 'slanty cheese',
    category: 'Snacks',
  },
  {
    id: 'slanty-chilli-flavor',
    name: 'Slanty Chilli Flavor — 20g',
    price: 35,
    image: getImage('slanty-chilli-flavor').imageUrl,
    imageHint: 'slanty chilli',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-salad',
    name: 'Super Crisp Salad (Salted) — 22g',
    price: 35,
    image: getImage('super-crisp-salad').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-masala-masti',
    name: 'Super Crisp Masala Masti — 22g',
    price: 35,
    image: getImage('super-crisp-masala-masti').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-pizza',
    name: 'Super Crisp Pizza — 22g',
    price: 35,
    image: getImage('super-crisp-pizza').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-bbq',
    name: 'Super Crisp BBQ — 22g',
    price: 35,
    image: getImage('super-crisp-bbq').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-ketchup',
    name: 'Super Crisp Ketchup — 22g',
    price: 35,
    image: getImage('super-crisp-ketchup').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'super-crisp-sour-cream-onion',
    name: 'Super Crisp Sour Cream & Onion — 22g',
    price: 35,
    image: getImage('super-crisp-sour-cream-onion').imageUrl,
    imageHint: 'super crisp',
    category: 'Snacks',
  },
  {
    id: 'wavy-maxx-sizzling-bbq',
    name: 'Wavy Maxx Sizzling BBQ — 25g',
    price: 50,
    image: getImage('wavy-maxx-sizzling-bbq').imageUrl,
    imageHint: 'wavy maxx',
    category: 'Snacks',
  },
  {
    id: 'wavy-maxx-creamy-onion',
    name: 'Wavy Maxx Creamy Onion — 25g',
    price: 50,
    image: getImage('wavy-maxx-creamy-onion').imageUrl,
    imageHint: 'wavy maxx',
    category: 'Snacks',
  },
  {
    id: 'biscolata-mood-chocolate',
    name: 'Biscolata Mood Chocolate — 100g',
    price: 399,
    image: getImage('biscolata-mood-chocolate').imageUrl,
    imageHint: 'biscolata chocolate',
    category: 'Biscuits',
  },
  {
    id: 'tuc-biscuit',
    name: 'Tuc Biscuit — 66g',
    price: 80,
    image: getImage('tuc-biscuit').imageUrl,
    imageHint: 'tuc biscuit',
    category: 'Biscuits',
  },
  {
    id: 'prince-biscuit',
    name: 'Prince Biscuit — 68g',
    price: 80,
    image: getImage('prince-biscuit').imageUrl,
    imageHint: 'prince biscuit',
    category: 'Biscuits',
  },
];

export const bestSellers: Product[] = [];
