const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

async function debugFetch() {
  try {
    console.log('Testing fetch with exact same logic as frontend...');
    
    // Simulate the exact fetch logic from product-context.tsx
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return;
    }

    console.log('Raw data count:', data?.length || 0);
    
    // Simulate the transformation logic
    const transformedData = (data || []).map(product => {
      try {
        return {
          ...product,
          imageHint: product.image_hint,
          soldOut: product.sold_out,
          isNew: product.is_new,
          packOptions: typeof product.pack_options === 'string' 
            ? JSON.parse(product.pack_options) 
            : product.pack_options
        };
      } catch (parseError) {
        console.error('Error parsing pack_options for product:', product.id, parseError);
        return {
          ...product,
          imageHint: product.image_hint,
          soldOut: product.sold_out,
          isNew: product.is_new,
          packOptions: []
        };
      }
    });
    
    console.log('Transformed data count:', transformedData.length);
    console.log('Sample product:', transformedData[0]);
    
    // Check if any products have issues
    const issues = transformedData.filter(p => !p.packOptions || p.packOptions.length === 0);
    if (issues.length > 0) {
      console.log('Products with packOptions issues:', issues.length);
      console.log('First issue:', issues[0]);
    }
    
  } catch (err) {
    console.error('Debug fetch failed:', err);
  }
}

debugFetch();
