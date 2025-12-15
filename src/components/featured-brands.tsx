"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const brandImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith("brand-")
);

export function FeaturedBrands() {
  return (
    <section className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif">Featured Brands</h2>
      </div>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <div className="relative">
          <CarouselContent className="-ml-4">
            {brandImages.map((image) => (
              <CarouselItem
                key={image.id}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Link href="#">
                  <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-center h-24 group">
                    <div className="relative h-12 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8" />
        </div>
      </Carousel>
    </section>
  );
}
