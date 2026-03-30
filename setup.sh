#!/bin/bash

# Medigo Healthcare - Laravel Backend Setup Script
# Run this script after uploading files to your VPS

echo "🚀 Medigo Healthcare - Backend Setup"
echo "===================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your database credentials and domain!"
    exit 1
fi

# Install dependencies
echo "📦 Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate
fi

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Seed database
echo "🌱 Seeding database..."
php artisan db:seed --class=MenuSeeder --force

# Cache configuration
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
echo "🔒 Setting file permissions..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your database credentials"
echo "2. Update APP_URL and FRONTEND_URL in .env"
echo "3. Configure Nginx (see VPS_DEPLOYMENT.md)"
echo "4. Test API: curl http://your-domain.com/api/v1/menus/services"
