# Doctor Profile Setup Guide

## Overview
This guide will help you set up the complete doctor profile management system with API integration and database support.

## Backend Setup

### 1. Run Database Migration

```bash
cd server
php artisan migrate
```

This will add the following fields to your database:
- **doctors table**: emergency_contact, marital_status, website, linkedin, department, designation, npi_number, dea_number, languages, areas_of_expertise, services_offered, awards, publications, memberships, research_interests, profile_views
- **users table**: title, first_name, last_name, date_of_birth, gender, address, profile_picture

### 2. Add API Routes

Add the following to your `server/routes/api.php`:

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

### 3. Configure Storage

Make sure your storage is linked:

```bash
php artisan storage:link
```

### 4. Update CORS Settings

In `config/cors.php`, ensure your frontend URL is allowed:

```php
'allowed_origins' => [
    'http://localhost:5173',
    'http://localhost:3000',
],
```

## Frontend Setup

### 1. Install Dependencies

```bash
npm install axios react-hot-toast
```

### 2. Configure Environment Variables

Create or update `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Add Toast Provider

In your `main.jsx` or `App.jsx`, add the Toaster component:

```jsx
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* Your app components */}
    </>
  );
}
```

## Features

### Personal Information
- Title, Name, Email, Phone
- Date of Birth, Gender, Address
- Emergency Contact, Marital Status
- Professional Bio
- Website & LinkedIn Profile
- Profile Picture Upload

### Professional Information
- Specialization & Qualifications
- Experience & Current Hospital
- Consultation Fee & Availability
- Languages Spoken
- Medical License & Credentials
- Department & Designation
- NPI & DEA Numbers

### Expertise & Services
- Areas of Expertise
- Services Offered
- Awards & Recognition
- Publications
- Professional Memberships
- Research Interests

### Additional Features
- Real-time form validation
- Auto-save functionality
- Profile completion indicator
- Profile statistics dashboard
- Image upload with progress
- Responsive design
- Smooth animations

## API Endpoints

### GET /api/doctors/{id}/profile
Get complete doctor profile

### PUT /api/doctors/{id}/personal-info
Update personal information

**Request Body:**
```json
{
  "first_name": "Ahmed",
  "last_name": "Hassan",
  "email": "ahmed@example.com",
  "phone": "+880 1712 345678",
  "date_of_birth": "1985-03-22",
  "gender": "Male",
  "address": "Dhaka, Bangladesh",
  "emergency_contact": "+880 1712 987654",
  "marital_status": "Married",
  "bio": "Experienced cardiologist...",
  "website": "https://example.com",
  "linkedin": "https://linkedin.com/in/username"
}
```

### PUT /api/doctors/{id}/professional-info
Update professional information

**Request Body:**
```json
{
  "specialization": "Cardiology",
  "qualifications": ["MBBS", "FCPS"],
  "experience": "12 years",
  "current_hospital": "Square Hospital",
  "consultation_fee": 1500,
  "available_days": ["Monday", "Tuesday"],
  "available_time": "10:00 AM - 6:00 PM",
  "languages": ["English", "Bengali"],
  "medical_license": "BMDC-12345",
  "department": "Cardiology",
  "designation": "Senior Consultant",
  "npi_number": "1234567890",
  "dea_number": "AB1234567"
}
```

### PUT /api/doctors/{id}/expertise-info
Update expertise information

**Request Body:**
```json
{
  "areas_of_expertise": ["Interventional Cardiology"],
  "services_offered": ["ECG", "Echocardiogram"],
  "awards": ["Best Cardiologist 2022"],
  "publications": ["Journal of Cardiology 2023"],
  "memberships": ["Bangladesh Cardiac Society"],
  "research_interests": ["Preventive Cardiology"]
}
```

### POST /api/doctors/{id}/profile-picture
Upload profile picture

**Request:** multipart/form-data with `profile_picture` file

### GET /api/doctors/{id}/stats
Get profile statistics

**Response:**
```json
{
  "profile_views": 1234,
  "patient_rating": 4.9,
  "total_patients": 856,
  "total_earnings": 329500,
  "this_month_earnings": 84500,
  "total_appointments": 1200,
  "completed_appointments": 1150
}
```

### PUT /api/doctors/{id}/availability
Update availability status

**Request Body:**
```json
{
  "is_available": true,
  "available_days": ["Monday", "Tuesday"],
  "start_time": "10:00",
  "end_time": "18:00"
}
```

## Testing

### Test with Postman or cURL

```bash
# Get Profile
curl -X GET http://localhost:8000/api/doctors/1/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update Personal Info
curl -X PUT http://localhost:8000/api/doctors/1/personal-info \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Ahmed","last_name":"Hassan"}'

# Upload Profile Picture
curl -X POST http://localhost:8000/api/doctors/1/profile-picture \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "profile_picture=@/path/to/image.jpg"
```

## Troubleshooting

### Issue: CORS Error
**Solution:** Check `config/cors.php` and ensure your frontend URL is in `allowed_origins`

### Issue: 401 Unauthorized
**Solution:** Ensure you're sending the Bearer token in the Authorization header

### Issue: File Upload Fails
**Solution:** 
- Check `php.ini` for `upload_max_filesize` and `post_max_size`
- Ensure storage is linked: `php artisan storage:link`
- Check folder permissions

### Issue: Migration Fails
**Solution:** 
- Check if columns already exist
- Run `php artisan migrate:fresh` (WARNING: This will delete all data)
- Or manually add columns using the migration file as reference

## Security Considerations

1. **Authentication**: All routes are protected with `auth:sanctum` middleware
2. **Validation**: All inputs are validated on the backend
3. **File Upload**: Only image files (jpeg, png, jpg) up to 2MB are allowed
4. **SQL Injection**: Using Eloquent ORM prevents SQL injection
5. **XSS Protection**: Laravel automatically escapes output

## Performance Optimization

1. **Eager Loading**: Profile data is loaded with relationships using `with()`
2. **Caching**: Consider adding Redis cache for frequently accessed profiles
3. **Image Optimization**: Consider adding image compression on upload
4. **Pagination**: Stats and history should be paginated for large datasets

## Next Steps

1. Add profile verification system
2. Implement profile visibility settings
3. Add profile sharing functionality
4. Create public doctor profile pages
5. Add profile analytics dashboard
6. Implement profile backup/restore
7. Add multi-language support

## Support

For issues or questions, please contact the development team or create an issue in the repository.
