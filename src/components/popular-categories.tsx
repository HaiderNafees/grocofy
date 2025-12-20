
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = [
  { name: 'Eatables', imageId: 'category-eatables' },
  { name: 'Snacks', imageId: 'category-snacks' },
  { name: 'Biscuits', imageId: 'category-biscuits' },
  { name: 'Drinkable', imageId: 'category-altitude' },
  { name: 'Dairy', imageId: 'category-eatables' },
  { name: 'Personal Care', imageId: 'category-personal-care' },
  { name: 'Household', imageId: 'category-lifestyle' },
  { name: 'Baby Care', imageId: 'category-beauty' },
];

export function PopularCategories() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-[30.6px] font-serif mb-4 sm:mb-6 text-left text-gray-900" style={{ fontFamily: 'serif' }}>
          Popular Categories
        </h2>
        
        <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium text-center group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
