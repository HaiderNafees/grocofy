'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, addressesAPI } from '@/lib/api';

interface Address {
  id: string;
  user_id: string;
  address_line: string;
  city: string;
  country: string;
  postal_code?: string;
  is_default: boolean;
}

interface AddressesContextType {
  addresses: Address[];
  loading: boolean;
  addAddress: (address: any) => Promise<void>;
  updateAddress: (id: string, updates: any) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
}

export const AddressesContext = createContext<AddressesContextType | undefined>(undefined);

export const AddressesProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const { data: profile } = await authAPI.getCurrentProfile();
      if (!profile) return;

      const { data, error } = await addressesAPI.getUserAddresses(profile.id);
      if (error) throw error;
      
      setAddresses(data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address: any) => {
    try {
      const { data: profile } = await authAPI.getCurrentProfile();
      if (!profile) throw new Error('Not authenticated');

      const addressWithUser = {
        ...address,
        user_id: profile.id
      };

      const { error } = await addressesAPI.create(addressWithUser);
      if (error) throw error;
      
      await fetchAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  const updateAddress = async (id: string, updates: any) => {
    try {
      const { error } = await addressesAPI.update(id, updates);
      if (error) throw error;
      
      await fetchAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      const { error } = await addressesAPI.delete(id);
      if (error) throw error;
      
      await fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressesContext.Provider value={{
      addresses,
      loading,
      addAddress,
      updateAddress,
      deleteAddress
    }}>
      {children}
    </AddressesContext.Provider>
  );
};
