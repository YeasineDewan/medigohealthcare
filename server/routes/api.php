<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\MedicalRecordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group. Now build something great!
|
*/

// Authentication routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post('/auth/refresh', [AuthController::class, 'refresh'])->middleware('auth:sanctum');

// Dashboard routes
Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])->middleware('auth:sanctum', 'App\Http\Middleware\RoleMiddlewareNew:admin']);
Route::get('/dashboard/doctor', [DashboardController::class, 'doctorDashboard'])->middleware('auth:sanctum', 'App\Http\Middleware\RoleMiddlewareNew:doctor']);
Route::get('/dashboard/patient', [DashboardController::class, 'patientDashboard'])->middleware('auth:sanctum', 'App\Http\Middleware\RoleMiddlewareNew:patient']);
Route::get('/dashboard/system-stats', [DashboardController::class, 'systemStats'])->middleware('auth:sanctum', 'App\Http\Middleware\RoleMiddlewareNew:admin']);
Route::get('/dashboard/real-time-stats', [DashboardController::class, 'realTimeStats'])->middleware('auth:sanctum', 'App\Http\Middleware\RoleMiddlewareNew:admin']);

// Doctor routes

// Doctor routes
Route::get('/doctors', [DoctorController::class, 'index'])->middleware('auth:sanctum');
Route::post('/doctors', [DoctorController::class, 'store'])->middleware('auth:sanctum');
Route::get('/doctors/{id}', [DoctorController::class, 'show'])->middleware('auth:sanctum');
Route::put('/doctors/{id}', [DoctorController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/doctors/{id}', [DoctorController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/doctors/{id}/appointments', [DoctorController::class, 'appointments'])->middleware('auth:sanctum');
Route::get('/doctors/{id}/patients', [DoctorController::class, 'patients'])->middleware('auth:sanctum');
Route::put('/doctors/{id}/availability', [DoctorController::class, 'updateAvailability'])->middleware('auth:sanctum');

// Patient routes
Route::get('/patients', [PatientController::class, 'index'])->middleware('auth:sanctum');
Route::post('/patients', [PatientController::class, 'store'])->middleware('auth:sanctum');
Route::get('/patients/{id}', [PatientController::class, 'show'])->middleware('auth:sanctum');
Route::put('/patients/{id}', [PatientController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/patients/{id}', [PatientController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/patients/{id}/appointments', [PatientController::class, 'appointments'])->middleware('auth:sanctum');
Route::get('/patients/{id}/medical-records', [PatientController::class, 'medicalRecords'])->middleware('auth:sanctum');

// Appointment routes
Route::get('/appointments', [AppointmentController::class, 'index'])->middleware('auth:sanctum');
Route::post('/appointments', [AppointmentController::class, 'store'])->middleware('auth:sanctum');
Route::get('/appointments/{id}', [AppointmentController::class, 'show'])->middleware('auth:sanctum');
Route::put('/appointments/{id}', [AppointmentController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/appointments/{id}/cancel', [AppointmentController::class, 'cancel'])->middleware('auth:sanctum');
Route::post('/appointments/{id}/confirm', [AppointmentController::class, 'confirm'])->middleware('auth:sanctum');
Route::get('/appointments/available-slots/{doctorId}', [AppointmentController::class, 'availableSlots'])->middleware('auth:sanctum');

// Medical Record routes
Route::get('/medical-records', [MedicalRecordController::class, 'index'])->middleware('auth:sanctum');
Route::post('/medical-records', [MedicalRecordController::class, 'store'])->middleware('auth:sanctum');
Route::get('/medical-records/{id}', [MedicalRecordController::class, 'show'])->middleware('auth:sanctum');
Route::put('/medical-records/{id}', [MedicalRecordController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/medical-records/{id}', [MedicalRecordController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/medical-records/patient/{patientId}', [MedicalRecordController::class, 'patientHistory'])->middleware('auth:sanctum');
Route::post('/medical-records/{id}/vital-signs', [MedicalRecordController::class, 'addVitalSigns'])->middleware('auth:sanctum');
Route::get('/medical-records/patient/{patientId}/vital-signs-trends', [MedicalRecordController::class, 'vitalSignsTrends'])->middleware('auth:sanctum');

// Billing routes
Route::get('/billing', [BillingController::class, 'index'])->middleware('auth:sanctum');
Route::post('/billing', [BillingController::class, 'store'])->middleware('auth:sanctum');
Route::get('/billing/{id}', [BillingController::class, 'show'])->middleware('auth:sanctum');
Route::put('/billing/{id}', [BillingController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/billing/{id}', [BillingController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/billing/{id}/process-payment', [BillingController::class, 'processPayment'])->middleware('auth:sanctum');
Route::get('/billing/statistics', [BillingController::class, 'statistics'])->middleware('auth:sanctum');

// Admin specific routes
Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::post('/doctors', [DoctorController::class, 'store']);
    Route::put('/doctors/{id}', [DoctorController::class, 'update']);
    Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);
    
    Route::get('/patients', [PatientController::class, 'index']);
    Route::post('/patients', [PatientController::class, 'store']);
    Route::put('/patients/{id}', [PatientController::class, 'update']);
    Route::delete('/patients/{id}', [PatientController::class, 'destroy']);
    
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    
    Route::get('/billing', [BillingController::class, 'index']);
    Route::post('/billing', [BillingController::class, 'store']);
    Route::put('/billing/{id}', [BillingController::class, 'update']);
    Route::delete('/billing/{id}', [BillingController::class, 'destroy']);
    
    Route::get('/medical-records', [MedicalRecordController::class, 'index']);
    Route::post('/medical-records', [MedicalRecordController::class, 'store']);
    Route::put('/medical-records/{id}', [MedicalController::class, 'update']);
    Route::delete('/medical-records/{id}', [MedicalController::class, 'destroy']);
});

// Doctor specific routes
Route::prefix('doctor')->middleware(['auth:sanctum', 'role:doctor'])->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::get('/patients/{id}/appointments', [PatientController::class, 'appointments']);
    Route::get('/patients/{id}/medical-records', [PatientController::class, 'medicalRecords']);
});

// Patient specific routes
Route::prefix('patient')->middleware(['auth:sanctum', 'role:patient'])->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    Route::get('/medical-records', [MedicalRecordController::class, 'index']);
    Route::get('/medical-records/{id}', [MedicalController::class, 'show']);
    Route::get('/billing', [BillingController::class, 'index']);
    Route::get('/billing/{id}', [BillingController::class, 'show']);
});

Route::prefix('v1')->group(function () {
    
    // Public Routes
    Route::get('/menus/services', [MenuController::class, 'services']);
    Route::get('/menus/emergency', [MenuController::class, 'emergency']);
    
    // Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Public Resources
    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::get('/doctors/{id}', [DoctorController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
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
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::post('/lab-tests', [LabTestController::class, 'store']);
            Route::put('/lab-tests/{id}', [LabTestController::class, 'update']);
        });
    });
});
