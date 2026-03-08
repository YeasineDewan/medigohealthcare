# Environment Configuration Guide

## Overview
This project now uses a **single unified `.env` file** that consolidates all previous environment configurations (`.env.comprehensive`, `.env.example`, `.env.online`, `.env.xampp`).

## Quick Setup

### 1. Generate Application Key
```bash
php artisan key:generate
```

### 2. Configure Database
Update these settings in your `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=medigo_db
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Start Development Server
```bash
php artisan serve
```

## Environment Switching

### Local Development (XAMPP/Laravel Valet/Docker)
```env
APP_ENV=local
APP_DEBUG=true
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=
```

### Production Server
Uncomment and configure these settings:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
DB_HOST=your-production-host
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

## Key Configuration Sections

### 🗄️ Database
- MySQL connection settings
- Support for local and production databases
- Alternative database provider examples included

### 💳 Payment Gateways
- bKash (enabled by default)
- Nagad, Rocket, Stripe (disabled by default)
- Easy switching between payment providers

### 📧 Notifications
- Email configuration (log driver by default)
- SMS support via Twilio
- Toggle notifications on/off

### 📁 File Storage
- Local storage by default
- AWS S3 configuration available (commented)
- Easy cloud storage switch

### 🔄 Real-time Features
- Pusher/WebSocket support
- Broadcasting configuration
- Real-time notifications

### 💊 Prescription System
- File upload settings
- OCR configuration
- Notification preferences

### 🔐 Security & Performance
- Session encryption
- CSRF protection
- Caching configurations
- API rate limiting

## Production Deployment Checklist

When deploying to production, uncomment and configure these settings:

```env
# Production Environment
APP_ENV=production
APP_DEBUG=false

# Enhanced Security
SESSION_SECURE_COOKIE=true
BACKUP_ENCRYPTION=true

# Production Mail
MAIL_MAILER=smtp
MAIL_HOST=your-mail-host.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls

# Performance Optimization
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
FILESYSTEM_DISK=s3

# Logging
LOG_LEVEL=warning
```

## Optional Features

### Redis Cache
Uncomment to enable Redis:
```env
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Development Tools
Uncomment to enable debugging tools:
```env
DEBUGBAR_ENABLED=false
TELESCOPE_ENABLED=false
CLOCKWORK_ENABLED=false
```

## Migration from Multiple .env Files

All configurations from the previous files have been consolidated:

- ✅ `.env.comprehensive` → All settings included
- ✅ `.env.example` → Template structure maintained  
- ✅ `.env.online` → Production settings in comments
- ✅ `.env.xampp` → Local development defaults

## Backup

A backup of your original `.env` file (if it existed) has been saved as `.env.backup`.

## Support

For configuration issues:
1. Check Laravel documentation: https://laravel.com/docs/configuration
2. Verify all required values are filled
3. Run `php artisan config:cache` after changes in production

---
**Note**: Never commit your `.env` file to version control. It contains sensitive credentials.
