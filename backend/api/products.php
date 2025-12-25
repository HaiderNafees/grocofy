<?php
require_once '../config.php';

$method = getMethod();

switch ($method) {
    case 'GET':
        handleGetProducts();
        break;
    case 'POST':
        handleCreateProduct();
        break;
    case 'PUT':
        handleUpdateProduct();
        break;
    case 'DELETE':
        handleDeleteProduct();
        break;
    default:
        sendError('Method not allowed', 405);
}

function handleGetProducts() {
    try {
        $products = readJsonFile('products.json');
        
        // Filter out inactive products
        $activeProducts = array_filter($products, function($product) {
            return isset($product['active']) && $product['active'] === true;
        });
        
        // Re-index array
        $activeProducts = array_values($activeProducts);
        
        sendSuccess($activeProducts, 'Products retrieved successfully');
    } catch (Exception $e) {
        sendError('Failed to get products: ' . $e->getMessage());
    }
}

function handleCreateProduct() {
    try {
        $input = getJsonInput();
        
        // Validate required fields
        $required = ['name', 'price', 'category'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                sendError("Missing required field: $field");
            }
        }
        
        $products = readJsonFile('products.json');
        
        // Generate new ID
        $newId = count($products) > 0 ? max(array_column($products, 'id')) + 1 : 1;
        
        // Create new product
        $newProduct = [
            'id' => $newId,
            'name' => $input['name'],
            'price' => (float)$input['price'],
            'category' => $input['category'],
            'image' => $input['image'] ?? '/pics/default.jpg',
            'imageHint' => $input['imageHint'] ?? 'default',
            'description' => $input['description'] ?? '',
            'soldOut' => $input['soldOut'] ?? false,
            'isNew' => $input['isNew'] ?? false,
            'packOptions' => $input['packOptions'] ?? [['size' => 'One Size', 'price' => $input['price'], 'stock' => 10]],
            'active' => true,
            'created_at' => date('c')
        ];
        
        $products[] = $newProduct;
        writeJsonFile('products.json', $products);
        
        sendSuccess($newProduct, 'Product created successfully');
    } catch (Exception $e) {
        sendError('Failed to create product: ' . $e->getMessage());
    }
}

function handleUpdateProduct() {
    try {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendError('Product ID is required');
        }
        
        $products = readJsonFile('products.json');
        $productId = $input['id'];
        $productIndex = -1;
        
        // Find product
        foreach ($products as $index => $product) {
            if ($product['id'] == $productId) {
                $productIndex = $index;
                break;
            }
        }
        
        if ($productIndex === -1) {
            sendError('Product not found', 404);
        }
        
        // Update product
        $updatedProduct = array_merge($products[$productIndex], $input);
        $updatedProduct['updated_at'] = date('c');
        
        $products[$productIndex] = $updatedProduct;
        writeJsonFile('products.json', $products);
        
        sendSuccess($updatedProduct, 'Product updated successfully');
    } catch (Exception $e) {
        sendError('Failed to update product: ' . $e->getMessage());
    }
}

function handleDeleteProduct() {
    try {
        if (!isset($_GET['id'])) {
            sendError('Product ID is required');
        }
        
        $products = readJsonFile('products.json');
        $productId = $_GET['id'];
        $productIndex = -1;
        
        // Find product
        foreach ($products as $index => $product) {
            if ($product['id'] == $productId) {
                $productIndex = $index;
                break;
            }
        }
        
        if ($productIndex === -1) {
            sendError('Product not found', 404);
        }
        
        // Remove product
        array_splice($products, $productIndex, 1);
        writeJsonFile('products.json', $products);
        
        sendSuccess(null, 'Product deleted successfully');
    } catch (Exception $e) {
        sendError('Failed to delete product: ' . $e->getMessage());
    }
}
?>
