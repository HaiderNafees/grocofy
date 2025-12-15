import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function CoffeeEssentials() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src="/pics/coffe.webp"
              alt="Coffee Essentials"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  COFFEE ESSENTIALS FOR EVERY COFFEE LOVER
                </h2>
                <Link href="/products?category=Drinkable">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
