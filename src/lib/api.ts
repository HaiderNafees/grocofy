// Local Mock API for development
import productsData from '../../data/products.json';

// Local mock products API
export const productsAPI = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return productsData.map(product => ({
      ...product,
      soldOut: product.soldOut || false
    }));
  },
  
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const product = productsData.find(p => p.id === id);
    return product || null;
  },
  
  create: async (product: any) => {
    console.log('Create product (mock):', product);
    return { ...product, id: Date.now().toString() };
  },
  
  update: async (id: string, updates: any) => {
    console.log('Update product (mock):', id, updates);
    return { ...updates, id };
  },
  
  delete: async (id: string) => {
    console.log('Delete product (mock):', id);
  },
};

// Mock orders API
export const ordersAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    // Return mock orders data
    return [
      {
        id: '1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+1234567890',
        items: [
          { id: '1', name: 'Pringles Cheesy Cheese', quantity: 2, price: 945 }
        ],
        totalAmount: 1890,
        status: 'pending',
        orderDate: '2024-12-25',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      }
    ];
  },

  getUserOrders: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [];
  },
  
  create: async (order: any) => {
    console.log('Create order (mock):', order);
    return { ...order, id: Date.now().toString() };
  },
  
  update: async (id: string, updates: any) => {
    console.log('Update order (mock):', id, updates);
    return { ...updates, id };
  },
  
  delete: async (id: string) => {
    console.log('Delete order (mock):', id);
  },
};

// Mock auth API
export const authAPI = {
  signIn: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if it's an admin email (simple logic for demo)
    const isAdmin = email.includes('admin') || email === 'admin@grocofy.com';
    
    return {
      id: 1,
      email,
      full_name: isAdmin ? 'Admin User' : 'Test User',
      role: isAdmin ? ('admin' as const) : ('user' as const),
      isAuthenticated: true
    };
  },
  
  getCurrentProfile: async () => {
    return null;
  },
  
  signOut: async () => {
    // Mock sign out
  },
  
  onAuthStateChanged: (callback: (user: any) => void) => {
    return { unsubscribe: () => {} };
  },
};

// Mock APIs for features not yet implemented in PHP backend
export const usersAPI = {
  getAll: async () => ({ data: [], error: null }),
  getById: async (id: string) => ({ data: null, error: new Error('No backend configured') }),
  update: async (id: string, updates: any) => ({ data: null, error: new Error('No backend configured') }),
  delete: async (id: string) => ({ data: null, error: new Error('No backend configured') })
};

export const addressesAPI = {
  getUserAddresses: async (userId: string) => ({ data: [], error: new Error('No backend configured') }),
  create: async (address: any) => ({ data: null, error: new Error('No backend configured') }),
  update: async (id: string, updates: any) => ({ data: null, error: new Error('No backend configured') }),
  delete: async (id: string) => ({ data: null, error: new Error('No backend configured') })
};

export const storageAPI = {
  upload: async (file: any) => ({ data: null, error: new Error('No backend configured') }),
  delete: async (path: string) => ({ error: new Error('No backend configured') })
};

// Legacy exports for backward compatibility
export const legacyAPI = {
  products: productsAPI,
  orders: ordersAPI,
  users: usersAPI,
  auth: authAPI
};
