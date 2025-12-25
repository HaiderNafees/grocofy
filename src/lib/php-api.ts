// PHP Backend API Client
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '../backend/api' 
  : 'http://localhost:8000/backend/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  imageHint: string;
  description: string;
  soldOut: boolean;
  isNew: boolean;
  packOptions: Array<{
    size: string;
    price: number;
    stock: number;
  }>;
  active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  items: any[];
  total: number;
  status: string;
  shipping_address: any;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  isAuthenticated: boolean;
}

// Generic API request function
async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiRequest<Product[]>('products.php');
    return response.data || [];
  },
  
  getById: async (id: number): Promise<Product | null> => {
    const response = await apiRequest<Product[]>(`products.php?id=${id}`);
    const products = response.data || [];
    return products.length > 0 ? products[0] : null;
  },
  
  create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await apiRequest<Product>('products.php', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return response.data!;
  },
  
  update: async (id: number, updates: Partial<Product>): Promise<Product> => {
    const response = await apiRequest<Product>('products.php', {
      method: 'PUT',
      body: JSON.stringify({ ...updates, id }),
    });
    return response.data!;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiRequest(`products.php?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  getUserOrders: async (userId: number): Promise<Order[]> => {
    const response = await apiRequest<Order[]>(`orders.php?user_id=${userId}`);
    return response.data || [];
  },
  
  create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> => {
    const response = await apiRequest<Order>('orders.php', {
      method: 'POST',
      body: JSON.stringify(order),
    });
    return response.data!;
  },
  
  update: async (id: number, updates: Partial<Order>): Promise<Order> => {
    const response = await apiRequest<Order>('orders.php', {
      method: 'PUT',
      body: JSON.stringify({ ...updates, id }),
    });
    return response.data!;
  },
  
  delete: async (id: number): Promise<void> => {
    await apiRequest(`orders.php?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const authAPI = {
  signIn: async (email: string, password: string): Promise<User> => {
    const response = await apiRequest<User>('auth.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.data!;
  },
  
  getCurrentProfile: async (): Promise<User | null> => {
    // For simple auth, return null (no session management)
    return null;
  },
  
  signOut: async (): Promise<void> => {
    // For simple auth, just clear local state
  },
  
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    // For simple auth, return mock subscription
    return { unsubscribe: () => {} };
  },
};
