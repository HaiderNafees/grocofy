
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
    <section className="py-1 sm:py-2 lg:py-3">
      <div className="container px-3 sm:px-4 lg:px-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-2 sm:mb-3 text-left">
          Popular Categories
        </h2>
      </div>

      {/* Mobile: 2-column grid with larger icons */}
      <div className="block sm:hidden container px-3">
        <div className="grid grid-cols-2 gap-1">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group"
              >
                <div className="bg-transparent rounded-lg shadow-none hover:shadow-none transition-all duration-300 overflow-hidden">
                  <div className="aspect-square relative flex items-center justify-center">
                    {image && (
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-0 shadow-none">
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-1 text-center">
                    <span className="text-xs font-medium text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tablet: 3x3 grid with larger icons */}
      <div className="hidden sm:block lg:hidden container px-4">
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group"
              >
                <div className="bg-transparent rounded-xl shadow-none hover:shadow-none transition-all duration-300 overflow-hidden">
                  <div className="aspect-square relative flex items-center justify-center">
                    {image && (
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-0 shadow-none">
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-1 text-center">
                    <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: 4x2 grid with larger icons */}
      <div className="hidden lg:block container px-6">
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === category.imageId
            );
            return (
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
                className="group"
              >
                <div className="bg-transparent rounded-xl shadow-none hover:shadow-none transition-all duration-300 overflow-hidden">
                  <div className="aspect-square relative flex items-center justify-center">
                    {image && (
                      <div className="relative w-36 h-36 rounded-full overflow-hidden border-0 shadow-none">
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="144px"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
