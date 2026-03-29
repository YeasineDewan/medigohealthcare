<?php
/**
 * Emergency Services Menu API Endpoint
 * Returns emergency services for the frontend navigation dropdown
 */

require_once '../config.php';

// Emergency services data - in a real application, this would come from the database
$emergencyServices = [
    [
        'id' => 1,
        'title' => 'Emergency Room',
        'description' => '24/7 emergency medical care',
        'slug' => 'emergency-room',
        'route_url' => '/emergency/room',
        'icon' => 'activity',
        'order' => 1,
        'active' => true,
        'hotline' => '999'
    ],
    [
        'id' => 2,
        'title' => 'Ambulance Service',
        'description' => 'Rapid ambulance transportation',
        'slug' => 'ambulance',
        'route_url' => '/emergency/ambulance',
        'icon' => 'truck',
        'order' => 2,
        'active' => true,
        'hotline' => '998'
    ],
    [
        'id' => 3,
        'title' => 'Critical Care',
        'description' => 'ICU and critical care services',
        'slug' => 'critical-care',
        'route_url' => '/emergency/critical-care',
        'icon' => 'heart',
        'order' => 3,
        'active' => true,
        'hotline' => '997'
    ],
    [
        'id' => 4,
        'title' => 'Trauma Center',
        'description' => 'Specialized trauma care',
        'slug' => 'trauma-center',
        'route_url' => '/emergency/trauma',
        'icon' => 'shield',
        'order' => 4,
        'active' => true,
        'hotline' => '996'
    ],
    [
        'id' => 5,
        'title' => 'Emergency Surgery',
        'description' => '24/7 surgical emergency services',
        'slug' => 'emergency-surgery',
        'route_url' => '/emergency/surgery',
        'icon' => 'scissors',
        'order' => 5,
        'active' => true,
        'hotline' => '995'
    ]
];

// Filter only active services and sort by order
$activeServices = array_filter($emergencyServices, function($service) {
    return $service['active'] === true;
});

usort($activeServices, function($a, $b) {
    return $a['order'] - $b['order'];
});

// Return emergency services data
apiResponse([
    'data' => array_values($activeServices),
    'count' => count($activeServices)
]);
?>
