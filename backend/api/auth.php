<?php
require_once '../config.php';

$method = getMethod();

switch ($method) {
    case 'POST':
        handleAuth();
        break;
    default:
        sendError('Method not allowed', 405);
}

function handleAuth() {
    try {
        $input = getJsonInput();
        
        // Validate required fields
        if (!isset($input['email']) || !isset($input['password'])) {
            sendError('Email and password are required');
        }
        
        $email = $input['email'];
        $password = $input['password'];
        
        // Simple authentication - check against hardcoded admin credentials
        // In production, you might want to store users in a JSON file
        $adminEmail = 'admin@store.com';
        $adminPassword = 'Admin7989'; // Change this in production
        
        if ($email === $adminEmail && $password === $adminPassword) {
            // Admin login successful
            $user = [
                'id' => 1,
                'email' => $email,
                'full_name' => 'Admin User',
                'role' => 'admin',
                'isAuthenticated' => true
            ];
            
            sendSuccess($user, 'Admin login successful');
        } else {
            // Check for regular user (simple demo)
            $userEmail = 'user@grocofy.com';
            $userPassword = 'user123';
            
            if ($email === $userEmail && $password === $userPassword) {
                $user = [
                    'id' => 2,
                    'email' => $email,
                    'full_name' => 'Regular User',
                    'role' => 'user',
                    'isAuthenticated' => true
                ];
                
                sendSuccess($user, 'User login successful');
            } else {
                sendError('Invalid email or password', 401);
            }
        }
    } catch (Exception $e) {
        sendError('Authentication failed: ' . $e->getMessage());
    }
}
?>
