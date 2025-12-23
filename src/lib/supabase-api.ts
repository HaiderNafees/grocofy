// Supabase API client replacing Firebase/PHP backend
import { supabase } from './supabase';

// Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  featured?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id?: string;
  user_id: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: any;
  created_at?: string;
  updated_at?: string;
}

// Helper function to check if user is admin
export const isAdminUser = (user: User | null): boolean => {
  return user?.role === 'admin';
};

// Helper function to check if user exists in admins table
export const isAdmin = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Authentication API
export const authAPI = {
  // Sign in
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Get user profile data
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        // If no profile exists, create one
        if (!profile) {
          const newProfile = {
            id: data.user.id,
            email: data.user.email!,
            display_name: data.user.user_metadata?.full_name || '',
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();
            
          if (createError) throw createError;
          return createdProfile as User;
        }
        
        return profile as User;
      }
      
      throw new Error('No user data returned');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign up
  signUp: async (email: string, password: string, displayName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName || ''
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const profileData = {
          id: data.user.id,
          email: data.user.email!,
          display_name: displayName || '',
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert([profileData])
          .select()
          .single();
          
        if (profileError) throw profileError;
        return profile as User;
      }
      
      throw new Error('No user data returned');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return profile as User || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // On auth state change
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          callback(profile as User || null);
        } catch (error) {
          console.error('Error getting user profile:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Create product (admin only)
  create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const productData = {
        ...product,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();
        
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product (admin only)
  update: async (id: string, updates: Partial<Product>) => {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (admin only)
  delete: async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get featured products
  getFeatured: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw error;
    }
  },

  // Get products by category
  getByCategory: async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('active', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  }
};

// Orders API
export const ordersAPI = {
  // Get all orders (admin only)
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Order[];
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as Order;
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },

  // Create order
  create: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const orderData = {
        ...order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
        
      if (error) throw error;
      return data as Order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order status (admin only)
  update: async (id: string, updates: Partial<Order>) => {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as Order;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Delete order (admin only)
  delete: async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // Get user's orders
  getUserOrders: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Order[];
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  }
};

// Users API (admin functions)
export const usersAPI = {
  // Get all users (admin only)
  getAll: async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as User[];
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Update user (admin only)
  update: async (id: string, updates: Partial<User>): Promise<User> => {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete user (admin only)
  delete: async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Update user role (admin only)
  updateRole: async (id: string, role: 'admin' | 'user'): Promise<User> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          role,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }
};

// Storage API for images
export const storageAPI = {
  // Upload image
  uploadImage: async (file: File, path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('products')
        .upload(path, file);
        
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(path);
        
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image
  deleteImage: async (path: string) => {
    try {
      const { error } = await supabase.storage
        .from('products')
        .remove([path]);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};
