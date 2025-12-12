import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';

const promoBanner = PlaceHolderImages.find((img) => img.id === 'promo-gift-basket');
const promoGridItems = [
  { id: 'promo-coffee', title: 'COFFEE ESSENTIALS FOR EVERY COFFEE LOVER' },
  { id: 'promo-wedding', title: 'WEDDING ESSENTIALS' },
  { id: 'promo-shampoo', title: 'EXPLORE THE RANGE OF DRY SHAMPOOS' },
  { id: 'promo-watch', title: 'adidas' },
];

export function PromoSection() {
  return (
    <section className="container py-12">
      <div className="bg-[#F5EBE0] flex flex-col md:flex-row items-center rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2">
            {promoBanner && (
                <Image
                src={promoBanner.imageUrl}
                alt={promoBanner.description}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint={promoBanner.imageHint}
                />
            )}
        </div>
        <div className="w-full md:w-1/2 p-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif">Customized your</h2>
          <h3 className="text-4xl md:text-5xl font-bold font-serif text-[#B08D57]">Gift Basket</h3>
          <p className="mt-2 text-muted-foreground">for Every Celebration</p>
        </div>
      </div>
      <Link href="#">
        <div className="bg-[#E9A634] text-white text-center py-3 mt-1 rounded-b-lg hover:bg-opacity-90 transition-colors">
            Shop Now
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {promoGridItems.map((item) => {
          const image = PlaceHolderImages.find((img) => img.id === item.id);
          return (
            <div key={item.id} className="relative group overflow-hidden rounded-lg">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={600}
                        height={400}
                        className="object-cover w-full h-auto transform transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-between p-6">
                    <h3 className="text-white text-xl font-semibold text-center uppercase tracking-wider">{item.title}</h3>
                    <Button variant="secondary" className="bg-orange-400 text-black hover:bg-orange-500 rounded-sm font-bold">
                        Shop Now
                    </Button>
                </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
