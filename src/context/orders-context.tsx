'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { ordersAPI, authAPI } from '@/lib/api';

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  shipping_address: any;
  created_at: string;
}

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  createOrder: (order: any, orderItems: any[]) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data: profile } = await authAPI.getCurrentProfile();
      if (!profile) return;

      const { data, error } = await ordersAPI.getUserOrders(profile.id);
      if (error) throw error;
      
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (order: any, orderItems: any[]) => {
    try {
      const { data: profile } = await authAPI.getCurrentProfile();
      if (!profile) throw new Error('Not authenticated');

      const orderWithUser = {
        ...order,
        user_id: profile.id
      };

      const { error } = await ordersAPI.create(orderWithUser);
      if (error) throw error;
      
      await fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to realtime updates (mock)
    const subscription = { unsubscribe: () => {} };

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <OrdersContext.Provider value={{
      orders,
      loading,
      createOrder,
      refreshOrders: fetchOrders
    }}>
      {children}
    </OrdersContext.Provider>
  );
};
