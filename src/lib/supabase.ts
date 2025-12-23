import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ymbjxpkpzsubzozylmps.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYmp4cGtwenN1YnpvenlsbXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTIxMjYsImV4cCI6MjA4MjA2ODEyNn0.7D2DuX9DwYkjpJn5TmC8ZSonshcuZpXz2TnaedfHg7Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Products CRUD operations
export const productsAPI = {
  // Get all products
  getAll: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Create product (admin only)
  create: async (product: any) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    return { data, error }
  },

  // Update product (admin only)
  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Delete product (admin only)
  delete: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Subscribe to realtime updates
  subscribe: (callback: (payload: any) => void) => {
    return supabase
      .channel('products-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        callback
      )
      .subscribe()
  }
}

// Orders CRUD operations
export const ordersAPI = {
  // Get user orders
  getUserOrders: async (userId: string) => {
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
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Create order
  create: async (order: any, orderItems: any[]) => {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (orderError) return { data: null, error: orderError }

    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems.map(item => ({
        ...item,
        order_id: orderData.id
      })))
      .select()

    return { data: { order: orderData, items: itemsData }, error: itemsError }
  },

  // Subscribe to realtime updates
  subscribe: (callback: (payload: any) => void) => {
    return supabase
      .channel('orders-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        callback
      )
      .subscribe()
  }
}

// Addresses CRUD operations
export const addressesAPI = {
  // Get user addresses
  getUserAddresses: async (userId: string) => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
    return { data, error }
  },

  // Create address
  create: async (address: any) => {
    const { data, error } = await supabase
      .from('addresses')
      .insert([address])
      .select()
    return { data, error }
  },

  // Update address
  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Delete address
  delete: async (id: string) => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Auth helper functions
export const authAPI = {
  // Get current user profile
  getCurrentProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { data: null, error: 'No user' }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    return { data, error }
  },

  // Check if user is admin
  isAdmin: async () => {
    const { data } = await authAPI.getCurrentProfile()
    return data?.role === 'admin'
  },

  // Sign up
  signUp: async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    return { data, error }
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }
}
