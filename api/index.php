<?php
/**
 * Medigo Healthcare API Router
 * Main API entry point with routing
 */

require_once 'config.php';

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api/v1', '', $path);
$path = trim($path, '/');

// Route mapping
$routes = [
    // Authentication
    'POST /auth/login' => 'auth/login.php',
    'POST /auth/register' => 'auth/register.php',
    'POST /auth/logout' => 'auth/logout.php',
    'POST /auth/refresh' => 'auth/refresh.php',
    
    // Users
    'GET /users' => 'users/list.php',
    'GET /users/profile' => 'users/profile.php',
    'PUT /users/profile' => 'users/update_profile.php',
    'GET /users/{id}' => 'users/get.php',
    'PUT /users/{id}' => 'users/update.php',
    'DELETE /users/{id}' => 'users/delete.php',
    
    // Admin Menu
    'GET /admin/menu' => 'admin/menu.php',
    
    // Video Carousel
    'GET /video-carousel' => 'video-carousel/list.php',
    'GET /video-carousel/{id}' => 'video-carousel/get.php',
    'POST /video-carousel' => 'video-carousel/create.php',
    'PUT /video-carousel/{id}' => 'video-carousel/update.php',
    'DELETE /video-carousel/{id}' => 'video-carousel/delete.php',
    'PUT /video-carousel/{id}/reorder' => 'video-carousel/reorder.php',
    
    // Appointments
    'GET /appointments' => 'appointments/list.php',
    'GET /appointments/{id}' => 'appointments/get.php',
    'POST /appointments' => 'appointments/create.php',
    'PUT /appointments/{id}' => 'appointments/update.php',
    'DELETE /appointments/{id}' => 'appointments/delete.php',
    
    // Patients
    'GET /patients' => 'patients/list.php',
    'GET /patients/{id}' => 'patients/get.php',
    'POST /patients' => 'patients/create.php',
    'PUT /patients/{id}' => 'patients/update.php',
    'DELETE /patients/{id}' => 'patients/delete.php',
    'GET /patients/{id}/history' => 'patients/medical_history.php',
    
    // Doctors
    'GET /doctors' => 'doctors/list.php',
    'GET /doctors/{id}' => 'doctors/get.php',
    'GET /doctors/{id}/schedule' => 'doctors/schedule.php',
    'GET /doctors/{id}/appointments' => 'doctors/appointments.php',
    
    // Medical Records
    'GET /medical-history' => 'medical/list.php',
    'POST /medical-history' => 'medical/create.php',
    'GET /prescriptions' => 'prescriptions/list.php',
    'POST /prescriptions' => 'prescriptions/create.php',
    'GET /prescriptions/{id}' => 'prescriptions/get.php',
    
    // Lab Tests
    'GET /lab-tests' => 'lab/tests.php',
    'POST /lab-orders' => 'lab/create_order.php',
    'GET /lab-orders' => 'lab/orders.php',
    'PUT /lab-orders/{id}/results' => 'lab/add_results.php',
    
    // Billing
    'GET /bills' => 'billing/list.php',
    'GET /bills/{id}' => 'billing/get.php',
    'POST /bills' => 'billing/create.php',
    'POST /payments' => 'billing/payment.php',
    
    // Inventory
    'GET /products' => 'inventory/products.php',
    'GET /products/{id}' => 'inventory/product.php',
    'POST /products' => 'inventory/create_product.php',
    'PUT /products/{id}' => 'inventory/update_product.php',
    'GET /inventory/stock' => 'inventory/stock.php',
    
    // HR
    'GET /employees' => 'hr/employees.php',
    'GET /employees/{id}' => 'hr/employee.php',
    'POST /attendance' => 'hr/attendance.php',
    'GET /attendance' => 'hr/attendance_list.php',
    'GET /salary' => 'hr/salary.php',
    
    // Banners
    'GET /banners' => 'marketing/banners.php',
    'POST /banners' => 'marketing/create_banner.php',
    'PUT /banners/{id}' => 'marketing/update_banner.php',
    'DELETE /banners/{id}' => 'marketing/delete_banner.php',
    
    // Reports
    'GET /reports/daily-revenue' => 'reports/daily_revenue.php',
    'GET /reports/patient-stats' => 'reports/patient_stats.php',
    'GET /reports/doctor-stats' => 'reports/doctor_stats.php',
    'GET /reports/appointment-stats' => 'reports/appointment_stats.php',
];

// Route matching function
function matchRoute($path, $method) {
    global $routes;
    
    foreach ($routes as $route => $handler) {
        list($routeMethod, $routePath) = explode(' ', $route, 2);
        
        if ($routeMethod !== $method) {
            continue;
        }
        
        // Convert route path to regex pattern
        $pattern = preg_replace('/\{[^}]+\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';
        
        if (preg_match($pattern, $path, $matches)) {
            // Extract path parameters
            $params = array_slice($matches, 1);
            
            // Extract parameter names from route
            preg_match_all('/\{([^}]+)\}/', $routePath, $paramNames);
            $paramNames = $paramNames[1];
            
            // Combine parameter names with values
            $routeParams = array_combine($paramNames, $params);
            
            return [
                'handler' => $handler,
                'params' => $routeParams
            ];
        }
    }
    
    return null;
}

// Try to match the route
$matchedRoute = matchRoute($path, $method);

if ($matchedRoute) {
    $handler = $matchedRoute['handler'];
    $params = $matchedRoute['params'];
    
    // Store parameters in global scope for handlers to use
    $_ROUTE_PARAMS = $params;
    
    // Include the handler file
    $handlerFile = __DIR__ . '/' . $handler;
    
    if (file_exists($handlerFile)) {
        require_once $handlerFile;
    } else {
        apiError('Handler not found', 404);
    }
} else {
    // Try to serve static files or return 404
    if ($method === 'GET' && file_exists(__DIR__ . '/public/' . $path)) {
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $mimeTypes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'ico' => 'image/x-icon'
        ];
        
        if (isset($mimeTypes[$extension])) {
            header('Content-Type: ' . $mimeTypes[$extension]);
            readfile(__DIR__ . '/public/' . $path);
        } else {
            apiError('File not found', 404);
        }
    } else {
        apiError('Endpoint not found', 404);
    }
}
?>
