# 🔧 XAMPP Backend Connection Setup Guide

## 🚨 Problem: Backend Connection Issues with XAMPP

This guide will help you solve the XAMPP connection issues step by step.

## 📋 Step-by-Step Solution

### Step 1: Verify XAMPP Services

1. **Open XAMPP Control Panel**
2. **Check these services are RUNNING:**
   - ✅ Apache (Port 80/443)
   - ✅ MySQL (Port 3306)

3. **If services are not running:**
   - Click "Start" next to each service
   - If they fail to start, check for port conflicts

### Step 2: Create the Database

1. **Open phpMyAdmin:**
   - Go to `http://localhost/phpmyadmin` in browser
   - OR click "Admin" next to MySQL in XAMPP

2. **Create database:**
   ```
   Database Name: medigo_db
   Collation: utf8mb4_unicode_ci
   ```

3. **Click "Create"**

### Step 3: Configure Environment File

1. **Copy the XAMPP environment file:**
   ```bash
   cp .env.xampp .env
   ```

2. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```

3. **Verify database configuration in .env:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=medigo_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### Step 4: Test Database Connection

1. **Run this command in terminal:**
   ```bash
   php artisan tinker
   ```

2. **Test connection:**
   ```php
   >>> DB::connection()->getPdo();
   ```

3. **If successful, you'll see PDO connection info**

### Step 5: Run Database Migrations

1. **Run migrations:**
   ```bash
   php artisan migrate
   ```

2. **If you get errors, try:**
   ```bash
   php artisan migrate:fresh --seed
   ```

### Step 6: Start Laravel Development Server

1. **Start the server:**
   ```bash
   php artisan serve
   ```

2. **Server should run on:**
   ```
   http://localhost:8000
   ```

## 🔍 Common Issues & Solutions

### Issue 1: "Access denied for user 'root'@'localhost'"
**Solution:**
1. Open phpMyAdmin
2. Go to "User accounts"
3. Create a new user or reset root password
4. Update .env with correct credentials

### Issue 2: "Can't connect to MySQL server"
**Solution:**
1. Check if MySQL is running in XAMPP
2. Restart MySQL service
3. Check for port conflicts (Skype, other apps using port 3306)

### Issue 3: "SQLSTATE[HY000] [1049] Unknown database"
**Solution:**
1. Create the database in phpMyAdmin
2. Verify database name in .env matches exactly
3. Database names are case-sensitive on Linux

### Issue 4: "Port 80 already in use"
**Solution:**
1. Stop Skype or other apps using port 80
2. OR change Apache port in XAMPP config
3. OR run Apache on port 8080

### Issue 5: "Migration failed"
**Solution:**
1. Clear config cache:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

2. Check database permissions
3. Try fresh migration:
   ```bash
   php artisan migrate:fresh
   ```

## 🛠️ Advanced Troubleshooting

### Check XAMPP Logs
1. **Apache logs:** `xampp/apache/logs/error.log`
2. **MySQL logs:** `xampp/mysql/data/mysql_error.log`

### Test MySQL Connection Manually
1. **Open MySQL command line:**
   - Navigate to `xampp/mysql/bin`
   - Run `mysql -u root -p`

2. **Create database manually:**
   ```sql
   CREATE DATABASE medigo_db;
   SHOW DATABASES;
   ```

### Check PHP Extensions
1. **Ensure these extensions are enabled in php.ini:**
   ```ini
   extension=pdo_mysql
   extension=mysqli
   extension=mbstring
   extension=openssl
   extension=fileinfo
   ```

## 🚀 Quick Start Commands

```bash
# 1. Copy environment file
cp .env.xampp .env

# 2. Generate key
php artisan key:generate

# 3. Clear cache
php artisan config:clear
php artisan cache:clear

# 4. Run migrations
php artisan migrate

# 5. Start server
php artisan serve

# 6. Test frontend
npm run dev
```

## 📱 Testing the Connection

### Test 1: Laravel Backend
1. Open `http://localhost:8000` in browser
2. Should see Laravel welcome page

### Test 2: API Endpoints
1. Open `http://localhost:8000/api/health`
2. Should return health status

### Test 3: Frontend Connection
1. Start frontend: `npm run dev`
2. Open `http://localhost:5173`
3. Should connect to backend without errors

## 🎯 Success Indicators

✅ **XAMPP Services:** Apache & MySQL running
✅ **Database:** `medigo_db` created
✅ **Laravel:** Welcome page loads
✅ **Migrations:** Tables created successfully
✅ **Frontend:** Connects to backend
✅ **Prescription System:** API endpoints working

## 🆘 Still Having Issues?

### Check These:
1. **XAMPP Version:** Use latest XAMPP
2. **PHP Version:** Ensure PHP 8.1+ in XAMPP
3. **Windows Permissions:** Run as Administrator
4. **Antivirus:** Temporarily disable if blocking
5. **Firewall:** Allow XAMPP through firewall

### Reset Everything:
```bash
# 1. Stop XAMPP services
# 2. Delete .env file
# 3. Drop database in phpMyAdmin
# 4. Restart XAMPP
# 5. Follow steps from beginning
```

---

## 🎉 Expected Result

After following these steps, you should have:
- ✅ Working XAMPP setup
- ✅ Connected Laravel backend
- ✅ Functional prescription management system
- ✅ Frontend communicating with backend

**If you're still having issues, please share the specific error message you're seeing!**
