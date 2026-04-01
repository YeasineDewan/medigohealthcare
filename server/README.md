# Medigo Healthcare Backend API

A comprehensive healthcare management system built with Laravel 11, providing RESTful APIs for managing patients, doctors, appointments, medical records, and billing.

## Features

- **Authentication & Authorization**: Role-based access control (Admin, Doctor, Patient)
- **User Management**: Complete CRUD operations for all user types
- **Appointment Management**: Scheduling, confirmation, cancellation, and tracking
- **Medical Records**: Comprehensive patient history and vital signs tracking
- **Billing System**: Complete financial management with payment processing
- **Dashboard APIs**: Real-time statistics and analytics
- **Search & Filtering**: Advanced search capabilities across all entities
- **API Documentation**: Comprehensive OpenAPI/Swagger documentation

## Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Authentication**: Laravel Sanctum
- **Database**: MySQL 8.0+
- **Testing**: PHPUnit
- **Documentation**: OpenAPI/Swagger
- **API Standards**: RESTful API design

## Requirements

- PHP 8.2+
- MySQL 8.0+
- Composer
- Node.js (for frontend development)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd medigo-healthcare/server
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Environment Setup

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Configuration

Update your `.env` file with your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=medigo_healthcare
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Database Migration & Seeding

```bash
php artisan migrate
php artisan db:seed
```

### 6. Start the Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
All protected endpoints require a valid Bearer token:

```http
Authorization: Bearer {token}
```

### Main Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/user` - Get current user
- `POST /auth/refresh` - Refresh token

#### Dashboard
- `GET /dashboard/admin` - Admin dashboard (admin role required)
- `GET /dashboard/doctor` - Doctor dashboard (doctor role required)
- `GET /dashboard/patient` - Patient dashboard (patient role required)
- `GET /dashboard/system-stats` - System statistics (admin role required)
- `GET /dashboard/real-time-stats` - Real-time statistics (admin role required)

#### Doctors
- `GET /doctors` - List all doctors
- `POST /doctors` - Create new doctor
- `GET /doctors/{id}` - Get doctor details
- `PUT /doctors/{id}` - Update doctor
- `DELETE /doctors/{id}` - Delete doctor
- `GET /doctors/{id}/appointments` - Get doctor appointments
- `GET /doctors/{id}/patients` - Get doctor patients
- `PUT /doctors/{id}/availability` - Update doctor availability

#### Patients
- `GET /patients` - List all patients
- `POST /patients` - Create new patient
- `GET /patients/{id}` - Get patient details
- `PUT /patients/{id}` - Update patient
- `DELETE /patients/{id}` - Delete patient
- `GET /patients/{id}/appointments` - Get patient appointments
- `GET /patients/{id}/medical-records` - Get patient medical records

#### Appointments
- `GET /appointments` - List all appointments
- `POST /appointments` - Create new appointment
- `GET /appointments/{id}` - Get appointment details
- `PUT /appointments/{id}` - Update appointment
- `DELETE /appointments/{id}` - Delete appointment
- `POST /appointments/{id}/cancel` - Cancel appointment
- `POST /appointments/{id}/confirm` - Confirm appointment
- `GET /appointments/available-slots/{doctorId}` - Get available slots

#### Medical Records
- `GET /medical-records` - List all medical records
- `POST /medical-records` - Create new medical record
- `GET /medical-records/{id}` - Get medical record details
- `PUT /medical-records/{id}` - Update medical record
- `DELETE /medical-records/{id}` - Delete medical record
- `GET /medical-records/patient/{patientId}/history` - Get patient history

#### Billing
- `GET /billing` - List all bills
- `POST /billing` - Create new bill
- `GET /billing/{id}` - Get bill details
- `PUT /billing/{id}` - Update bill
- `DELETE /billing/{id}` - Delete bill
- `POST /billing/{id}/pay` - Process payment
- `GET /billing/patient/{patientId}/history` - Get patient billing history
- `GET /billing/statistics` - Get billing statistics

## Database Schema

### Users Table
- Basic user information with role-based access
- Roles: admin, doctor, patient

### Doctors Table
- Professional information and credentials
- Specialization and department details
- Availability and scheduling

### Patients Table
- Personal and medical information
- Emergency contacts and insurance details
- Medical history and allergies

### Appointments Table
- Scheduling and status tracking
- Payment information
- Follow-up appointments

### Medical Records Table
- Patient visit history
- Vital signs and diagnoses
- Prescriptions and lab results

### Billing Table
- Financial transactions
- Payment processing
- Insurance claims

## Testing

### Run All Tests
```bash
php artisan test
```

### Run Specific Test
```bash
php artisan test --filter DashboardApiTest
```

### Generate Test Coverage Report
```bash
php artisan test --coverage
```

## API Documentation

Comprehensive API documentation is available at:
- **Swagger UI**: `http://localhost:8000/api/documentation`
- **OpenAPI JSON**: `http://localhost:8000/api/documentation.json`

## Default Credentials

After running the seeder, you can use these default credentials:

### Admin
- **Email**: admin@medigo.com
- **Password**: admin123

### Doctor
- **Email**: doctor1@medigo.com
- **Password**: password123

### Patient
- **Email**: patient1@medigo.com
- **Password**: password123

## Security Features

- **Authentication**: Laravel Sanctum for API authentication
- **Authorization**: Role-based access control
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Laravel's built-in protection
- **CSRF Protection**: Laravel's built-in protection

## Performance Optimization

- **Database Indexing**: Optimized database queries
- **Caching**: Redis caching for frequently accessed data
- **API Response Compression**: Gzip compression enabled
- **Query Optimization**: Eager loading to prevent N+1 queries

## Monitoring & Logging

- **Error Logging**: Comprehensive error logging
- **API Request Logging**: Request/response logging
- **Performance Monitoring**: Query performance tracking
- **Health Checks**: System health monitoring

## Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

2. **Database Setup**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   ```

3. **Optimization**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan optimize
   ```

4. **Queue Setup**
   ```bash
   php artisan queue:work --daemon
   ```

### Docker Deployment

```bash
docker build -t medigo-backend .
docker run -p 8000:8000 medigo-backend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- **Email**: support@medigo.com
- **Documentation**: https://docs.medigo.com
- **Issues**: GitHub Issues

## Changelog

### Version 1.0.0
- Initial release
- Complete CRUD operations for all entities
- Role-based authentication
- Dashboard APIs
- Comprehensive testing suite
- API documentation

## Roadmap

### Upcoming Features
- **Real-time Notifications**: WebSocket support
- **File Upload**: Document and image upload
- **Video Consultation**: Telemedicine integration
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Advanced analytics and reporting
- **Multi-tenant Support**: Multi-hospital support
- **Integration**: Third-party service integrations

### Technical Improvements
- **GraphQL API**: GraphQL endpoint support
- **Microservices**: Service-oriented architecture
- **Event Sourcing**: Event-driven architecture
- **Advanced Caching**: Multi-layer caching strategy
- **Load Balancing**: Horizontal scaling support
