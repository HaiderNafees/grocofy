// Supabase API client - replacing Firebase/PHP backend
export { authAPI, productsAPI, ordersAPI, usersAPI, storageAPI } from './supabase-api';

// Legacy exports for backward compatibility
export const legacyAPI = {
  // Products API (legacy wrapper)
  products: {
    getAll: async () => {
      const { productsAPI } = await import('./supabase-api');
      return productsAPI.getAll();
    },
    getById: async (id: string) => {
      const { productsAPI } = await import('./supabase-api');
      return productsAPI.getById(id);
    },
    create: async (product: any) => {
      const { productsAPI } = await import('./supabase-api');
      return productsAPI.create(product);
    },
    update: async (id: string, updates: any) => {
      const { productsAPI } = await import('./supabase-api');
      return productsAPI.update(id, updates);
    },
    delete: async (id: string) => {
      const { productsAPI } = await import('./supabase-api');
      return productsAPI.delete(id);
    },
  },
  
  // Orders API (legacy wrapper)
  orders: {
    getAll: async () => {
      const { ordersAPI } = await import('./supabase-api');
      return ordersAPI.getAll();
    },
    getById: async (id: string) => {
      const { ordersAPI } = await import('./supabase-api');
      return ordersAPI.getById(id);
    },
    create: async (order: any) => {
      const { ordersAPI } = await import('./supabase-api');
      return ordersAPI.create(order);
    },
    update: async (id: string, updates: any) => {
      const { ordersAPI } = await import('./supabase-api');
      return ordersAPI.update(id, updates);
    },
    delete: async (id: string) => {
      const { ordersAPI } = await import('./supabase-api');
      return ordersAPI.delete(id);
    },
  },
  
  // Users API (legacy wrapper)
  users: {
    getAll: async () => {
      const { usersAPI } = await import('./supabase-api');
      return usersAPI.getAll();
    },
    getById: async (id: string) => {
      const { usersAPI } = await import('./supabase-api');
      return usersAPI.getById(id);
    },
    create: async (user: any) => {
      const { usersAPI } = await import('./supabase-api');
      return usersAPI.update(user.id || user.uid, user);
    },
    update: async (id: string, updates: any) => {
      const { usersAPI } = await import('./supabase-api');
      return usersAPI.update(id, updates);
    },
    delete: async (id: string) => {
      const { usersAPI } = await import('./supabase-api');
      return usersAPI.delete(id);
    },
  },
  
  // Auth API (legacy wrapper)
  auth: {
    signIn: async (email: string, password: string) => {
      const { authAPI } = await import('./supabase-api');
      return authAPI.signIn(email, password);
    },
    signUp: async (userData: any) => {
      const { authAPI } = await import('./supabase-api');
      return authAPI.signUp(userData.email, userData.password, userData.displayName);
    },
    getCurrentUser: async () => {
      const { authAPI } = await import('./supabase-api');
      return authAPI.getCurrentUser();
    },
  }
};
