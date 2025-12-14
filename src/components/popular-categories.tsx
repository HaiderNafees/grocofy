
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const categories = [
  { name: 'Eatables', imageId: 'category-eatables' },
  { name: 'Snacks', imageId: 'category-snacks' },
  { name: 'Biscuits', imageId: 'category-biscuits' },
  { name: 'Drinkable', imageId: 'category-drinkable' },
  { name: 'Dairy', imageId: 'category-dairy' },
  { name: 'Personal Care', imageId: 'category-personal' },
  { name: 'Household', imageId: 'category-household' },
  { name: 'Baby Care', imageId: 'category-baby' },
];

export function PopularCategories() {
  return (
    <section className="py-4 sm:py-6">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-3 sm:mb-4 text-center">
          Popular Categories
        </h2>
      </div>

      {/* Mobile: 2-column grid with 4 icons each */}
      <div className="block sm:hidden container px-4">
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-200 group-hover:border-primary transition-all duration-300">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-center whitespace-normal">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tablet: 4x2 grid with medium icons */}
      <div className="hidden sm:block lg:hidden container px-6">
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden border border-gray-200 group-hover:border-primary transition-all duration-300">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-center whitespace-normal">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: 4x2 grid with large icons */}
      <div className="hidden lg:block container px-8">
        <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative w-28 h-20 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-all duration-300">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-center whitespace-normal">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
