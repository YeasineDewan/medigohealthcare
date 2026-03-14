#!/bin/bash

# cPanel Deployment Script for Medigo Healthcare
# Domain: temp1.medigohealthcares.com

echo "🚀 Starting cPanel deployment for Medigo Healthcare..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    print_error "Please run this script from the Laravel project root directory"
    exit 1
fi

# Step 1: Setup environment
print_status "Setting up environment..."
if [ ! -f ".env" ]; then
    if [ -f ".env.cpanel" ]; then
        cp .env.cpanel .env
        print_status "Copied .env.cpanel to .env"
    else
        print_error ".env.cpanel file not found!"
        exit 1
    fi
fi

# Step 2: Install PHP dependencies
print_status "Installing PHP dependencies..."
composer install --optimize-autoloader --no-dev

# Step 3: Generate application key
print_status "Generating application key..."
php artisan key:generate --force

# Step 4: Run database migrations
print_status "Running database migrations..."
php artisan migrate --force

# Step 5: Seed database
print_status "Seeding database..."
php artisan db:seed --force

# Step 6: Clear and cache configurations
print_status "Optimizing application..."
php artisan config:clear
php artisan config:cache
php artisan route:clear
php artisan route:cache
php artisan view:clear
php artisan view:cache
php artisan cache:clear

# Step 7: Set file permissions
print_status "Setting file permissions..."
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/
chmod -R 777 storage/logs/
chmod -R 777 storage/framework/cache/
chmod -R 777 storage/framework/sessions/
chmod -R 777 storage/framework/views/

# Step 8: Install and build frontend dependencies
print_status "Installing frontend dependencies..."
npm install

print_status "Building frontend for production..."
npm run build

# Step 9: Create storage link
print_status "Creating storage symbolic link..."
php artisan storage:link

# Step 10: Final optimizations
print_status "Running final optimizations..."
php artisan optimize
php artisan config:cache

print_status "✅ Deployment completed successfully!"
print_status "🌐 Your application should be available at: https://temp1.medigohealthcares.com"
print_warning "Don't forget to:"
print_warning "1. Set up SSL certificate in cPanel"
print_warning "2. Configure email settings in .env"
print_warning "3. Set up payment gateway credentials"
print_warning "4. Test all functionality"

echo ""
echo "🔧 Useful commands for maintenance:"
echo "  php artisan cache:clear"
echo "  php artisan config:cache"
echo "  php artisan route:cache"
echo "  php artisan view:cache"
echo "  php artisan backup:run --only-db"
