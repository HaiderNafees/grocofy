import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  return (
    <section className="bg-background py-16">
      <div className="container text-center">
        <h2 className="text-4xl font-serif mb-4">Get the latest trends first</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals!!
        </p>
        <div className="flex max-w-sm mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="rounded-r-none border-gray-300 focus:ring-0 focus:border-black" 
          />
          <Button type="submit" className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
