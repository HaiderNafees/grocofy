
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
    <section className="py-2 sm:py-3">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-3 sm:mb-4 text-center">
          Popular Categories
        </h2>
      </div>

      {/* Mobile: 2-column grid with modern cards */}
      <div className="block sm:hidden container px-4">
        <div className="grid grid-cols-2 gap-3">
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
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-0 shadow-none">
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
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

      {/* Tablet: 4x2 grid with medium cards */}
      <div className="hidden sm:block lg:hidden container px-6">
        <div className="grid grid-cols-4 gap-4">
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
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-0 shadow-none">
                        <Image
                          src={image.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
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

      {/* Desktop: 4x2 grid with large cards */}
      <div className="hidden lg:block container px-8">
        <div className="grid grid-cols-4 gap-5">
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
                <div className="bg-transparent rounded-2xl shadow-none hover:shadow-none transition-all duration-300 overflow-hidden">
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
                  <div className="p-4 text-center">
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
