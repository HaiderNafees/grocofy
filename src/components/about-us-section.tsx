import Image from "next/image";
import { Button } from "./ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const aboutUsImage = PlaceHolderImages.find(img => img.id === "about-us-banner");

export function AboutUsSection() {
  return (
    <section className="relative w-full h-[500px] my-12">
        {aboutUsImage && (
            <Image
                src={aboutUsImage.imageUrl}
                alt={aboutUsImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutUsImage.imageHint}
            />
        )}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative container h-full flex items-center">
        <div className="max-w-md text-white">
          <h2 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4">About Us</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            Walk into Shams an get a luxurious and unique retail experience. Find a tantalizing array of products to tease any taste bud. Let us spoil you with tempting chocolates to luxurious beauty products.
          </p>
          <Button variant="secondary" size="lg" className="bg-orange-400 text-black hover:bg-orange-500 rounded-sm font-bold px-10 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
