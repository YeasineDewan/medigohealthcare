# Running the Development Server

## Quick Start

Due to PowerShell execution policy restrictions on Windows, use one of these methods:

### Method 1: Direct Node Commands (Recommended)
```bash
# Development server
node node_modules/vite/bin/vite.js

# Build for production
node node_modules/vite/bin/vite.js build

# Preview production build
node node_modules/vite/bin/vite.js preview

# Lint code
node node_modules/eslint/bin/eslint.js .
```

### Method 2: Batch File
```cmd
# Development server
run.bat dev

# Build for production
run.bat build

# Preview production build
run.bat preview

# Lint code
run.bat lint
```

### Method 3: Fix PowerShell Execution Policy (One-time setup)
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then you can use normal npm commands:
```bash
npm run dev
npm run build
npm run lint
```

## Development Server
The server will start on:
- Local: http://localhost:5173
- Network: http://192.168.10.208:5173

## Available Scripts
- `dev` - Start development server
- `build` - Build for production
- `build:prod` - Build for production with production mode
- `lint` - Run ESLint
- `preview` - Preview production build
- `start` - Start preview server with host binding
