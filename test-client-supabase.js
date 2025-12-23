// Test if Supabase client works in browser environment
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testClientConnection() {
  try {
    console.log('Testing client-side Supabase connection...');
    
    // Test a simple select
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .single();
    
    if (error) {
      console.error('Client connection error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('Client connection successful!');
      console.log('Data:', data);
    }
    
    // Test insert
    console.log('Testing insert...');
    const testProduct = {
      id: 'test-product-' + Date.now(),
      name: 'Test Product',
      price: 999,
      image: '/test.jpg',
      image_hint: 'test product',
      category: 'Test',
      sold_out: false,
      is_new: true,
      pack_options: JSON.stringify([{quantity: 1, price: 999, label: 'Single'}])
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('products')
      .insert([testProduct])
      .select();
    
    if (insertError) {
      console.error('Insert error:', insertError);
      console.error('Insert error details:', JSON.stringify(insertError, null, 2));
    } else {
      console.log('Insert successful!');
      console.log('Inserted data:', insertData);
      
      // Clean up test product
      await supabase
        .from('products')
        .delete()
        .eq('id', testProduct.id);
    }
    
  } catch (err) {
    console.error('Test failed:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
  }
}

testClientConnection();
