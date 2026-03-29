<?php
/**
 * Services Menu API Endpoint
 * Returns services for the frontend navigation dropdown
 */

require_once '../config.php';

// Services data - in a real application, this would come from the database
$services = [
    [
        'id' => 1,
        'title' => 'Doctor Consultation',
        'description' => 'Book appointments with specialist doctors',
        'slug' => 'doctor-consultation',
        'route_url' => '/services/doctor-consultation',
        'icon' => 'stethoscope',
        'order' => 1,
        'active' => true,
        'children' => [
            [
                'id' => 11,
                'title' => 'General Medicine',
                'slug' => 'general-medicine',
                'route_url' => '/services/general-medicine',
                'description' => 'Primary care and general health consultations'
            ],
            [
                'id' => 12,
                'title' => 'Cardiology',
                'slug' => 'cardiology',
                'route_url' => '/services/cardiology',
                'description' => 'Heart and cardiovascular care'
            ],
            [
                'id' => 13,
                'title' => 'Neurology',
                'slug' => 'neurology',
                'route_url' => '/services/neurology',
                'description' => 'Brain and nervous system care'
            ],
            [
                'id' => 14,
                'title' => 'Pediatrics',
                'slug' => 'pediatrics',
                'route_url' => '/services/pediatrics',
                'description' => 'Children healthcare services'
            ]
        ]
    ],
    [
        'id' => 2,
        'title' => 'Telemedicine',
        'description' => 'Online doctor consultations from home',
        'slug' => 'telemedicine',
        'route_url' => '/services/telemedicine',
        'icon' => 'video',
        'order' => 2,
        'active' => true,
        'children' => [
            [
                'id' => 21,
                'title' => 'Video Consultation',
                'slug' => 'video-consultation',
                'route_url' => '/services/video-consultation',
                'description' => 'Face-to-face online consultations'
            ],
            [
                'id' => 22,
                'title' => 'Phone Consultation',
                'slug' => 'phone-consultation',
                'route_url' => '/services/phone-consultation',
                'description' => 'Audio-only consultations'
            ],
            [
                'id' => 23,
                'title' => 'Chat Consultation',
                'slug' => 'chat-consultation',
                'route_url' => '/services/chat-consultation',
                'description' => 'Text-based medical advice'
            ]
        ]
    ],
    [
        'id' => 3,
        'title' => 'Pharmacy',
        'description' => 'Order medicines and health products',
        'slug' => 'pharmacy',
        'route_url' => '/pharmacy',
        'icon' => 'pill',
        'order' => 3,
        'active' => true,
        'children' => [
            [
                'id' => 31,
                'title' => 'Prescription Medicines',
                'slug' => 'prescription-medicines',
                'route_url' => '/pharmacy/prescription',
                'description' => 'Order medicines with prescription'
            ],
            [
                'id' => 32,
                'title' => 'OTC Products',
                'slug' => 'otc-products',
                'route_url' => '/pharmacy/otc',
                'description' => 'Over-the-counter medicines'
            ],
            [
                'id' => 33,
                'title' => 'Health Supplements',
                'slug' => 'health-supplements',
                'route_url' => '/pharmacy/supplements',
                'description' => 'Vitamins and dietary supplements'
            ],
            [
                'id' => 34,
                'title' => 'Medical Devices',
                'slug' => 'medical-devices',
                'route_url' => '/pharmacy/devices',
                'description' => 'Home medical equipment'
            ]
        ]
    ],
    [
        'id' => 4,
        'title' => 'Lab Tests',
        'description' => 'Book diagnostic tests and checkups',
        'slug' => 'lab-tests',
        'route_url' => '/services/lab-tests',
        'icon' => 'flask',
        'order' => 4,
        'active' => true,
        'children' => [
            [
                'id' => 41,
                'title' => 'Blood Tests',
                'slug' => 'blood-tests',
                'route_url' => '/lab/blood-tests',
                'description' => 'Complete blood count and more'
            ],
            [
                'id' => 42,
                'title' => 'Imaging Services',
                'slug' => 'imaging-services',
                'route_url' => '/lab/imaging',
                'description' => 'X-ray, CT, MRI scans'
            ],
            [
                'id' => 43,
                'title' => 'Pathology Tests',
                'slug' => 'pathology-tests',
                'route_url' => '/lab/pathology',
                'description' => 'Tissue and cell analysis'
            ],
            [
                'id' => 44,
                'title' => 'Health Checkup Packages',
                'slug' => 'health-packages',
                'route_url' => '/lab/packages',
                'description' => 'Comprehensive health screening'
            ]
        ]
    ],
    [
        'id' => 5,
        'title' => 'Health Checkup',
        'description' => 'Comprehensive health screening packages',
        'slug' => 'health-checkup',
        'route_url' => '/services/health-checkup',
        'icon' => 'heart',
        'order' => 5,
        'active' => true,
        'children' => [
            [
                'id' => 51,
                'title' => 'Basic Health Package',
                'slug' => 'basic-package',
                'route_url' => '/checkup/basic',
                'description' => 'Essential health screening'
            ],
            [
                'id' => 52,
                'title' => 'Executive Health Package',
                'slug' => 'executive-package',
                'route_url' => '/checkup/executive',
                'description' => 'Comprehensive executive checkup'
            ],
            [
                'id' => 53,
                'title' => 'Women Health Package',
                'slug' => 'women-package',
                'route_url' => '/checkup/women',
                'description' => 'Specialized women health screening'
            ],
            [
                'id' => 54,
                'title' => 'Senior Citizen Package',
                'slug' => 'senior-package',
                'route_url' => '/checkup/senior',
                'description' => 'Age-specific health screening'
            ]
        ]
    ],
    [
        'id' => 6,
        'title' => 'Emergency Care',
        'description' => '24/7 emergency medical services',
        'slug' => 'emergency-care',
        'route_url' => '/emergency',
        'icon' => 'activity',
        'order' => 6,
        'active' => true,
        'children' => [
            [
                'id' => 61,
                'title' => 'Emergency Room',
                'slug' => 'emergency-room',
                'route_url' => '/emergency/room',
                'description' => '24/7 emergency medical care'
            ],
            [
                'id' => 62,
                'title' => 'Trauma Care',
                'slug' => 'trauma-care',
                'route_url' => '/emergency/trauma',
                'description' => 'Specialized trauma treatment'
            ],
            [
                'id' => 63,
                'title' => 'Critical Care',
                'slug' => 'critical-care',
                'route_url' => '/emergency/critical',
                'description' => 'ICU and critical care services'
            ]
        ]
    ],
    [
        'id' => 7,
        'title' => 'Vaccination',
        'description' => 'Immunization and vaccine services',
        'slug' => 'vaccination',
        'route_url' => '/services/vaccination',
        'icon' => 'syringe',
        'order' => 7,
        'active' => true,
        'children' => [
            [
                'id' => 71,
                'title' => 'Child Vaccination',
                'slug' => 'child-vaccination',
                'route_url' => '/vaccination/child',
                'description' => 'Immunization for children'
            ],
            [
                'id' => 72,
                'title' => 'Adult Vaccination',
                'slug' => 'adult-vaccination',
                'route_url' => '/vaccination/adult',
                'description' => 'Vaccines for adults'
            ],
            [
                'id' => 73,
                'title' => 'Travel Vaccination',
                'slug' => 'travel-vaccination',
                'route_url' => '/vaccination/travel',
                'description' => 'Travel-specific vaccines'
            ],
            [
                'id' => 74,
                'title' => 'COVID-19 Vaccination',
                'slug' => 'covid-vaccination',
                'route_url' => '/vaccination/covid',
                'description' => 'COVID-19 vaccine services'
            ]
        ]
    ],
    [
        'id' => 8,
        'title' => 'Medical Records',
        'description' => 'Access and manage your health records',
        'slug' => 'medical-records',
        'route_url' => '/services/medical-records',
        'icon' => 'folder',
        'order' => 8,
        'active' => true,
        'children' => [
            [
                'id' => 81,
                'title' => 'Personal Health Records',
                'slug' => 'personal-records',
                'route_url' => '/records/personal',
                'description' => 'Your personal medical history'
            ],
            [
                'id' => 82,
                'title' => 'Test Reports',
                'slug' => 'test-reports',
                'route_url' => '/records/tests',
                'description' => 'Lab and diagnostic reports'
            ],
            [
                'id' => 83,
                'title' => 'Prescription History',
                'slug' => 'prescription-history',
                'route_url' => '/records/prescriptions',
                'description' => 'Your prescription records'
            ],
            [
                'id' => 84,
                'title' => 'Insurance Records',
                'slug' => 'insurance-records',
                'route_url' => '/records/insurance',
                'description' => 'Insurance claim history'
            ]
        ]
    ]
];

// Filter only active services and sort by order
$activeServices = array_filter($services, function($service) {
    return $service['active'] === true;
});

usort($activeServices, function($a, $b) {
    return $a['order'] - $b['order'];
});

// Return services data
apiResponse([
    'data' => array_values($activeServices),
    'count' => count($activeServices)
]);
?>
