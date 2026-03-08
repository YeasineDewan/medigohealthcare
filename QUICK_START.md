# Quick Start Guide - Doctor Profile

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to server directory
cd server

# Run migration
php artisan migrate

# Link storage
php artisan storage:link
```

### Step 2: Add API Routes (1 minute)

Open `server/routes/api.php` and add at the end:

```php
use App\Http\Controllers\Api\DoctorProfileController;

Route::prefix('doctors')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/{id}/profile', [DoctorProfileController::class, 'getProfile']);
    Route::put('/{id}/personal-info', [DoctorProfileController::class, 'updatePersonalInfo']);
    Route::put('/{id}/professional-info', [DoctorProfileController::class, 'updateProfessionalInfo']);
    Route::put('/{id}/expertise-info', [DoctorProfileController::class, 'updateExpertiseInfo']);
    Route::post('/{id}/profile-picture', [DoctorProfileController::class, 'uploadProfilePicture']);
    Route::get('/{id}/stats', [DoctorProfileController::class, 'getProfileStats']);
    Route::put('/{id}/availability', [DoctorProfileController::class, 'updateAvailability']);
});
```

### Step 3: Frontend Setup (2 minutes)

```bash
# Install dependencies
npm install axios react-hot-toast

# Create .env file if not exists
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

### Step 4: Add Toast Provider

Open `src/main.jsx` and add:

```jsx
import { Toaster } from 'react-hot-toast';

// Inside your root component
<Toaster position="top-right" />
```

### Step 5: Test It! ✅

```bash
# Start backend
cd server
php artisan serve

# Start frontend (new terminal)
npm run dev
```

Navigate to: `http://localhost:5173/doctor/profile`

## 🎯 What You Get

✅ Complete profile management
✅ Real-time auto-save
✅ Image upload
✅ Form validation
✅ Statistics dashboard
✅ Professional UI

## 📝 Quick Test

1. Click "Edit Profile"
2. Update any field
3. Watch auto-save in action
4. Upload a profile picture
5. Click "Save Changes"
6. See success notification!

## 🐛 Common Issues

**Issue**: Migration fails
```bash
# Solution
php artisan migrate:fresh
```

**Issue**: CORS error
```bash
# Add to config/cors.php
'allowed_origins' => ['http://localhost:5173'],
```

**Issue**: 401 Unauthorized
```bash
# Make sure you're logged in and token is set
localStorage.setItem('token', 'YOUR_TOKEN');
```

## 📚 Full Documentation

See `DOCTOR_PROFILE_SETUP.md` for complete documentation.

## 🎉 You're Done!

Your doctor profile system is now fully functional with:
- ✅ Database integration
- ✅ API endpoints
- ✅ Professional UI
- ✅ Auto-save
- ✅ Validation
- ✅ File upload

Happy coding! 🚀
