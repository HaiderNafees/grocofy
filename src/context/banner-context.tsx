'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Banner } from '@/lib/types';
import { productsAPI } from '@/lib/api';

export interface BannerContextType {
  banners: Banner[];
  loading: boolean;
  refreshBanners: () => Promise<void>;
}

export const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const { data, error } = await productsAPI.getAll();
      if (error) throw error;
      
      // Transform snake_case to camelCase for frontend (mock data)
      const transformedData = (data || []).map((banner: any) => ({
        ...banner,
        imageHint: banner.image_hint,
        buttonText: banner.button_text,
        buttonLink: banner.button_link,
        backgroundColor: banner.background_color,
        textColor: banner.text_color,
        isActive: banner.is_active,
        sortOrder: banner.sort_order
      }));
      
      setBanners(transformedData);
    } catch (error) {
      console.error('Error fetching banners:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Error message:', (error as any)?.message);
      console.error('Error details:', (error as any)?.details);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
    // Set up periodic refresh to ensure data is always fresh
    const interval = setInterval(async () => {
      try {
        await fetchBanners();
      } catch (error) {
        console.error('Periodic refresh failed:', error);
      }
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const value = {
    banners,
    loading,
    refreshBanners: fetchBanners,
  };

  return (
    <BannerContext.Provider value={value}>
      {children}
    </BannerContext.Provider>
  );
};
