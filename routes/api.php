<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\AdminMenuController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\LabTestController;
use App\Http\Controllers\Api\LabTestBookingController;
use App\Http\Controllers\Api\LabTestCategoryController;
use App\Http\Controllers\Api\LabSampleCollectionController;
use App\Http\Controllers\Api\LabTestResultController;
use App\Http\Controllers\Api\LabEquipmentController;
use App\Http\Controllers\Api\LabQualityControlController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MedicalDeviceController;
use App\Http\Controllers\Api\PharmacyOrderController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\DoctorProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Medigo Healthcare
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Admin Menu
    Route::get('/admin/menu', [AdminMenuController::class, 'index']);
    
    // Settings Routes
    Route::prefix('settings')->group(function () {
        // General Settings
        Route::get('/general', [SettingsController::class, 'getGeneralSettings']);
        Route::put('/general', [SettingsController::class, 'updateGeneralSettings']);
        
        // User Management
        Route::get('/users', [SettingsController::class, 'getUsers']);
        Route::post('/users', [SettingsController::class, 'createUser']);
        Route::put('/users/{id}', [SettingsController::class, 'updateUser']);
        Route::delete('/users/{id}', [SettingsController::class, 'deleteUser']);
        
        // Roles & Permissions
        Route::get('/roles-permissions', [SettingsController::class, 'getRolesPermissions']);
        Route::post('/roles', [SettingsController::class, 'createRole']);
        Route::put('/roles/{id}', [SettingsController::class, 'updateRolePermissions']);
        Route::delete('/roles/{id}', [SettingsController::class, 'deleteRole']);
        
        // System Configuration
        Route::get('/system', [SettingsController::class, 'getSystemConfig']);
        Route::put('/system', [SettingsController::class, 'updateSystemConfig']);
        Route::post('/system/api-key', [SettingsController::class, 'generateApiKey']);
        Route::delete('/system/api-key', [SettingsController::class, 'deleteApiKey']);
        Route::post('/system/maintenance', [SettingsController::class, 'toggleMaintenanceMode']);
        Route::post('/system/clear-cache', [SettingsController::class, 'clearCache']);
        
        // Backup & Restore
        Route::get('/backups', [SettingsController::class, 'getBackups']);
        Route::post('/backups', [SettingsController::class, 'createBackup']);
        Route::put('/backups/schedule', [SettingsController::class, 'updateBackupSchedule']);
        Route::post('/backups/{id}/restore', [SettingsController::class, 'restoreBackup']);
        Route::delete('/backups/{id}', [SettingsController::class, 'deleteBackup']);
        Route::get('/backups/{id}/download', [SettingsController::class, 'downloadBackup']);
    });
    
    // Public Routes
    Route::get('/menus/services', [MenuController::class, 'services']);
    Route::get('/menus/emergency', [MenuController::class, 'emergency']);
    
    // Banners
    Route::get('/banners', [BannerController::class, 'index']);
    Route::get('/banners/{id}', [BannerController::class, 'show']);
    Route::post('/upload-banner', [BannerController::class, 'uploadImage']);
    
    // Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Public Resources
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::get('/doctors/{id}', [DoctorController::class, 'show']);
    Route::get('/categories', [ProductCategoryController::class, 'index']);
    Route::get('/categories/{id}', [ProductCategoryController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/{id}/related', [ProductController::class, 'related']);
    Route::get('/lab-tests', [LabTestController::class, 'index']);
    Route::get('/lab-tests/{id}', [LabTestController::class, 'show']);
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{id}', [BlogController::class, 'show']);
    
    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        
        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/activities', [DashboardController::class, 'recentActivities']);
        Route::get('/dashboard/revenue', [DashboardController::class, 'revenueChart']);
        
        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
        
        // Payments
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::post('/payments', [PaymentController::class, 'store']);
        Route::get('/payments/{id}', [PaymentController::class, 'show']);
        Route::put('/payments/{id}/status', [PaymentController::class, 'updateStatus']);
        
        // Reviews
        Route::get('/reviews', [ReviewController::class, 'index']);
        Route::post('/reviews', [ReviewController::class, 'store']);
        Route::get('/reviews/{id}', [ReviewController::class, 'show']);
        Route::put('/reviews/{id}', [ReviewController::class, 'update']);
        Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
        
        // Appointments
        Route::get('/appointments', [AppointmentController::class, 'index']);
        Route::post('/appointments', [AppointmentController::class, 'store']);
        Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
        Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
        
        // Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::put('/orders/{id}', [OrderController::class, 'update']);
        
        // Lab Test Bookings
        Route::get('/lab-test-bookings', [LabTestBookingController::class, 'index']);
        Route::post('/lab-test-bookings', [LabTestBookingController::class, 'store']);
        Route::get('/lab-test-bookings/{id}', [LabTestBookingController::class, 'show']);
        Route::put('/lab-test-bookings/{id}', [LabTestBookingController::class, 'update']);
        
        // Prescriptions
        Route::get('/prescriptions', [PrescriptionController::class, 'index']);
        Route::get('/prescriptions/search', [PrescriptionController::class, 'search']);
        Route::post('/prescriptions', [PrescriptionController::class, 'store']);
        Route::post('/prescriptions/upload', [PrescriptionController::class, 'upload']);
        Route::get('/prescriptions/customer/{customerId}', [PrescriptionController::class, 'getByCustomer']);
        Route::get('/prescriptions/analytics', [PrescriptionController::class, 'analytics']);
        Route::get('/prescriptions/{id}', [PrescriptionController::class, 'show']);
        Route::patch('/prescriptions/{id}/status', [PrescriptionController::class, 'updateStatus']);
        Route::post('/prescriptions/{id}/process', [PrescriptionController::class, 'process']);
        Route::delete('/prescriptions/{id}', [PrescriptionController::class, 'destroy']);
        
        // Medical Records
        Route::get('/medical-records', [MedicalRecordController::class, 'index']);
        Route::post('/medical-records', [MedicalRecordController::class, 'store']);
        Route::get('/medical-records/{id}', [MedicalRecordController::class, 'show']);
        
        // Medical Devices
        Route::get('/medical-devices', [MedicalDeviceController::class, 'index']);
        Route::post('/medical-devices', [MedicalDeviceController::class, 'store']);
        Route::get('/medical-devices/{id}', [MedicalDeviceController::class, 'show']);
        Route::put('/medical-devices/{id}', [MedicalDeviceController::class, 'update']);
        Route::delete('/medical-devices/{id}', [MedicalDeviceController::class, 'destroy']);
        Route::get('/medical-devices/categories', [MedicalDeviceController::class, 'getCategories']);
        Route::get('/medical-devices/manufacturers', [MedicalDeviceController::class, 'getManufacturers']);
        Route::get('/medical-devices/low-stock', [MedicalDeviceController::class, 'getLowStock']);
        Route::get('/medical-devices/critical-stock', [MedicalDeviceController::class, 'getCriticalStock']);
        Route::get('/medical-devices/expiring-soon', [MedicalDeviceController::class, 'getExpiringSoon']);
        Route::get('/medical-devices/stats', [MedicalDeviceController::class, 'getStats']);
        
        // Pharmacy Orders
        Route::get('/pharmacy-orders', [PharmacyOrderController::class, 'index']);
        Route::post('/pharmacy-orders', [PharmacyOrderController::class, 'store']);
        Route::get('/pharmacy-orders/{id}', [PharmacyOrderController::class, 'show']);
        Route::put('/pharmacy-orders/{id}', [PharmacyOrderController::class, 'update']);
        Route::delete('/pharmacy-orders/{id}', [PharmacyOrderController::class, 'destroy']);
        Route::get('/pharmacy-orders/stats', [PharmacyOrderController::class, 'getStats']);
        Route::post('/pharmacy-orders/{id}/process', [PharmacyOrderController::class, 'processOrder']);
        Route::post('/pharmacy-orders/{id}/complete', [PharmacyOrderController::class, 'completeOrder']);
        Route::post('/pharmacy-orders/{id}/cancel', [PharmacyOrderController::class, 'cancelOrder']);
        
        // Admin/Doctor Routes
        Route::middleware(['role:admin,doctor'])->group(function () {
            // Banner Management
            Route::post('/banners', [BannerController::class, 'store']);
            Route::put('/banners/{id}', [BannerController::class, 'update']);
            Route::delete('/banners/{id}', [BannerController::class, 'destroy']);
            Route::put('/banners/{id}/toggle', [BannerController::class, 'toggleActive']);
            Route::get('/banners/stats', [BannerController::class, 'getStats']);
            
            Route::post('/doctors', [DoctorController::class, 'store']);
            Route::put('/doctors/{id}', [DoctorController::class, 'update']);
            Route::post('/categories', [ProductCategoryController::class, 'store']);
            Route::put('/categories/{id}', [ProductCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy']);
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::post('/lab-tests', [LabTestController::class, 'store']);
            Route::put('/lab-tests/{id}', [LabTestController::class, 'update']);
            
            // Lab Categories Management
            Route::get('/lab/categories', [LabTestCategoryController::class, 'index']);
            Route::post('/lab/categories', [LabTestCategoryController::class, 'store']);
            Route::get('/lab/categories/{id}', [LabTestCategoryController::class, 'show']);
            Route::put('/lab/categories/{id}', [LabTestCategoryController::class, 'update']);
            Route::delete('/lab/categories/{id}', [LabTestCategoryController::class, 'destroy']);
            Route::get('/lab/categories/stats', [LabTestCategoryController::class, 'getStats']);
            
            // Lab Sample Collection Management
            Route::get('/lab/sample-collections', [LabSampleCollectionController::class, 'index']);
            Route::post('/lab/sample-collections', [LabSampleCollectionController::class, 'store']);
            Route::get('/lab/sample-collections/{id}', [LabSampleCollectionController::class, 'show']);
            Route::put('/lab/sample-collections/{id}', [LabSampleCollectionController::class, 'update']);
            Route::put('/lab/sample-collections/{id}/status', [LabSampleCollectionController::class, 'updateStatus']);
            Route::delete('/lab/sample-collections/{id}', [LabSampleCollectionController::class, 'destroy']);
            Route::get('/lab/sample-collections/stats', [LabSampleCollectionController::class, 'getStats']);
            
            // Doctor Profile Management
            Route::get('/doctors/{id}/profile', [DoctorProfileController::class, 'getProfile']);
            Route::put('/doctors/{id}/personal-info', [DoctorProfileController::class, 'updatePersonalInfo']);
            Route::put('/doctors/{id}/professional-info', [DoctorProfileController::class, 'updateProfessionalInfo']);
            Route::put('/doctors/{id}/expertise-info', [DoctorProfileController::class, 'updateExpertiseInfo']);
            Route::post('/doctors/{id}/profile-picture', [DoctorProfileController::class, 'uploadProfilePicture']);
            Route::get('/doctors/{id}/stats', [DoctorProfileController::class, 'getProfileStats']);
            Route::put('/doctors/{id}/availability', [DoctorProfileController::class, 'updateAvailability']);
            
            // Inventory Management
            Route::get('/inventory', [InventoryController::class, 'index']);
            Route::post('/inventory', [InventoryController::class, 'store']);
            Route::get('/inventory/{id}', [InventoryController::class, 'show']);
            Route::put('/inventory/{id}', [InventoryController::class, 'update']);
            Route::get('/inventory/low-stock', [InventoryController::class, 'lowStock']);
            
            // Users
            Route::post('/doctors', [DoctorController::class, 'store']);
            Route::put('/doctors/{id}', [DoctorController::class, 'update']);
            Route::post('/categories', [ProductCategoryController::class, 'store']);
            Route::put('/categories/{id}', [ProductCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy']);
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::post('/lab-tests', [LabTestController::class, 'store']);
            Route::put('/lab-tests/{id}', [LabTestController::class, 'update']);
        });
    });
});
