# Medigo Healthcare - API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
Most endpoints require authentication using Bearer token (Sanctum).

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout (protected)
- `GET /auth/me` - Get current user (protected)

### Menus (Public)
- `GET /menus/services` - Get services menu
- `GET /menus/emergency` - Get emergency services menu

### Doctors (Public)
- `GET /doctors` - List doctors (with filters: specialty, search)
- `GET /doctors/{id}` - Get doctor details
- `POST /doctors` - Create doctor (admin/doctor)
- `PUT /doctors/{id}` - Update doctor (admin/doctor)

### Appointments (Protected)
- `GET /appointments` - List appointments (filtered by user role)
- `POST /appointments` - Create appointment
- `GET /appointments/{id}` - Get appointment details
- `PUT /appointments/{id}` - Update appointment

### Products (Public)
- `GET /products` - List products (with filters: category, search, featured)
- `GET /products/{id}` - Get product details
- `POST /products` - Create product (admin/doctor)
- `PUT /products/{id}` - Update product (admin/doctor)

### Orders (Protected)
- `GET /orders` - List orders (filtered by user)
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order details
- `PUT /orders/{id}` - Update order status

### Lab Tests (Public)
- `GET /lab-tests` - List lab tests (with filters: category, search, popular)
- `GET /lab-tests/{id}` - Get lab test details
- `POST /lab-tests` - Create lab test (admin/doctor)
- `PUT /lab-tests/{id}` - Update lab test (admin/doctor)

### Lab Test Bookings (Protected)
- `GET /lab-test-bookings` - List bookings (filtered by user)
- `POST /lab-test-bookings` - Create booking
- `GET /lab-test-bookings/{id}` - Get booking details
- `PUT /lab-test-bookings/{id}` - Update booking

### Prescriptions (Protected)
- `GET /prescriptions` - List prescriptions (filtered by user role)
- `POST /prescriptions` - Create prescription
- `GET /prescriptions/{id}` - Get prescription details

### Medical Records (Protected)
- `GET /medical-records` - List records (filtered by patient)
- `POST /medical-records` - Create record
- `GET /medical-records/{id}` - Get record details

### Blog (Public)
- `GET /blog` - List blog posts (with filters: category, search)
- `GET /blog/{id}` - Get blog post (increments views)

## Database Schema
See `database/schema.sql` for complete SQL schema.

## Migrations
All migrations are in `database/migrations/` directory.

## Models
All models are in `app/Models/` directory with relationships defined.
