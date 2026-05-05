# cPanel Static Deploy - Progress Tracker

## Steps:

### [x] Step 0: Plan confirmed by user

### [x] Step 1: Clean install dependencies
`npm ci` - **FAILED: EPERM (file lock)**

### [x] Step 1.1.1: Remove node_modules
`Remove-Item -Recurse -Force node_modules` (PowerShell) **Partial: locked binaries skipped**

### [ ] Step 1.1.2: Delete package-lock.json
`del package-lock.json`

### [ ] Step 1.1.3: Install deps
`npm install`

**Note**: cmd.exe sequential (no `&&` chaining).

### [ ] Step 2: Build & prepare static site
`npm run package:cpanel`
- Runs vite build → dist/
- deploy-prep.cjs: copies .htaccess/assets, generates README
- PowerShell: zips to cpanel-deploy.zip

### [ ] Step 3: Verify output
- dist/ populated (index.html, assets/, .htaccess)
- cpanel-deploy.zip created (~MB size)

### [ ] Step 4: User upload to cPanel
Extract cpanel-deploy.zip → public_html (follow dist/README_DEPLOY.md)

**Current Status**: Starting Step 1.

**Next**: Execute npm ci

