# Deploy Medigo Healthcare to cPanel (Zip & Upload)

Follow these steps to build the project, zip it, upload to cPanel, and go live.

---

## 1. On your computer (before zipping)

### 1.1 Install dependencies (if not already)

```bash
npm install
composer install --no-dev --optimize-autoloader
```

### 1.2 Build frontend and copy to Laravel public folder

```bash
npm run build:cpanel
```

This runs `npm run build` and copies the built React app (`dist/index.html` and `dist/assets/`) into `public/` so one deployment serves both the API and the website.

### 1.3 Create the zip (exclude dev-only and heavy folders)

**Include:**
- `app/`
- `bootstrap/`
- `config/`
- `database/` (migrations, seeders – no .sql dumps if large)
- `public/` (must contain `index.php`, `.htaccess`, `index.html`, `assets/`)
- `resources/`
- `routes/`
- `storage/` (empty `framework/`, `logs/` – keep structure)
- `vendor/` (from `composer install`)
- `src/` (optional, for reference – not required to run)
- `.env.cpanel.example`
- `artisan`
- `composer.json`
- `composer.lock`

**Exclude from zip:**
- `node_modules/`
- `.git/`
- `dist/` (already copied to public)
- `.env` (you will create it on the server)
- `storage/logs/*` (empty the folder, keep the folder)
- `storage/framework/cache/*`
- `storage/framework/sessions/*`
- `storage/framework/views/*`

You can use cPanel’s File Manager “Compress” after upload instead of zipping on your PC; then extract and delete the zip. Or zip on PC with the above included/excluded.

---

## 2. On cPanel

### 2.1 Upload and extract

1. Log in to **cPanel**.
2. Open **File Manager** → go to `public_html` (or your domain’s folder/subdomain folder).
3. Upload your zip (or upload the folders manually).
4. If you uploaded a zip: **Extract** it so that the Laravel project is inside that directory (e.g. `public_html/` or `public_html/medigo/`).

### 2.2 Set document root to Laravel’s `public` folder

- In cPanel go to **Domains** (or **Domains** → **Domains** / **Subdomains**).
- Edit the domain (or subdomain) you use for this app.
- Set **Document Root** to the **`public`** folder of the project, for example:
  - `public_html/public`  
  - or `public_html/medigo/public`  
  so that the site runs from Laravel’s `public` directory (where `index.php`, `index.html`, and `assets/` live).

### 2.3 Create `.env` from the cPanel example

1. In File Manager, open the project root (same level as `app/`, `public/`, etc.).
2. Copy `.env.cpanel.example` to `.env`:
   - Copy the file and rename the copy to `.env`.
3. Edit `.env` and set at least:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_DATABASE=your_cpanel_database_name
DB_USERNAME=your_cpanel_database_user
DB_PASSWORD=your_cpanel_database_password

SANCTUM_STATEFUL_DOMAINS=yourdomain.com,www.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

4. Generate application key (SSH or cPanel Terminal, from project root):

```bash
php artisan key:generate
```

If you don’t have Terminal, use **PHP** in cPanel (if available) or run this once from your PC with SSH.

### 2.4 Database

1. **MySQL Databases**: Create a database and a user, assign the user to the database (All Privileges).
2. **phpMyAdmin**: Import your schema (e.g. run Laravel migrations or import a `.sql` file).
3. From project root (SSH/Terminal):

```bash
php artisan migrate --force
```

### 2.5 Permissions

Set these (File Manager → right‑click → Change Permissions):

- `storage/` → **755** (recursive: `storage/*` and subfolders **755**).
- `bootstrap/cache/` → **755**.
- `storage/framework/cache/`, `storage/framework/sessions/`, `storage/framework/views/`, `storage/logs/` → **775** or **755** so the web server can write.

### 2.6 Storage link (for uploads/public files)

From project root:

```bash
php artisan storage:link
```

### 2.7 Cache (optional but recommended)

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 3. After deployment

- Open `https://yourdomain.com` → you should see the Medigo Healthcare frontend.
- Open `https://yourdomain.com/api/v1/...` (e.g. a known API route) → you should get JSON (or the expected API response).
- If you see 500 errors: check `storage/logs/laravel.log` and `.env` (especially `APP_KEY`, `DB_*`, `APP_DEBUG=false`).

---

## 4. Checklist

- [ ] Ran `npm run build:cpanel` before zipping.
- [ ] Zip contains `public/index.php`, `public/.htaccess`, `public/index.html`, `public/assets/`.
- [ ] Document root points to the `public` folder.
- [ ] `.env` created from `.env.cpanel.example` and edited (DB, APP_URL, SANCTUM/FRONTEND).
- [ ] `php artisan key:generate` run.
- [ ] Database created and migrated (or schema imported).
- [ ] Permissions set on `storage/` and `bootstrap/cache/`.
- [ ] `php artisan storage:link` run.
- [ ] Config/route cache run in production.

---

## 5. Quick reference

| Item            | Value / Path                          |
|----------------|----------------------------------------|
| Site URL       | `https://yourdomain.com`              |
| API base       | `https://yourdomain.com/api/v1`      |
| Document root  | `.../public`                         |
| Env template   | `.env.cpanel.example` → `.env`       |
| Build command  | `npm run build:cpanel`                |

If you use a **subdirectory** (e.g. `https://yourdomain.com/medigo`), set the document root to `public_html/medigo/public` and in the frontend build use `base: '/medigo/'` in `vite.config.js`, then rebuild and run `npm run build:cpanel` again before zipping.
