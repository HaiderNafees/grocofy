
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

      {/* Mobile: 2-column vertical grid */}
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
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 group-hover:border-primary transition-all duration-300">
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

      {/* Tablet+: Compact horizontal scroll */}
      <div className="hidden sm:block w-full">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 md:space-x-4 px-4 sm:px-6 lg:px-8 pb-2">
            {categories.map((category) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === category.imageId
              );
              return (
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  key={category.name}
                  className="flex flex-col items-center gap-2 flex-shrink-0 group"
                >
                  <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border border-gray-200 group-hover:border-primary transition-all duration-300">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center whitespace-normal max-w-[80px]">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden md:block" />
        </ScrollArea>
      </div>
    </section>
  );
}
