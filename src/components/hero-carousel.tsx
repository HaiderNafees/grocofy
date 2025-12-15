"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith("hero-"));

// Define routing for each hero image
const getHeroRoute = (imageId: string) => {
  switch (imageId) {
    case "hero-1":
      return "/products?category=Eatables";
    case "hero-2":
      return "/products?category=Drinkable";
    case "hero-3":
      return "/products?category=Lifestyle";
    default:
      return "/products";
  }
};

export function HeroCarousel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={isClient ? [
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ] : []}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-0 hero-aspect-desktop hero-aspect-mobile">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 bg-black/20">
                  {image.id === "hero-3" && (
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Customized your Gift Basket
                      </h2>
                      <p className="text-lg md:text-xl text-white mb-6 drop-shadow-md">
                        for Every Celebration
                      </p>
                    </div>
                  )}
                  <Link href={getHeroRoute(image.id)} className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="rounded-md font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = getHeroRoute(image.id);
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
