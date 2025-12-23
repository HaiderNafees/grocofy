const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rljbydjyiewvikneulub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJ5ZGp5aWV3dmlrbmV1bHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDU0MTEsImV4cCI6MjA4MTg4MTQxMX0.EgIDV6JK8yjnbZkvbStyc3iw8chmNWvgp9kdyi2UqI8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read product data
const fs = require('fs');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

async function importProducts() {
  try {
    console.log('Importing products to Supabase...');
    
    // Convert base64 images to URLs and clean data
    const cleanProducts = products.map(product => {
      // Convert base64 image to simple URL if it's base64
      let imageUrl = product.image;
      if (product.image && product.image.startsWith('data:image')) {
        // Use a placeholder or external URL for now
        imageUrl = '/coffee.jpg';
      }
      
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        image_hint: product.imageHint,
        category: product.category,
        sold_out: product.soldOut || false,
        is_new: product.isNew || false,
        pack_options: product.packOptions || []
      };
    });

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(cleanProducts)
      .select();

    if (error) {
      console.error('Error importing products:', error);
    } else {
      console.log(`Successfully imported ${data.length} products!`);
    }

    // Import banners if they exist
    try {
      const bannersData = fs.readFileSync('./data/banners.json', 'utf8');
      const banners = JSON.parse(bannersData);
      
      const cleanBanners = banners.map(banner => ({
        id: banner.id,
        title: banner.title,
        subtitle: banner.subtitle,
        image: banner.image,
        image_hint: banner.imageHint,
        button_text: banner.buttonText,
        button_link: banner.buttonLink,
        background_color: banner.backgroundColor,
        text_color: banner.textColor,
        position: banner.position,
        is_active: banner.isActive,
        sort_order: banner.sortOrder
      }));

      const { data: bannerData, error: bannerError } = await supabase
        .from('banners')
        .insert(cleanBanners)
        .select();

      if (bannerError) {
        console.error('Error importing banners:', bannerError);
      } else {
        console.log(`Successfully imported ${bannerData.length} banners!`);
      }
    } catch (err) {
      console.log('No banners file found, skipping banners import');
    }

  } catch (error) {
    console.error('Import failed:', error);
  }
}

importProducts();
