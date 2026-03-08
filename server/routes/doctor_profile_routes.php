<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorProfileController;

/*
|--------------------------------------------------------------------------
| Doctor Profile API Routes
|--------------------------------------------------------------------------
|
| Add these routes to your api.php file
|
*/

Route::prefix('doctors')->middleware(['auth:sanctum'])->group(function () {
    // Get doctor profile
    Route::get('/{id}/profile', [DoctorProfileController::class, 'getProfile']);
    
    // Update personal information
    Route::put('/{id}/personal-info', [DoctorProfileController::class, 'updatePersonalInfo']);
    
    // Update professional information
    Route::put('/{id}/professional-info', [DoctorProfileController::class, 'updateProfessionalInfo']);
    
    // Update expertise information
    Route::put('/{id}/expertise-info', [DoctorProfileController::class, 'updateExpertiseInfo']);
    
    // Upload profile picture
    Route::post('/{id}/profile-picture', [DoctorProfileController::class, 'uploadProfilePicture']);
    
    // Get profile statistics
    Route::get('/{id}/stats', [DoctorProfileController::class, 'getProfileStats']);
    
    // Update availability
    Route::put('/{id}/availability', [DoctorProfileController::class, 'updateAvailability']);
});
