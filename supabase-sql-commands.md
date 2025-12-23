# Supabase SQL Editor Commands

## Basic Products Queries

### 1. View All Products
```sql
SELECT * FROM products ORDER BY created_at DESC;
```

### 2. View Active Products (Not Sold Out)
```sql
SELECT id, name, price, category, image_hint, is_new 
FROM products 
WHERE sold_out = false 
ORDER BY created_at DESC;
```

### 3. View Products by Category
```sql
SELECT id, name, price, category, image_hint, is_new 
FROM products 
WHERE category = 'Snacks' 
ORDER BY price ASC;
```

### 4. View New Products
```sql
SELECT id, name, price, category, image_hint, pack_options 
FROM products 
WHERE is_new = true AND sold_out = false 
ORDER BY created_at DESC;
```

### 5. Search Products by Name
```sql
SELECT id, name, price, category, image_hint 
FROM products 
WHERE name ILIKE '%pringles%' 
ORDER BY name ASC;
```

### 6. View Products with Price Range
```sql
SELECT id, name, price, category, image_hint 
FROM products 
WHERE price BETWEEN 500 AND 2000 
ORDER BY price ASC;
```

### 7. Count Products by Category
```sql
SELECT category, COUNT(*) as count, AVG(price) as avg_price 
FROM products 
WHERE sold_out = false 
GROUP BY category 
ORDER BY count DESC;
```

### 8. View Products with Pack Options
```sql
SELECT id, name, price, category, 
       jsonb_array_length(pack_options) as pack_count 
FROM products 
WHERE jsonb_array_length(pack_options) > 1 
ORDER BY pack_count DESC;
```

### 9. Update Product Status
```sql
UPDATE products 
SET sold_out = true 
WHERE name ILIKE '%specific-product-name%';
```

### 10. Add New Product
```sql
INSERT INTO products (
  id, name, price, image, image_hint, category, sold_out, is_new, pack_options
) VALUES (
  'new-product-' || EXTRACT(EPOCH FROM NOW())::text,
  'New Product Name',
  999,
  '/coffee.jpg',
  'new-product-hint',
  'Category',
  false,
  true,
  '[{"label": "Single", "price": 999, "quantity": 1}]'
);
```

### 11. Delete Product
```sql
DELETE FROM products WHERE id = 'your-product-id';
```

### 12. View Products with Images
```sql
SELECT id, name, price, category, image, image_hint 
FROM products 
WHERE image IS NOT NULL AND image != '' 
ORDER BY created_at DESC;
```

### 13. Update Product Price
```sql
UPDATE products 
SET price = 1299, updated_at = NOW() 
WHERE id = 'your-product-id';
```

### 14. View Recently Updated Products
```sql
SELECT id, name, price, category, updated_at 
FROM products 
WHERE updated_at > NOW() - INTERVAL '24 hours' 
ORDER BY updated_at DESC;
```

### 15. Export Products Data
```sql
SELECT id, name, price, category, sold_out, is_new, 
       image_hint, created_at, updated_at 
FROM products 
ORDER BY category, name;
```

## Banner Queries

### 1. View All Banners
```sql
SELECT * FROM banners ORDER BY sort_order ASC;
```

### 2. View Active Banners
```sql
SELECT id, title, subtitle, position, sort_order 
FROM banners 
WHERE is_active = true 
ORDER BY sort_order ASC;
```

### 3. View Banners by Position
```sql
SELECT id, title, position, sort_order, is_active 
FROM banners 
WHERE position = 'hero' 
ORDER BY sort_order ASC;
```

## Performance & Maintenance

### 1. Check Table Sizes
```sql
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE schemaname = 'public' 
AND tablename IN ('products', 'banners');
```

### 2. Create Index for Better Performance
```sql
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_sold_out ON products(sold_out);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
```

### 3. Clean Old Data (if needed)
```sql
DELETE FROM products 
WHERE created_at < NOW() - INTERVAL '1 year' 
AND sold_out = true;
```

## Quick Test Query
```sql
-- Test if products are fetching correctly
SELECT COUNT(*) as total_products,
       COUNT(CASE WHEN sold_out = false THEN 1 END) as available_products,
       COUNT(CASE WHEN is_new = true THEN 1 END) as new_products
FROM products;
```

Copy and paste these commands directly into your Supabase SQL Editor at:
https://supabase.com/dashboard/project/rljbydjyiewvikneulub/sql
