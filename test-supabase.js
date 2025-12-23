const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('products').select('count').single();
    
    if (error) {
      console.error('Connection failed:', error);
    } else {
      console.log('Connection successful!');
      console.log('Products count:', data);
    }
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testConnection();
