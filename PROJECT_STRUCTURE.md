# Medigo Healthcare - Project Structure

## 📁 Directory Organization

```
medigohealthcare-main/
├── 📄 .env                           # Main environment configuration
├── 📄 .env.example                   # Environment template
├── 📄 .gitignore                     # Git ignore rules
├── 📄 artisan                        # Laravel command line tool
├── 📄 composer.json                  # PHP dependencies
├── 📄 package.json                   # Node.js dependencies
├── 📄 package-lock.json              # NPM lock file
├── 📄 vite.config.js                 # Vite development config
├── 📄 vite.config.cpanel.js          # Vite production config
│
├── 📁 app/                           # Laravel application code
│   ├── Http/                         # Controllers, Middleware
│   ├── Models/                       # Eloquent models
│   └── ...                          # Other Laravel app files
│
├── 📁 bootstrap/                     # Bootstrap files
│   ├── app.php                      # Application bootstrap
│   └── cache/                       # Cache directory
│
├── 📁 config/                        # Configuration files
│   ├── app.php                      # App configuration
│   ├── database.php                 # Database config
│   └── ...                          # Other config files
│
├── 📁 database/                      # Database files
│   ├── migrations/                   # Migration files
│   ├── seeders/                      # Database seeders
│   └── medigo_healthcare.sql        # Database schema
│
├── 📁 public/                        # Public web root
│   ├── index.php                    # Laravel entry point
│   ├── .htaccess                    # Apache configuration
│   ├── assets/                      # Static assets
│   └── prescriptions/               # Prescription uploads
│
├── 📁 resources/                     # Laravel resources
│   └── views/                       # Blade templates
│
├── 📁 routes/                        # Route definitions
│   ├── web.php                      # Web routes
│   ├── api.php                      # API routes
│   └── console.php                  # Console routes
│
├── 📁 scripts/                       # 🔧 Utility scripts
│   ├── README.md                    # Scripts documentation
│   ├── deploy-cpanel.sh             # cPanel deployment (Linux)
│   ├── setup.sh                     # Project setup
│   ├── upload_database.bat          # Database upload (Windows)
│   ├── start-backend.bat            # Start backend (Windows)
│   ├── run-build.bat                # Build frontend (Windows)
│   ├── download_ca.ps1              # Download certificates
│   ├── fix_ssl_admin.ps1            # SSL fix for admin
│   ├── start-server.ps1             # Start server (PowerShell)
│   └── test_ssl_fix.ps1             # Test SSL fixes
│
├── 📁 tests/                         # 🧪 Test files
│   ├── README.md                    # Tests documentation
│   ├── test_ssl.php                 # SSL testing
│   └── [additional test files]      # Component and integration tests
│
├── 📁 server/                        # Server configuration
│   ├── app/                         # Server app files
│   ├── bootstrap/                   # Server bootstrap
│   ├── config/                      # Server config
│   └── database/                    # Server database
│
├── 📁 src/                           # React frontend source
│   ├── components/                  # React components
│   ├── pages/                       # React pages
│   ├── hooks/                       # Custom hooks
│   ├── App.jsx                      # Main App component
│   └── main.jsx                     # React entry point
│
├── 📁 storage/                       # Laravel storage
│   ├── app/                         # App storage
│   ├── framework/                   # Framework storage
│   └── logs/                        # Log files
│
├── 📁 vendor/                        # Composer dependencies
│
├── 📁 node_modules/                  # NPM dependencies
│
├── 📁 project Documents/             # 📚 Documentation
│   ├── DATABASE_UPLOAD_GUIDE.md
│   ├── ENHANCEMENTS_DONE.md
│   ├── ENV_CONFIGURATION_GUIDE.md
│   ├── FIXES_APPLIED.md
│   └── ...                          # Other documentation
│
└── 📚 Root Documentation
    ├── DEPLOYMENT.md                # Main deployment guide
    ├── CPANEL_DEPLOYMENT_GUIDE.md   # cPanel specific guide
    ├── PROJECT_STRUCTURE.md         # This file
    ├── TODO.md                      # Todo items
    └── ...                          # Other markdown files
```

## 🗂️ File Organization Summary

### ✅ **Cleaned Up**
- **Scripts**: Moved to `scripts/` directory
- **Tests**: Moved to `tests/` directory  
- **Environment**: Consolidated to single `.env` file
- **Removed**: Duplicate `.env` files, unnecessary utilities

### 📁 **Key Directories**
- **`scripts/`** - All deployment and utility scripts
- **`tests/`** - All test files and testing utilities
- **`src/`** - React frontend source code
- **`app/`** - Laravel backend application code
- **`public/`** - Web-accessible files

### 🎯 **Important Files**
- **`.env`** - Production environment configuration
- **`artisan`** - Laravel command line tool
- **`composer.json`** - PHP dependencies
- **`package.json`** - Node.js dependencies

## 🚀 Deployment Ready

The project is now organized and ready for cPanel deployment with:
- Clean directory structure
- Consolidated configuration
- Organized scripts and tests
- Production-optimized environment

## 📋 Next Steps

1. **Deploy to cPanel** using `scripts/deploy-cpanel.sh`
2. **Configure domain** for `test.medigohealthcares.com`
3. **Set up database** with provided credentials
4. **Test application** functionality
