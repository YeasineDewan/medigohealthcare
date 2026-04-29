# Medigo Healthcare - Professional Production Ready

## 🚀 Quick Start (Dev)

**1. Prerequisites**
- PHP 8.1+
- Composer (or composer.phar)
- Node.js 18+

**2. Backend Setup**
```
# Download Composer
powershell -Command \"Invoke-WebRequest -Uri 'https://getcomposer.org/installer' -OutFile 'composer-setup.php'\"
php composer-setup.php --filename=composer.phar
del composer-setup.php

# Install deps
php composer.phar install

# Laravel
php artisan key:generate --force
php artisan migrate:fresh --seed
php artisan serve
```

**3. Frontend**
```
npm install
npm run dev
```

**Ports**:
- Backend: localhost:8000
- Frontend: localhost:5173

## 🏢 cPanel Deploy
```
php composer.phar install --no-dev --optimize-autoloader
php artisan key:gen --force
php artisan migrate --force
npm ci
npm run build
```

Delete old /api/ folder.

**Features Complete**:
- Unified .env production
- Full CRUD APIs (doctors, products, appointments...)
- Payments (bKash)
- Notices/Offers
- Roles/Auth
- Seeders

Ready! 🚀
