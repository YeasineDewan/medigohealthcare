# Medigo Healthcare API Documentation

## Overview
This document provides comprehensive API documentation for the Medigo healthcare management system. The API is built using Laravel 11 and follows RESTful principles.

## Base URL
```
http://localhost:8000/api
```

## Authentication
The API uses Laravel Sanctum for authentication. All protected endpoints require a valid Bearer token.

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

## Authentication Endpoints

### Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient|doctor|admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    "token": "1|abc123..."
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout
```http
POST /auth/logout
```

### Get Current User
```http
GET /auth/user
```

### Refresh Token
```http
POST /auth/refresh
```

## Dashboard Endpoints

### Admin Dashboard
```http
GET /dashboard/admin
```
**Role Required:** admin

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_users": 150,
      "total_doctors": 10,
      "total_patients": 140,
      "total_appointments": 500,
      "today_appointments": 25,
      "pending_appointments": 5,
      "completed_appointments": 470,
      "total_revenue": 50000.00,
      "monthly_revenue": 5000.00,
      "monthly_revenue_change": 15.5
    },
    "recent_appointments": [...],
    "recent_patients": [...],
    "recent_doctors": [...],
    "department_stats": [...],
    "appointment_trends": [...],
    "revenue_trends": [...]
  }
}
```

### Doctor Dashboard
```http
GET /dashboard/doctor
```
**Role Required:** doctor

### Patient Dashboard
```http
GET /dashboard/patient
```
**Role Required:** patient

### System Stats
```http
GET /dashboard/system-stats
```
**Role Required:** admin

### Real-time Stats
```http
GET /dashboard/real-time-stats
```
**Role Required:** admin

## Doctor Management

### Get All Doctors
```http
GET /doctors
```

**Query Parameters:**
- `search` - Search by name, specialization, or department
- `specialization` - Filter by specialization
- `department` - Filter by department
- `status` - Filter by status (active/inactive)
- `page` - Page number for pagination
- `per_page` - Items per page

### Create Doctor
```http
POST /doctors
```

**Request Body:**
```json
{
  "name": "Dr. John Smith",
  "email": "john@medigo.com",
  "phone": "+1234567890",
  "specialization": "Cardiology",
  "department": "Cardiology",
  "experience": 10,
  "education": [
    {
      "degree": "MD",
      "university": "Harvard Medical School",
      "year": "2010"
    }
  ],
  "license_number": "MD123456",
  "consultation_fee": 200.00,
  "languages": ["English", "Spanish"],
  "available_slots": [
    {
      "day": "Monday",
      "time": "09:00-17:00"
    }
  ]
}
```

### Get Doctor by ID
```http
GET /doctors/{id}
```

### Update Doctor
```http
PUT /doctors/{id}
```

### Delete Doctor
```http
DELETE /doctors/{id}
```

### Get Doctor Appointments
```http
GET /doctors/{id}/appointments
```

### Get Doctor Patients
```http
GET /doctors/{id}/patients
```

### Update Doctor Availability
```http
PUT /doctors/{id}/availability
```

## Patient Management

### Get All Patients
```http
GET /patients
```

**Query Parameters:**
- `search` - Search by name or email
- `blood_type` - Filter by blood type
- `gender` - Filter by gender
- `status` - Filter by status
- `page` - Page number for pagination
- `per_page` - Items per page

### Create Patient
```http
POST /patients
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-01-01",
  "gender": "Female",
  "blood_type": "A+",
  "age": 34,
  "address": "123 Main St",
  "city": "Boston",
  "state": "MA",
  "zip_code": "02101",
  "country": "USA",
  "emergency_contact_name": "John Doe",
  "emergency_contact_phone": "+1234567890",
  "primary_physician": "Dr. John Smith",
  "insurance_provider": "Blue Cross",
  "policy_number": "POL123456",
  "allergies": ["Penicillin"],
  "chronic_conditions": ["Hypertension"],
  "medications": ["Lisinopril"]
}
```

### Get Patient by ID
```http
GET /patients/{id}
```

### Update Patient
```http
PUT /patients/{id}
```

### Delete Patient
```http
DELETE /patients/{id}
```

### Get Patient Appointments
```http
GET /patients/{id}/appointments
```

### Get Patient Medical Records
```http
GET /patients/{id}/medical-records
```

## Appointment Management

### Get All Appointments
```http
GET /appointments
```

**Query Parameters:**
- `search` - Search by appointment number or patient name
- `doctor_id` - Filter by doctor
- `patient_id` - Filter by patient
- `status` - Filter by status
- `date_from` - Filter by date range (from)
- `date_to` - Filter by date range (to)
- `type` - Filter by type
- `page` - Page number for pagination
- `per_page` - Items per page

### Create Appointment
```http
POST /appointments
```

**Request Body:**
```json
{
  "doctor_id": 1,
  "patient_id": 1,
  "appointment_date": "2024-04-01",
  "appointment_time": "10:00",
  "duration": 30,
  "type": "consultation",
  "notes": "Regular checkup"
}
```

### Get Appointment by ID
```http
GET /appointments/{id}
```

### Update Appointment
```http
PUT /appointments/{id}
```

### Delete Appointment
```http
DELETE /appointments/{id}
```

### Cancel Appointment
```http
POST /appointments/{id}/cancel
```

### Confirm Appointment
```http
POST /appointments/{id}/confirm
```

### Get Available Slots
```http
GET /appointments/available-slots/{doctorId}
```

**Query Parameters:**
- `date` - Date to check availability

## Medical Records

### Get All Medical Records
```http
GET /medical-records
```

**Query Parameters:**
- `patient_id` - Filter by patient
- `doctor_id` - Filter by doctor
- `diagnosis` - Filter by diagnosis
- `date_from` - Filter by date range (from)
- `date_to` - Filter by date range (to)
- `page` - Page number for pagination
- `per_page` - Items per page

### Create Medical Record
```http
POST /medical-records
```

**Request Body:**
```json
{
  "patient_id": 1,
  "doctor_id": 1,
  "visit_date": "2024-04-01",
  "diagnosis": "Hypertension",
  "treatment": "Prescribed medication and lifestyle changes",
  "symptoms": "Chest pain, shortness of breath",
  "vital_signs": [
    {
      "type": "Blood Pressure",
      "value": "120/80",
      "unit": "mmHg",
      "normal_range": "120/80"
    }
  ],
  "prescriptions": [
    {
      "medication": "Lisinopril",
      "dosage": "10mg",
      "duration": "30 days"
    }
  ]
}
```

### Get Medical Record by ID
```http
GET /medical-records/{id}
```

### Update Medical Record
```http
PUT /medical-records/{id}
```

### Delete Medical Record
```http
DELETE /medical-records/{id}
```

### Get Patient Medical History
```http
GET /medical-records/patient/{patientId}/history
```

## Billing Management

### Get All Bills
```http
GET /billing
```

**Query Parameters:**
- `patient_id` - Filter by patient
- `doctor_id` - Filter by doctor
- `status` - Filter by status
- `date_from` - Filter by date range (from)
- `date_to` - Filter by date range (to)
- `page` - Page number for pagination
- `per_page` - Items per page

### Create Bill
```http
POST /billing
```

**Request Body:**
```json
{
  "patient_id": 1,
  "doctor_id": 1,
  "appointment_id": 1,
  "amount": 200.00,
  "description": "Consultation fee",
  "due_date": "2024-04-15",
  "services": ["Consultation"],
  "tax_amount": 20.00,
  "discount_amount": 0.00,
  "total_amount": 220.00
}
```

### Get Bill by ID
```http
GET /billing/{id}
```

### Update Bill
```http
PUT /billing/{id}
```

### Delete Bill
```http
DELETE /billing/{id}
```

### Process Payment
```http
POST /billing/{id}/pay
```

### Get Patient Billing History
```http
GET /billing/patient/{patientId}/history
```

### Get Billing Statistics
```http
GET /billing/statistics
```

## Error Responses

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code",
  "errors": {
    "field": ["Error message"]
  }
}
```

### Common Error Codes:
- `unauthenticated` - User not authenticated
- `unauthorized` - User does not have permission
- `validation_error` - Request validation failed
- `not_found` - Resource not found
- `server_error` - Internal server error

## Rate Limiting
API requests are rate limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Pagination
Paginated endpoints follow this format:

```json
{
  "data": [...],
  "current_page": 1,
  "last_page": 10,
  "per_page": 15,
  "total": 150,
  "from": 1,
  "to": 15
}
```

## Search and Filtering
Most list endpoints support:
- `search` - Full-text search
- `sort` - Sort by field (field:direction)
- `filter[field]` - Filter by specific field

## Webhooks
The system supports webhooks for real-time notifications:
- Appointment created/updated/cancelled
- Patient registration
- Payment processed
- Medical record created

Configure webhooks in the admin panel.

## SDKs
Official SDKs available for:
- JavaScript/TypeScript
- PHP
- Python
- Java
- C#

## Support
For API support:
- Email: api-support@medigo.com
- Documentation: https://docs.medigo.com
- Status Page: https://status.medigo.com
