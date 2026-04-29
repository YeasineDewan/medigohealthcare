<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\LabTestController;
use App\Http\Controllers\Api\LabTestBookingController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\DoctorApplicationController;
use App\Http\Controllers\Api\HospitalApplicationController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\HospitalController;
use App\Http\Controllers\Api\NoticeController;
use App\Http\Controllers\Api\AdminDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Medigo Healthcare
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Public Routes
    Route::get('/notices/active', [NoticeController::class, 'active']);
    Route::get('/menus/services', [MenuController::class, 'services']);
    Route::get('/menus/emergency', [MenuController::class, 'emergency']);
    
    // Banners
    Route::get('/banners', [BannerController::class, 'index']);
    Route::get('/banners/{id}', [BannerController::class, 'show']);
    
    // Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Public Resources
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::get('/doctors/{id}', [DoctorController::class, 'show']);
    Route::get('/hospitals', [HospitalController::class, 'index']);
    Route::get('/hospitals/{id}', [HospitalController::class, 'show']);
    Route::get('/hospitals/featured', [HospitalController::class, 'featured']);
    Route::get('/hospitals/city/{city}', [HospitalController::class, 'byCity']);
    Route::get('/hospitals/district/{district}', [HospitalController::class, 'byDistrict']);
    Route::get('/hospitals/type/{type}', [HospitalController::class, 'byType']);
    Route::get('/hospitals/search', [HospitalController::class, 'search']);
    Route::get('/hospitals/nearby', [HospitalController::class, 'nearby']);
    Route::get('/categories', [ProductCategoryController::class, 'index']);
    Route::get('/categories/{id}', [ProductCategoryController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/{id}/related', [ProductController::class, 'related']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/popular', [ProductController::class, 'popular']);
    Route::get('/products/top-rated', [ProductController::class, 'topRated']);
    Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::get('/lab-tests', [LabTestController::class, 'index']);
    Route::get('/lab-tests/{id}', [LabTestController::class, 'show']);
    Route::get('/lab-tests/popular', [LabTestController::class, 'popular']);
    Route::get('/lab-tests/category/{categoryId}', [LabTestController::class, 'byCategory']);
    Route::get('/lab-tests/search', [LabTestController::class, 'search']);
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{id}', [BlogController::class, 'show']);
    
    // Applications
    Route::prefix('applications')->group(function () {
        // Doctor application routes
        Route::post('/doctor', [DoctorApplicationController::class, 'store']);
        Route::get('/doctor/status/{email}', [DoctorApplicationController::class, 'checkStatus']);
        Route::get('/doctor/specializations', [DoctorApplicationController::class, 'getSpecializations']);
        Route::get('/doctor/statistics', [DoctorApplicationController::class, 'getStatistics']);
        
        // Hospital application routes
        Route::post('/hospital', [HospitalApplicationController::class, 'store']);
        Route::get('/hospital/status/{email}', [HospitalApplicationController::class, 'checkStatus']);
        Route::get('/hospital/cities', [HospitalApplicationController::class, 'getCities']);
        Route::get('/hospital/specializations', [HospitalApplicationController::class, 'getSpecializations']);
        Route::get('/hospital/statistics', [HospitalApplicationController::class, 'getStatistics']);
    });
    
    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        
        // Patients
        Route::get('/patients', [PatientController::class, 'index']);
        Route::post('/patients', [PatientController::class, 'store']);
        Route::get('/patients/{id}', [PatientController::class, 'show']);
        Route::put('/patients/{id}', [PatientController::class, 'update']);
        Route::delete('/patients/{id}', [PatientController::class, 'destroy']);
        Route::get('/patients/{id}/medical-history', [PatientController::class, 'medicalHistory']);
        Route::get('/patients/{id}/appointments', [PatientController::class, 'appointments']);
        Route::get('/patients/{id}/prescriptions', [PatientController::class, 'prescriptions']);
        Route::post('/patients/{id}/vital-signs', [PatientController::class, 'storeVitalSigns']);
        Route::get('/patients/search', [PatientController::class, 'search']);
        Route::get('/patients/statistics', [PatientController::class, 'statistics']);
        
        // Appointments
        Route::get('/appointments', [AppointmentController::class, 'index']);
        Route::post('/appointments', [AppointmentController::class, 'store']);
        Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
        Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
        Route::post('/appointments/{id}/confirm', [AppointmentController::class, 'confirm']);
        Route::post('/appointments/{id}/start', [AppointmentController::class, 'start']);
        Route::post('/appointments/{id}/complete', [AppointmentController::class, 'complete']);
        Route::post('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);
        Route::get('/appointments/statistics', [AppointmentController::class, 'statistics']);
        
        // Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::put('/orders/{id}', [OrderController::class, 'update']);
        Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
        Route::get('/orders/track/{orderNumber}', [OrderController::class, 'track']);
        Route::get('/orders/my', [OrderController::class, 'myOrders']);
        Route::get('/orders/statistics', [OrderController::class, 'statistics']);
        
        // Lab Tests
        Route::post('/lab-tests/{id}/book', [LabTestController::class, 'book']);
        Route::get('/lab-tests/bookings', [LabTestController::class, 'bookings']);
        Route::put('/lab-tests/bookings/{id}/status', [LabTestController::class, 'updateBookingStatus']);
        Route::get('/lab-tests/statistics', [LabTestController::class, 'statistics']);
        
        // Lab Test Bookings
        Route::get('/lab-test-bookings', [LabTestBookingController::class, 'index']);
        Route::post('/lab-test-bookings', [LabTestBookingController::class, 'store']);
        Route::get('/lab-test-bookings/{id}', [LabTestBookingController::class, 'show']);
        Route::put('/lab-test-bookings/{id}', [LabTestBookingController::class, 'update']);
        
        // Prescriptions
        Route::get('/prescriptions', [PrescriptionController::class, 'index']);
        Route::post('/prescriptions', [PrescriptionController::class, 'store']);
        Route::get('/prescriptions/{id}', [PrescriptionController::class, 'show']);
        Route::put('/prescriptions/{id}', [PrescriptionController::class, 'update']);
        Route::post('/prescriptions/{id}/sign', [PrescriptionController::class, 'sign']);
        
        // Medical Records
        Route::get('/medical-records', [MedicalRecordController::class, 'index']);
        Route::post('/medical-records', [MedicalRecordController::class, 'store']);
        Route::get('/medical-records/{id}', [MedicalRecordController::class, 'show']);
        Route::put('/medical-records/{id}', [MedicalRecordController::class, 'update']);
        Route::post('/medical-records/{id}/attachments', [MedicalRecordController::class, 'uploadAttachment']);
        Route::delete('/medical-records/{id}/attachments/{attachmentId}', [MedicalRecordController::class, 'deleteAttachment']);
        
        // Admin/Doctor Routes
        Route::middleware(['role:admin,doctor'])->group(function () {
            // Admin Dashboard Stats
            Route::middleware('role:admin')->group(function () {
                Route::get('/admin/stats', [AdminDashboardController::class, 'stats']);
                Route::get('/admin/activity', [AdminDashboardController::class, 'recentActivity']);
                Route::get('/admin/appointments/upcoming', [AdminDashboardController::class, 'upcomingAppointments']);
                Route::get('/admin/departments/stats', [AdminDashboardController::class, 'departmentStats']);
            });
            
            // Admin Notices
            Route::middleware('role:admin')->group(function () {
                Route::get('/admin/notices', [NoticeController::class, 'index']);
                Route::post('/admin/notices', [NoticeController::class, 'store']);
                Route::put('/admin/notices/{id}', [NoticeController::class, 'update']);
                Route::delete('/admin/notices/{id}', [NoticeController::class, 'destroy']);
                Route::patch('/admin/notices/{id}/toggle', [NoticeController::class, 'toggle']);
            });
            
            // Doctors Management
            Route::post('/doctors', [DoctorController::class, 'store']);
            Route::put('/doctors/{id}/profile', [DoctorController::class, 'updateProfile']);
            Route::put('/doctors/{id}', [DoctorController::class, 'update']);
            Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);
            
            // Hospitals Management
            Route::post('/hospitals', [HospitalController::class, 'store']);
            Route::put('/hospitals/{id}', [HospitalController::class, 'update']);
            Route::delete('/hospitals/{id}', [HospitalController::class, 'destroy']);
            Route::get('/hospitals/statistics', [HospitalController::class, 'statistics']);
            
            // Products Management
            Route::post('/categories', [ProductCategoryController::class, 'store']);
            Route::put('/categories/{id}', [ProductCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy']);
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::delete('/products/{id}', [ProductController::class, 'destroy']);
            Route::put('/products/{id}/stock', [ProductController::class, 'updateStock']);
            Route::get('/products/inventory', [ProductController::class, 'inventory']);
            Route::get('/products/statistics', [ProductController::class, 'statistics']);
            
            // Lab Tests Management
            Route::post('/lab-tests', [LabTestController::class, 'store']);
            Route::put('/lab-tests/{id}', [LabTestController::class, 'update']);
            Route::delete('/lab-tests/{id}', [LabTestController::class, 'destroy']);
            
            // Banner Management (Admin only)
            Route::post('/admin/banners', [BannerController::class, 'store']);
            Route::put('/admin/banners/{id}', [BannerController::class, 'update']);
            Route::delete('/admin/banners/{id}', [BannerController::class, 'destroy']);
            Route::put('/admin/banners/{id}/toggle', [BannerController::class, 'toggleActive']);
        });
    });
});
