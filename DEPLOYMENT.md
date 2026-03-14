# 🚀 Medigo Healthcare - cPanel Deployment Guide

## 📋 Overview
This guide will help you deploy the Medigo Healthcare application on cPanel with real MySQL database integration.

## 🗄️ Database Setup

### 1. Create MySQL Database
1. Log in to cPanel
2. Go to **MySQL Databases** under **Databases**
3. Create a new database:
   - Database name: `medigo_healthcare`
   - Username: `medigo_user` (or your preferred name)
   - Password: Generate a strong password
4. Add the user to the database with **ALL PRIVILEGES**

### 2. Import Database Schema
1. Go to **phpMyAdmin** in cPanel
2. Select your `medigo_healthcare` database
3. Click **Import**
4. Choose the `database/medigo_healthcare.sql` file
5. Click **Go** to import

## 📁 File Upload

### 1. Upload Frontend Files
1. Go to **File Manager** in cPanel
2. Navigate to `public_html`
3. Create a new folder called `medigo`
4. Upload all files from your project's `src` and `public` folders to `public_html/medigo`

### 2. Upload API Files
1. In `public_html/medigo`, create an `api` folder
2. Upload the entire `api` folder contents to `public_html/medigo/api`
3. Upload the `database` folder contents to `public_html/medigo/database`

### 3. Set Permissions
- Set `api/uploads` folder permissions to `755`
- Set `api` folder `.htaccess` file permissions to `644`

## ⚙️ Configuration

### 1. Update API Configuration
Edit `public_html/medigo/api/config.php`:

```php
// Update these values
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_cpanel_database_name');
define('DB_USER', 'your_cpanel_username');
define('DB_PASS', 'your_database_password');

// Update JWT secret
define('JWT_SECRET', 'your-unique-secret-key-here');

// Update allowed origins
define('ALLOWED_ORIGINS', ['https://yourdomain.com/medigo']);

// Update file paths
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
```

### 2. Update Frontend API URL
Edit your frontend configuration to point to your domain:

```javascript
// In your frontend code
const API_BASE_URL = 'https://yourdomain.com/medigo/api/v1';
```

## 🔧 cPanel Configuration

### 1. PHP Settings
1. Go to **Select PHP Version** in cPanel
2. Choose PHP 8.1 or higher
3. Click **Options** and configure:
   - `memory_limit`: 256M
   - `max_execution_time`: 300
   - `upload_max_filesize`: 10M
   - `post_max_size`: 10M
   - `max_input_vars`: 3000

### 2. Apache Modules
Ensure these modules are enabled:
- `mod_rewrite` (for URL rewriting)
- `mod_headers` (for CORS headers)
- `mod_php` (for PHP execution)

### 3. SSL Certificate
1. Go to **SSL/TLS** in cPanel
2. Install a free Let's Encrypt certificate
3. Force HTTPS redirect

## 🧪 Testing

### 1. Test Database Connection
Create a test file `public_html/medigo/test-db.php`:

```php
<?php
try {
    $conn = new mysqli('localhost', 'your_username', 'your_password', 'your_database');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Database connected successfully!";
    
    // Test a query
    $result = $conn->query("SELECT COUNT(*) as count FROM video_carousel");
    $row = $result->fetch_assoc();
    echo "<br>Video carousel records: " . $row['count'];
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

Access `https://yourdomain.com/medigo/test-db.php` to test.

### 2. Test API Endpoints
Test these endpoints in your browser or with Postman:

```bash
# Test admin menu
GET https://yourdomain.com/medigo/api/v1/admin/menu

# Test video carousel
GET https://yourdomain.com/medigo/api/v1/video-carousel

# Test database connection
GET https://yourdomain.com/medigo/api/v1/test-db
```

## 🚀 Frontend Deployment

### 1. Build for Production
```bash
# In your project root
npm run build
```

### 2. Upload Build Files
1. Copy the `dist` folder contents to `public_html/medigo`
2. Ensure the `index.html` file is in the root

### 3. Configure Router
Update your frontend router for production:

```javascript
// In your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      // Your routes
    ]
  }
], {
  basename: "/medigo" // Add this for subdirectory deployment
});
```

## 🔒 Security

### 1. Environment Security
- Change default database passwords
- Use strong JWT secrets
- Update file permissions
- Disable directory listing

### 2. API Security
- Implement rate limiting
- Add input validation
- Use prepared statements (already implemented)
- Enable HTTPS only

### 3. Database Security
- Regular backups
- User permissions
- Monitor access logs

## 📊 Monitoring

### 1. Error Logs
Check these logs regularly:
- cPanel Error Log
- Apache Error Log
- PHP Error Log

### 2. Performance
- Monitor database performance
- Check API response times
- Monitor disk space usage

## 🔄 Maintenance

### 1. Regular Tasks
- Weekly database backups
- Monthly security updates
- Quarterly performance reviews
- Annual SSL renewal

### 2. Updates
- Update PHP version when needed
- Update dependencies
- Apply security patches

## 🐛 Troubleshooting

### Common Issues:

#### 1. 500 Internal Server Error
- Check file permissions (644 for files, 755 for directories)
- Verify database credentials
- Check PHP error logs

#### 2. CORS Errors
- Update ALLOWED_ORIGINS in config.php
- Check .htaccess CORS headers
- Verify HTTPS/HTTP consistency

#### 3. Database Connection Failed
- Verify database credentials
- Check database exists
- Ensure user has privileges

#### 4. 404 Not Found
- Check .htaccess URL rewriting
- Verify file paths
- Check case sensitivity

#### 5. File Upload Issues
- Check upload directory permissions
- Verify file size limits
- Check MIME type restrictions

## 📞 Support

### Quick Commands:
```bash
# Check PHP version
php -v

# Check MySQL status
mysql status

# Restart Apache (if needed)
sudo service httpd restart

# Check logs
tail -f /usr/local/apache/logs/error_log
```

### Resources:
- cPanel Documentation
- PHP Manual
- MySQL Documentation
- Your hosting provider support

## ✅ Deployment Checklist

- [ ] Database created and schema imported
- [ ] API files uploaded and configured
- [ ] Frontend built and uploaded
- [ ] Database connection tested
- - [ ] API endpoints tested
- [ ] SSL certificate installed
- [ ] Permissions set correctly
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Security measures in place

## 🎉 You're Ready!

Once you've completed all steps, your Medigo Healthcare application should be fully functional with:
- Real MySQL database integration
- Complete admin panel
- Video carousel management
- Patient management
- Doctor scheduling
- Medical records
- Billing system
- And much more!

Access your application at: `https://yourdomain.com/medigo`

For admin access, create a super admin user in the database or use the registration endpoint.
