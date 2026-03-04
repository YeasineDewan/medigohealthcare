# 🗄️ Medigo Healthcare - Database Upload Guide

This guide will help you upload all the data to your online database for the Medigo Healthcare platform.

## 📋 Prerequisites

1. **Online Database**: MySQL database hosted on any cloud provider
2. **Node.js**: Version 18 or higher
3. **Database Credentials**: Host, username, password, and database name

## 🚀 Quick Upload

### Step 1: Install Dependencies
```bash
npm install mysql2
```

### Step 2: Configure Database Connection
Copy the online environment template:
```bash
cp .env.online .env
```

Edit `.env` file with your online database details:
```env
DB_HOST=your-online-db-host.com
DB_PORT=3306
DB_DATABASE=medigo_db
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### Step 3: Run Upload Script
```bash
# Using Node.js directly
node upload_to_online_db.js

# Or using the batch file (Windows)
upload_database.bat
```

## 🏗️ What Gets Uploaded

### 📊 Database Schema
- 25+ tables with proper relationships
- Professional indexing for performance
- Foreign key constraints
- Comprehensive data types

### 👥 Users & Roles
- **8 Users**: Admin, doctors, patients, pharmacist, lab technician, receptionist
- **7 Roles**: Super admin, admin, doctor, pharmacist, patient, lab technician, receptionist
- **25+ Permissions**: Complete RBAC system

### 🏥 Medical Data
- **5 Doctors**: Various specialties (Cardiology, Neurology, Pediatrics, etc.)
- **6 Services**: Consultation, emergency, lab tests, imaging, etc.
- **8 Products**: Medicines, devices, supplies
- **8 Lab Tests**: Comprehensive test panel

### 📋 Sample Records
- **3 Orders**: Sample purchase orders
- **3 Appointments**: Doctor consultations
- **3 Prescriptions**: Medical prescriptions
- **3 Prescription Uploads**: Dynamic prescription system
- **3 Lab Test Bookings**: Sample lab bookings

### 💰 Financial Data
- **4 Payments**: Sample payment records
- **3 Doctor Earnings**: Commission tracking
- **Inventory Records**: Stock management

### 📝 Content
- **3 Blog Posts**: Health articles
- **4 Reviews**: User feedback
- **3 Notifications**: System notifications

## 🔧 Supported Database Providers

### AWS RDS
```env
DB_HOST=your-rds-instance.rds.amazonaws.com
DB_USERNAME=your_rds_username
DB_PASSWORD=your_rds_password
```

### DigitalOcean Managed Database
```env
DB_HOST=your-do-db-host.do.db.ondigitalocean.com
DB_PORT=25060
DB_USERNAME=your_do_username
DB_PASSWORD=your_do_password
```

### PlanetScale
```env
DB_HOST=your-planetscale-host.planetscale.com
DB_USERNAME=your_planetscale_username
DB_PASSWORD=your_planetscale_password
```

### Heroku Postgres
```env
DB_CONNECTION=pgsql
DB_HOST=your-heroku-host.compute-1.amazonaws.com
DB_PORT=5432
DB_DATABASE=your_heroku_db
```

### Traditional Hosting
```env
DB_HOST=your-domain.com
DB_PORT=3306
DB_DATABASE=medigo_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 📁 File Structure

```
database/
├── schema.sql              # Database structure
├── seed_data.sql           # All sample data
└── upload_to_online_db.js  # Upload script

.env.online                 # Online DB template
.env                        # Your actual config (create this)
upload_database.bat         # Windows batch file
```

## 🔍 Verification

The upload script automatically verifies the data:

| Table | Expected Records |
|-------|-----------------|
| users | 8 |
| doctors | 5 |
| services | 6 |
| products | 8 |
| lab_tests | 8 |
| prescription_uploads | 3 |
| appointments | 3 |
| blog_posts | 3 |

## 🚨 Troubleshooting

### Connection Issues
```bash
Error: connect ETIMEDOUT
```
- Check database host and port
- Verify firewall settings
- Ensure database is accessible from your IP

### Authentication Issues
```bash
Error: Access denied for user
```
- Verify username and password
- Check user permissions
- Ensure database exists

### SSL Issues
```bash
Error: SSL connection error
```
- Update SSL settings in upload script
- Check if your provider requires SSL

### Large Data Issues
```bash
Error: Lost connection to MySQL server
```
- Increase MySQL timeout settings
- Upload data in smaller batches

## 🔄 Manual Upload (Alternative)

If the script fails, you can upload manually:

### 1. Import Schema
```bash
mysql -h your-host -u username -p database_name < database/schema.sql
```

### 2. Import Data
```bash
mysql -h your-host -u username -p database_name < database/seed_data.sql
```

## 📊 After Upload

Once uploaded, your online database will contain:

### 🏥 Complete Healthcare System
- Multi-specialty doctor profiles
- Comprehensive service catalog
- Product inventory management
- Lab test booking system

### 👥 User Management
- Role-based access control
- Complete user profiles
- Permission system

### 💼 Business Operations
- Order management
- Payment processing
- Appointment scheduling
- Prescription management

### 📈 Analytics Ready
- Activity logging
- Financial tracking
- Performance metrics
- User engagement data

## 🎯 Next Steps

1. **Update Frontend**: Point your frontend to the online database
2. **Configure Environment**: Update `.env` with production settings
3. **Test Integration**: Verify all features work with online data
4. **Deploy**: Deploy your application to production

## 🆘 Support

If you encounter issues:

1. Check database credentials
2. Verify network connectivity
3. Review error messages
4. Try manual upload as alternative
5. Contact your database provider

## 📝 Notes

- All passwords are hashed with bcrypt
- IDs start from 1 and auto-increment
- Timestamps use UTC timezone
- Foreign key constraints ensure data integrity
- Soft deletes implemented where applicable

---

**🎉 Your Medigo Healthcare database is now ready for production!**
