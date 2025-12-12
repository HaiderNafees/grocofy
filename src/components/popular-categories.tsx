import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
    { name: "Eatables", imageId: "category-eatables" },
    { name: "Personal Care", imageId: "category-personal-care" },
    { name: "Beauty", imageId: "category-beauty" },
    { name: "Life Style", imageId: "category-lifestyle" },
    { name: "Altitude", imageId: "category-altitude" },
    { name: "Smoking", imageId: "category-smoking" },
    { name: "Gifts", imageId: "category-gifts" },
    { name: "Perfumes", imageId: "category-perfumes" },
    { name: "Delicacies", imageId: "category-delicacies" },
    { name: "Drinkable", imageId: "category-drinkable" },
];

export function PopularCategories() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-serif mb-8 text-center">Popular Categories</h2>
      </div>
      
      {/* Mobile grid */}
      <div className="lg:hidden container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {categories.map((category) => {
              const image = PlaceHolderImages.find((img) => img.id === category.imageId);
              return (
                <Link href="#" key={category.name} className="group flex flex-col items-center gap-3">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium text-center whitespace-normal">{category.name}</span>
                </Link>
              );
            })}
          </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden lg:block container">
        <div className="grid grid-cols-5 gap-x-6 gap-y-8 px-12">
          {categories.map((category) => {
            const image = PlaceHolderImages.find((img) => img.id === category.imageId);
            return (
              <Link href="#" key={category.name} className="group flex flex-col items-center gap-3">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
