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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith("hero-"));

export function HeroCarousel() {
  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-none rounded-none">
                <CardContent className="relative flex aspect-[16/7] items-center justify-center p-0">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover brightness-75"
                    priority={index === 0}
                    data-ai-hint={image.imageHint}
                  />
                  <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                      {index === 0 && 'Effortless Elegance'}
                      {index === 1 && 'Curated Home Essentials'}
                      {index === 2 && 'Timeless Accessories'}
                    </h1>
                    <p className="mt-4 max-w-xl mx-auto text-lg drop-shadow-md">
                      {index === 0 && 'Discover our new collection of modern classics.'}
                      {index === 1 && 'Elevate your space with pieces designed to last.'}
                      {index === 2 && 'Find the perfect finishing touch for any outfit.'}
                    </p>
                    <Button variant="secondary" size="lg" className="mt-8">
                      Shop Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 border-none" />
      </Carousel>
    </section>
  );
}
