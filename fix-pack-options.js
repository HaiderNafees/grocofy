const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixPackOptions() {
  try {
    console.log('Fixing pack_options JSON format...');
    
    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, pack_options');
    
    if (fetchError) {
      console.error('Error fetching products:', fetchError);
      return;
    }
    
    console.log(`Found ${products.length} products to fix`);
    
    // Fix each product's pack_options
    for (const product of products) {
      try {
        // Convert the malformed JSON string to proper JSON
        let packOptionsString = product.pack_options;
        
        // Fix the JSON by adding quotes around property names
        const fixedJson = packOptionsString
          .replace(/(\w+):/g, '"$1":')  // Add quotes to property names
          .replace(/'/g, '"')           // Replace single quotes with double quotes
          .replace(/\s+/g, ' ')         // Clean up whitespace
          .trim();
        
        // Parse and stringify to ensure valid JSON
        const parsedOptions = JSON.parse(fixedJson);
        const validJsonString = JSON.stringify(parsedOptions);
        
        // Update the product
        const { error: updateError } = await supabase
          .from('products')
          .update({ pack_options: validJsonString })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`Error updating product ${product.id}:`, updateError);
        } else {
          console.log(`Fixed product ${product.id}`);
        }
        
      } catch (parseError) {
        console.error(`Error fixing product ${product.id}:`, parseError.message);
        
        // Set a default pack_options if parsing fails
        const defaultOptions = JSON.stringify([
          { quantity: 1, price: 999, label: 'Single' }
        ]);
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ pack_options: defaultOptions })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`Error setting default for product ${product.id}:`, updateError);
        } else {
          console.log(`Set default pack_options for product ${product.id}`);
        }
      }
    }
    
    console.log('Fix completed!');
    
  } catch (error) {
    console.error('Fix failed:', error);
  }
}

fixPackOptions();
