import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

const footerLinks = {
  'Shop': [
    { href: '#', label: 'New In' },
    { href: '#', label: 'Clothing' },
    { href: '#', label: 'Shoes' },
    { href: '#', label: 'Accessories' },
  ],
  'Help': [
    { href: '#', label: 'Contact Us' },
    { href: '#', label: 'FAQs' },
    { href: '#', label: 'Shipping' },
    { href: '#', label: 'Returns' },
  ],
  'Company': [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press' },
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
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="mb-2">
                <Logo />
                <span className="sr-only">Shamshop Home</span>
            </Link>
            <p className="text-sm">Sophisticated styles for modern living.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 md:col-span-2">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
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
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Stay in touch</h4>
            <p className="text-sm">Sign up for our newsletter to get the latest updates.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shamshop Clone. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <SocialIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </SocialIcon>
            <SocialIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 9.6 0 7.6-6.2 11.2-12.7 11.2C5.1 28.2.3 24.5.3 18.2c0-3.2 1.3-5.6 3.4-7.4-1.8-1.1-2-3.3-.8-5.6C4.2 3.9 6 .9 8.6.9c3.2 0 4.8 2.2 5.2 4.6.4-1 2.3-1.6 3.7-1.6 2.3 0 4.5 1.2 4.5 4.3z"></path></svg>
            </SocialIcon>
            <SocialIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
