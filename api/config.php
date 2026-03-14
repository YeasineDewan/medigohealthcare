<?php
/**
 * Medigo Healthcare API Configuration
 * Database connection and API settings
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'medigo_healthcare');
define('DB_USER', 'your_db_username'); // Change this
define('DB_PASS', 'your_db_password'); // Change this
define('DB_CHARSET', 'utf8mb4');

// API Configuration
define('API_BASE_URL', 'http://localhost/medigo/api');
define('API_VERSION', 'v1');
define('JWT_SECRET', 'your-super-secret-jwt-key-here'); // Change this
define('JWT_EXPIRY', 86400); // 24 hours

// CORS Settings
define('ALLOWED_ORIGINS', ['http://localhost:5173', 'http://localhost:3000']);
define('ALLOWED_METHODS', 'GET, POST, PUT, DELETE, OPTIONS');
define('ALLOWED_HEADERS', 'Content-Type, Authorization, X-Requested-With');

// File Upload Settings
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx']);

// Email Settings (for notifications)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com'); // Change this
define('SMTP_PASSWORD', 'your-app-password'); // Change this
define('FROM_EMAIL', 'noreply@medigohealthcare.com');
define('FROM_NAME', 'Medigo Healthcare');

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 1); // Set to 0 in production

// Timezone
date_default_timezone_set('UTC');

// Start session
session_start();

// Database Connection Class
class Database {
    private static $instance = null;
    private $connection;
    
    public function __construct() {
        $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
        
        $this->connection->set_charset(DB_CHARSET);
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->connection->prepare($sql);
        
        if ($params) {
            $types = str_repeat('s', count($params));
            $stmt->bind_param($types, ...$params);
        }
        
        $stmt->execute();
        return $stmt;
    }
    
    public function fetch($sql, $params = []) {
        $result = $this->query($sql, $params);
        return $result->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    
    public function fetchOne($sql, $params = []) {
        $result = $this->query($sql, $params);
        return $result->get_result()->fetch_assoc();
    }
    
    public function insert($table, $data) {
        $columns = array_keys($data);
        $placeholders = array_fill(0, count($columns), '?');
        
        $sql = "INSERT INTO $table (" . implode(', ', $columns) . ") 
                VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $this->query($sql, array_values($data));
        
        return $stmt->insert_id;
    }
    
    public function update($table, $data, $where, $whereParams = []) {
        $columns = array_keys($data);
        $placeholders = array_fill(0, count($columns), '?');
        
        $setClause = [];
        foreach ($columns as $column) {
            $setClause[] = "$column = ?";
        }
        
        $sql = "UPDATE $table SET " . implode(', ', $setClause) . " WHERE $where";
        $params = array_merge(array_values($data), $whereParams);
        
        $stmt = $this->query($sql, $params);
        
        return $stmt->affected_rows;
    }
    
    public function delete($table, $where, $params = []) {
        $sql = "DELETE FROM $table WHERE $where";
        $stmt = $this->query($sql, $params);
        
        return $stmt->affected_rows;
    }
}

// CORS Headers
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: ' . implode(', ', ALLOWED_ORIGINS));
    header('Access-Control-Allow-Methods: ' . ALLOWED_METHODS);
    header('Access-Control-Allow-Headers: ' . ALLOWED_HEADERS);
    header('Content-Type: application/json');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// JWT Helper Functions
function generateJWT($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($payload);
    
    $headerEncoded = base64url_encode($header);
    $payloadEncoded = base64url_encode($payload);
    
    $signature = hash_hmac('sha256', $headerEncoded . "." . $payloadEncoded, JWT_SECRET, true);
    $signatureEncoded = base64url_encode($signature);
    
    return $headerEncoded . "." . $payloadEncoded . "." . $signatureEncoded;
}

function validateJWT($token) {
    $parts = explode('.', $token);
    
    if (count($parts) !== 3) {
        return false;
    }
    
    $header = base64url_decode($parts[0]);
    $payload = base64url_decode($parts[1]);
    $signature = $parts[2];
    
    $signatureValid = hash_hmac('sha256', $parts[0] . "." . $parts[1], JWT_SECRET, true);
    $signatureValid = base64url_encode($signatureValid);
    
    if ($signatureValid !== $signature) {
        return false;
    }
    
    $payload = json_decode($payload, true);
    
    if ($payload['exp'] < time()) {
        return false;
    }
    
    return $payload;
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

// API Response Helper
function apiResponse($data, $status = 200, $message = 'Success') {
    http_response_code($status);
    echo json_encode([
        'status' => $status < 400 ? 'success' : 'error',
        'message' => $message,
        'data' => $data
    ]);
    exit();
}

// Error Handler
function apiError($message, $status = 400, $data = null) {
    apiResponse($data, $status, $message);
}

// Get current user from JWT
function getCurrentUser() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
        return null;
    }
    
    $token = substr($authHeader, 7);
    $payload = validateJWT($token);
    
    return $payload ? $payload : null;
}

// File Upload Helper
function uploadFile($file, $subfolder = 'general') {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('File upload error');
    }
    
    $allowedTypes = explode(',', ALLOWED_FILE_TYPES);
    $fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($fileExt, $allowedTypes)) {
        throw new Exception('File type not allowed');
    }
    
    if ($file['size'] > MAX_FILE_SIZE) {
        throw new Exception('File too large');
    }
    
    $uploadDir = UPLOAD_PATH . $subfolder . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $fileName = uniqid() . '.' . $fileExt;
    $filePath = $uploadDir . $fileName;
    
    if (!move_uploaded_file($file['tmp_name'], $filePath)) {
        throw new Exception('Failed to move uploaded file');
    }
    
    return $subfolder . '/' . $fileName;
}

// Initialize database connection
$db = Database::getInstance();

// Set CORS headers for all requests
setCorsHeaders();
?>
