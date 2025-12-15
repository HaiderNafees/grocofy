import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

const footerLinks = {
  'Information': [
    { href: '#', label: 'About us' },
    { href: '#', label: 'Contact us' },
    { href: '#', label: 'Track your order' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Refund Policy' },
    { href: '#', label: 'Shipping Policy' },
    { href: '#', label: 'Terms of Service' },
  ],
  'Quick links': [
    { href: '#', label: 'Unstitched' },
    { href: '#', label: 'Stitched' },
    { href: '#', label: 'Western' },
    { href: '#', label: 'Trousers' },
    { href: '#', label: 'Sale' },
  ],
};

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <Link href="#" className="text-muted-foreground hover:text-foreground">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="mb-4">
                <Logo />
                <span className="sr-only">Grocofy Home</span>
            </Link>
            <p className="text-sm max-w-xs">Subscribe to our newsletter and get 10% off your first purchase</p>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
              <Input type="email" placeholder="Your email" className="bg-background border-border" />
              <Button type="submit" variant="outline">Subscribe</Button>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold uppercase tracking-wider mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
             <div>
                <h4 className="font-semibold uppercase tracking-wider mb-4">Follow us</h4>
                <div className="flex items-center gap-4">
                    <SocialIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </SocialIcon>
                    <SocialIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    </SocialIcon>
                </div>
              </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Grocofy
          </p>
          <div className="flex items-center gap-2">
            <img src="https://cdn.shopify.com/s/files/1/0599/2369/1382/files/ssl-commerce-1_360x.png?v=1658993072" alt="Payment methods" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
