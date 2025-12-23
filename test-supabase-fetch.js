const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  try {
    console.log('Testing Supabase fetch...');
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success! Found products:');
      console.log('Count:', data.length);
      console.log('Sample product:', data[0]);
    }
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testFetch();
