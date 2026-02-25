# Medigo Server - Laravel API

Backend API for Medigo Healthcare platform.

## Requirements

- PHP 8.2+
- Composer
- MySQL 8.0

## Setup

1. **Create Laravel project** (if starting fresh):
   ```bash
   composer create-project laravel/laravel . --prefer-dist
   ```

2. **Copy these files** into your Laravel project:
   - `database/migrations/*` → `database/migrations/`
   - `database/seeders/MenuSeeder.php` → `database/seeders/`
   - `app/Models/*` → `app/Models/`
   - `app/Http/Controllers/Api/*` → `app/Http/Controllers/Api/`
   - `routes/api.php` → Add routes to your `routes/api.php` or `bootstrap/app.php`

3. **Run migrations**:
   ```bash
   php artisan migrate
   php artisan db:seed --class=MenuSeeder
   ```

4. **Configure CORS** in `config/cors.php` to allow requests from the React app (e.g. `http://localhost:5173`).

5. **Start server**:
   ```bash
   php artisan serve
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/menus/services` | Services mega menu data |
| GET | `/api/v1/menus/emergency` | Emergency services menu data |

## Frontend Integration

Set `VITE_API_URL=http://localhost:8000/api/v1` in your React app's `.env` for API calls, or configure Vite proxy in `medigo-client/vite.config.js` (already set for `/api`).
