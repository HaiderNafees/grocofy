const fs = require('fs');

// Read the products data directly from the TypeScript file
const content = fs.readFileSync('./src/lib/data.ts', 'utf8');

// Extract the products array using regex
const productsArrayMatch = content.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
if (!productsArrayMatch) {
  console.error('Could not find products array');
  process.exit(1);
}

const productsText = productsArrayMatch[1];

// Parse individual product objects
const productRegex = /{\s*id:\s*['"`]([^'"`]+)['"`],\s*name:\s*['"`]([^'"`]+)['"`],\s*price:\s*(\d+),\s*image:\s*['"`]([^'"`]+)['"`],\s*imageHint:\s*['"`]([^'"`]+)['"`],\s*category:\s*['"`]([^'"`]+)['"`],\s*isNew:\s*(true|false),\s*packOptions:\s*(\[[\s\S]*?\])\s*}/g;

const products = [];
let match;
while ((match = productRegex.exec(productsText)) !== null) {
  products.push({
    id: match[1],
    name: match[2],
    price: parseInt(match[3]),
    image: match[4],
    imageHint: match[5],
    category: match[6],
    isNew: match[7] === 'true',
    soldOut: false, // Default value
    packOptions: match[8]
  });
}

console.log(`Extracted ${products.length} products`);

// Generate SQL INSERT statements
const sqlStatements = products.map((product) => {
  // Escape single quotes in strings
  const escapedName = product.name.replace(/'/g, "''");
  const escapedImage = product.image.replace(/'/g, "''");
  const escapedImageHint = product.imageHint.replace(/'/g, "''");
  const escapedCategory = product.category.replace(/'/g, "''");
  
  // Convert packOptions to valid JSON and escape single quotes
  const packOptionsJson = JSON.stringify(product.packOptions || []);
  const escapedPackOptions = packOptionsJson.replace(/'/g, "''");
  
  return `('${product.id}', '${escapedName}', ${product.price}, '${escapedImage}', '${escapedImageHint}', '${escapedCategory}', ${product.soldOut}, ${product.isNew}, '${escapedPackOptions}'::jsonb, NOW(), NOW())`;
});

// Create the complete SQL command
const sqlCommand = `-- Insert all ${products.length} products into Supabase
DELETE FROM products; -- Clear existing data first

INSERT INTO products (
  id, name, price, image, image_hint, category, sold_out, is_new, pack_options, created_at, updated_at
) VALUES
${sqlStatements.join(',\n')};`;

// Save to file
fs.writeFileSync('./insert-all-products.sql', sqlCommand);
console.log('SQL command saved to insert-all-products.sql');
console.log(`Ready to execute in Supabase SQL Editor!`);
console.log(`Total products: ${products.length}`);
