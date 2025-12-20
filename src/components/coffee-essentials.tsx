import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export function CoffeeEssentials() {
  return (
    <section className="py-0">
      <div className="container px-0">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src="/pics/coffe.webp"
              alt="Coffee Essentials"
              fill
              className="object-cover"
              priority
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-4 sm:mb-6">
                <div className="relative w-full h-full rounded-full border-4 border-white/90 overflow-hidden shadow-xl">
                  <Image
                    src="/pics/coffe.webp"
                    alt="Coffee Icon"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 40%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-orange-600/40 rounded-full"></div>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-center drop-shadow-2xl px-4">
                COFFEE ESSENTIALS
                <br />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                  FOR EVERY COFFEE LOVER
                </span>
              </h2>
              <Link href="/products?category=Drinkable">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
