const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  try {
    console.log('Checking products table...');
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (productError) {
      console.error('Products table error:', productError);
    } else {
      console.log('Products table OK. Sample data:', products[0]);
    }

    console.log('\nChecking banners table...');
    const { data: banners, error: bannerError } = await supabase
      .from('banners')
      .select('*')
      .limit(1);
    
    if (bannerError) {
      console.error('Banners table error:', bannerError);
    } else {
      console.log('Banners table OK. Sample data:', banners[0]);
    }

    console.log('\nChecking table info...');
    const { data: tables } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    console.log('Available tables:', tables);

  } catch (err) {
    console.error('Check failed:', err);
  }
}

checkTables();
