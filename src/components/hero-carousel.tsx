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
                <CardContent className="relative flex aspect-[2/1] md:aspect-[3/1] items-center justify-center p-0">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover brightness-75"
                    priority={index === 0}
                    data-ai-hint={image.imageHint}
                  />
                  <div className="relative z-10 text-center text-white p-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {index === 0 && 'Unstitched Lawn'}
                      {index === 1 && 'Ready to Wear'}
                      {index === 2 && 'Luxury Pret'}
                    </h1>
                    <p className="mt-2 max-w-lg mx-auto text-base md:text-lg">
                      {index === 0 && 'Discover our latest collection'}
                      {index === 1 && 'Shop the finest ready to wear'}
                      {index === 2 && 'Exquisite designs for every occasion'}
                    </p>
                    <Button variant="secondary" size="lg" className="mt-6 rounded-none uppercase tracking-wider">
                      Shop Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-4">
            <CarouselPrevious className="static translate-y-0 text-white bg-black/30 hover:bg-black/50 border-none rounded-none h-10 w-10" />
            <CarouselNext className="static translate-y-0 text-white bg-black/30 hover:bg-black/50 border-none rounded-none h-10 w-10" />
        </div>
      </Carousel>
    </section>
  );
}
