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
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Medigo Healthcare
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Public Routes
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
        Route::post('/prescriptions', [PrescriptionController::class, 'store']);
        Route::get('/prescriptions/{id}', [PrescriptionController::class, 'show']);
        
        // Medical Records
        Route::get('/medical-records', [MedicalRecordController::class, 'index']);
        Route::post('/medical-records', [MedicalRecordController::class, 'store']);
        Route::get('/medical-records/{id}', [MedicalRecordController::class, 'show']);
        
        // Admin/Doctor Routes
        Route::middleware(['role:admin,doctor'])->group(function () {
            Route::post('/doctors', [DoctorController::class, 'store']);
            Route::put('/doctors/{id}', [DoctorController::class, 'update']);
            Route::post('/categories', [ProductCategoryController::class, 'store']);
            Route::put('/categories/{id}', [ProductCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [ProductCategoryController::class, 'destroy']);
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::post('/lab-tests', [LabTestController::class, 'store']);
            Route::put('/lab-tests/{id}', [LabTestController::class, 'update']);
            
            // Banner Management (Admin only)
            Route::post('/banners', [BannerController::class, 'store']);
            Route::put('/banners/{id}', [BannerController::class, 'update']);
            Route::delete('/banners/{id}', [BannerController::class, 'destroy']);
            Route::put('/banners/{id}/toggle', [BannerController::class, 'toggleActive']);
        });
    });
});
