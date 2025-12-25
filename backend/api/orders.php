<?php
require_once '../config.php';

$method = getMethod();

switch ($method) {
    case 'GET':
        handleGetOrders();
        break;
    case 'POST':
        handleCreateOrder();
        break;
    case 'PUT':
        handleUpdateOrder();
        break;
    case 'DELETE':
        handleDeleteOrder();
        break;
    default:
        sendError('Method not allowed', 405);
}

function handleGetOrders() {
    try {
        if (!isset($_GET['user_id'])) {
            sendError('User ID is required');
        }
        
        $orders = readJsonFile('orders.json');
        $userId = $_GET['user_id'];
        
        // Filter orders by user_id
        $userOrders = array_filter($orders, function($order) use ($userId) {
            return isset($order['user_id']) && $order['user_id'] == $userId;
        });
        
        // Re-index array
        $userOrders = array_values($userOrders);
        
        sendSuccess($userOrders, 'Orders retrieved successfully');
    } catch (Exception $e) {
        sendError('Failed to get orders: ' . $e->getMessage());
    }
}

function handleCreateOrder() {
    try {
        $input = getJsonInput();
        
        // Validate required fields
        $required = ['user_id', 'items', 'total', 'shipping_address'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                sendError("Missing required field: $field");
            }
        }
        
        $orders = readJsonFile('orders.json');
        
        // Generate new ID
        $newId = count($orders) > 0 ? max(array_column($orders, 'id')) + 1 : 1;
        
        // Create new order
        $newOrder = [
            'id' => $newId,
            'user_id' => $input['user_id'],
            'items' => $input['items'],
            'total' => (float)$input['total'],
            'status' => 'pending',
            'shipping_address' => $input['shipping_address'],
            'payment_method' => $input['payment_method'] ?? 'cash_on_delivery',
            'created_at' => date('c'),
            'updated_at' => date('c')
        ];
        
        $orders[] = $newOrder;
        writeJsonFile('orders.json', $orders);
        
        sendSuccess($newOrder, 'Order created successfully');
    } catch (Exception $e) {
        sendError('Failed to create order: ' . $e->getMessage());
    }
}

function handleUpdateOrder() {
    try {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendError('Order ID is required');
        }
        
        $orders = readJsonFile('orders.json');
        $orderId = $input['id'];
        $orderIndex = -1;
        
        // Find order
        foreach ($orders as $index => $order) {
            if ($order['id'] == $orderId) {
                $orderIndex = $index;
                break;
            }
        }
        
        if ($orderIndex === -1) {
            sendError('Order not found', 404);
        }
        
        // Update order
        $updatedOrder = array_merge($orders[$orderIndex], $input);
        $updatedOrder['updated_at'] = date('c');
        
        $orders[$orderIndex] = $updatedOrder;
        writeJsonFile('orders.json', $orders);
        
        sendSuccess($updatedOrder, 'Order updated successfully');
    } catch (Exception $e) {
        sendError('Failed to update order: ' . $e->getMessage());
    }
}

function handleDeleteOrder() {
    try {
        if (!isset($_GET['id'])) {
            sendError('Order ID is required');
        }
        
        $orders = readJsonFile('orders.json');
        $orderId = $_GET['id'];
        $orderIndex = -1;
        
        // Find order
        foreach ($orders as $index => $order) {
            if ($order['id'] == $orderId) {
                $orderIndex = $index;
                break;
            }
        }
        
        if ($orderIndex === -1) {
            sendError('Order not found', 404);
        }
        
        // Remove order
        array_splice($orders, $orderIndex, 1);
        writeJsonFile('orders.json', $orders);
        
        sendSuccess(null, 'Order deleted successfully');
    } catch (Exception $e) {
        sendError('Failed to delete order: ' . $e->getMessage());
    }
}
?>
