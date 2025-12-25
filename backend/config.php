<?php
// Backend Configuration
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Base paths
define('BASE_PATH', __DIR__);
define('DATA_PATH', BASE_PATH . '/data');

// Error handling
function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

// Success response
function sendSuccess($data = null, $message = 'Success') {
    echo json_encode([
        'success' => true,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// Read JSON file
function readJsonFile($filename) {
    $filepath = DATA_PATH . '/' . $filename;
    if (!file_exists($filepath)) {
        sendError('File not found: ' . $filename, 404);
    }
    
    $json = file_get_contents($filepath);
    if ($json === false) {
        sendError('Failed to read file: ' . $filename, 500);
    }
    
    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendError('Invalid JSON in file: ' . $filename, 500);
    }
    
    return $data;
}

// Write JSON file
function writeJsonFile($filename, $data) {
    $filepath = DATA_PATH . '/' . $filename;
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    if (file_put_contents($filepath, $json) === false) {
        sendError('Failed to write file: ' . $filename, 500);
    }
    
    return true;
}

// Get request method
function getMethod() {
    return $_SERVER['REQUEST_METHOD'];
}

// Get JSON input
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

// Simple authentication check
function checkAuth() {
    // For now, just return true (simple auth)
    // In production, you might want to add a simple token check
    return true;
}
?>
