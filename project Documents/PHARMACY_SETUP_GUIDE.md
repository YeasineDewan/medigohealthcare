# Pharmacy Section Setup Guide

## Overview
This guide covers the complete setup and configuration of the pharmacy section, including Medical Devices and Prescription Orders management.

## 🚀 Quick Setup

### 1. Database Setup
Run the following migrations to create the necessary tables:

```bash
php artisan migrate
```

The following tables will be created:
- `medical_devices` - Stores medical device inventory
- `medicines` - Stores medicine inventory  
- `pharmacy_orders` - Stores pharmacy orders
- `pharmacy_order_items` - Stores order line items
- `stock_movements` - Tracks stock movement history
- `maintenance_records` - Tracks device maintenance

### 2. Install Dependencies
```bash
npm install axios
```

### 3. Environment Configuration
Ensure your `.env` file is configured with the database settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=medigo_db
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Start Development Servers
```bash
# Backend
php artisan serve

# Frontend (in separate terminal)
npm run dev
```

## 📁 File Structure

### Backend Files Created:
```
app/
├── Models/
│   ├── MedicalDevice.php
│   ├── Medicine.php
│   ├── PharmacyOrder.php
│   ├── PharmacyOrderItem.php
│   ├── StockMovement.php
│   └── MaintenanceRecord.php
├── Http/Controllers/Api/
│   ├── MedicalDeviceController.php
│   └── PharmacyOrderController.php
└── ...
database/migrations/
├── 2024_01_01_000004_create_medical_devices_table.php
├── 2024_01_01_000005_create_medicines_table.php
├── 2024_01_01_000006_create_pharmacy_orders_table.php
├── 2024_01_01_000007_create_pharmacy_order_items_table.php
├── 2024_01_01_000008_create_stock_movements_table.php
└── 2024_01_01_000009_create_maintenance_records_table.php
```

### Frontend Files Updated:
```
src/
├── services/
│   └── apiService.js (NEW)
├── pages/admin/pharmacy/
│   ├── MedicalDevices.jsx (UPDATED)
│   └── PrescriptionOrders.jsx (UPDATED)
└── utils/
    └── exportUtils.js (EXISTING)
```

## 🔧 API Endpoints

### Medical Devices API
- `GET /api/v1/medical-devices` - List devices with filtering
- `POST /api/v1/medical-devices` - Create new device
- `GET /api/v1/medical-devices/{id}` - Get single device
- `PUT /api/v1/medical-devices/{id}` - Update device
- `DELETE /api/v1/medical-devices/{id}` - Delete device
- `GET /api/v1/medical-devices/categories` - Get categories
- `GET /api/v1/medical-devices/manufacturers` - Get manufacturers
- `GET /api/v1/medical-devices/low-stock` - Get low stock devices
- `GET /api/v1/medical-devices/critical-stock` - Get critical stock devices
- `GET /api/v1/medical-devices/expiring-soon` - Get devices expiring soon
- `GET /api/v1/medical-devices/stats` - Get device statistics

### Pharmacy Orders API
- `GET /api/v1/pharmacy-orders` - List orders with filtering
- `POST /api/v1/pharmacy-orders` - Create new order
- `GET /api/v1/pharmacy-orders/{id}` - Get single order
- `PUT /api/v1/pharmacy-orders/{id}` - Update order
- `DELETE /api/v1/pharmacy-orders/{id}` - Delete order
- `GET /api/v1/pharmacy-orders/stats` - Get order statistics
- `POST /api/v1/pharmacy-orders/{id}/process` - Process order
- `POST /api/v1/pharmacy-orders/{id}/complete` - Complete order
- `POST /api/v1/pharmacy-orders/{id}/cancel` - Cancel order

## 🎯 Features Implemented

### Medical Devices Management
- ✅ **CRUD Operations** - Create, Read, Update, Delete devices
- ✅ **Advanced Filtering** - By category, status, stock level, manufacturer
- ✅ **Search Functionality** - Search by name, model, barcode, serial number
- ✅ **Stock Management** - Track current stock, min/max levels, reorder points
- ✅ **Warranty Tracking** - Monitor warranty expiry dates
- ✅ **Maintenance Records** - Track maintenance history and schedules
- ✅ **Image Upload** - Upload device images
- ✅ **Export Functionality** - Export to PDF, Word, CSV
- ✅ **Low Stock Alerts** - Visual indicators for low/critical stock
- ✅ **Warranty Expiry Alerts** - Warning for devices expiring soon

### Prescription Orders Management
- ✅ **Order Processing** - Complete order lifecycle management
- ✅ **Patient & Doctor Tracking** - Link orders to patients and doctors
- ✅ **Payment Status Tracking** - Monitor payment status
- ✅ **Order Status Updates** - Pending → Processing → Completed/Cancelled
- ✅ **Stock Integration** - Automatic stock updates on order completion
- ✅ **Order History** - Complete audit trail
- ✅ **Export Functionality** - Export orders to various formats
- ✅ **Real-time Statistics** - Dashboard with key metrics

## 🔒 Security Features
- ✅ **Authentication Required** - All endpoints protected by Sanctum
- ✅ **Role-based Access** - Admin/Doctor role requirements
- ✅ **Input Validation** - Comprehensive validation on all inputs
- ✅ **SQL Injection Protection** - Using Eloquent ORM
- ✅ **File Upload Security** - Validated image uploads only

## 📊 Data Relationships

### Medical Devices
```
MedicalDevice
├── hasMany StockMovement
├── hasMany MaintenanceRecord
└── hasMany PharmacyOrderItem
```

### Pharmacy Orders
```
PharmacyOrder
├── belongsTo User (patient)
├── belongsTo User (doctor)
├── belongsTo Prescription
└── hasMany PharmacyOrderItem
```

### Pharmacy Order Items
```
PharmacyOrderItem
├── belongsTo PharmacyOrder
├── belongsTo MedicalDevice (optional)
└── belongsTo Medicine (optional)
```

## 🧪 Testing

### Manual Testing Steps
1. **Medical Devices**
   - Navigate to Admin → Pharmacy → Medical Devices
   - Test adding a new device with all fields
   - Test editing an existing device
   - Test deleting a device
   - Test search and filter functionality
   - Test export functionality

2. **Prescription Orders**
   - Navigate to Admin → Pharmacy → Prescription Orders
   - Test creating a new order
   - Test updating order status
   - Test payment status updates
   - Test search and filter functionality
   - Test export functionality

### API Testing
Use Postman or similar tool to test API endpoints:
1. Set Authorization header: `Bearer {token}`
2. Test each endpoint with various parameters
3. Verify error handling and validation

## 🐛 Troubleshooting

### Common Issues

1. **API Not Responding**
   - Check if Laravel server is running: `php artisan serve`
   - Verify API routes are registered
   - Check CORS configuration

2. **Frontend Not Loading**
   - Check if Vite dev server is running: `npm run dev`
   - Verify API service import paths
   - Check browser console for errors

3. **Database Issues**
   - Run migrations: `php artisan migrate`
   - Check database credentials in `.env`
   - Verify database server is running

4. **Authentication Issues**
   - Check if user is logged in
   - Verify Sanctum token is valid
   - Check user roles and permissions

5. **File Upload Issues**
   - Check `storage/app/public` directory permissions
   - Run `php artisan storage:link`
   - Verify file size limits

## 📝 Notes

### Stock Management Logic
- Stock is automatically updated when orders are processed
- Cancellation returns items to stock
- Low stock alerts trigger when current stock ≤ min_stock_level
- Critical stock alerts trigger when current stock ≤ reorder_level

### Order Processing Flow
1. Order created with "pending" status
2. Admin processes order → status changes to "processing"
3. Stock is reserved/reduced
4. Order completed → status changes to "completed"
5. Payment status tracked separately

### Data Integrity
- All financial calculations use decimal precision
- Dates are stored in UTC and converted to local time for display
- Soft deletes implemented for data recovery

## 🚀 Production Deployment

1. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   php artisan config:cache
   php artisan route:cache
   ```

2. **Database Setup**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force
   ```

3. **File Storage**
   ```bash
   php artisan storage:link
   chmod -R 755 storage/app/public
   ```

4. **Queue Setup** (if using background jobs)
   ```bash
   php artisan queue:work
   ```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Laravel logs: `storage/logs/laravel.log`
3. Check browser console for frontend errors
4. Verify API responses in Network tab

---
**Last Updated**: March 2026
**Version**: 1.0.0
