/**
 * Build frontend for cPanel and copy into Laravel public folder.
 * Run before zipping: npm run build:cpanel
 * Then zip the project and upload to cPanel.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((name) => {
      copyRecursive(path.join(src, name), path.join(dest, name));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function rimraf(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) rimraf(full);
    else fs.unlinkSync(full);
  });
  fs.rmdirSync(dir);
}

console.log('Building React app for production...');
execSync('node node_modules/vite/bin/vite.js build', {
  cwd: root,
  stdio: 'inherit',
});

if (!fs.existsSync(distDir)) {
  console.error('Build failed: dist folder not found.');
  process.exit(1);
}

console.log('Copying build to public/ for cPanel...');

// Copy index.html
const indexSrc = path.join(distDir, 'index.html');
const indexDest = path.join(publicDir, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, indexDest);
  console.log('  - index.html');
}

// Replace public/assets with dist/assets (Vite outputs to dist/assets)
const distAssets = path.join(distDir, 'assets');
const publicAssets = path.join(publicDir, 'assets');
if (fs.existsSync(distAssets)) {
  if (fs.existsSync(publicAssets)) rimraf(publicAssets);
  copyRecursive(distAssets, publicAssets);
  console.log('  - assets/');
}

// Copy any other top-level files from dist (e.g. favicon, logo)
fs.readdirSync(distDir).forEach((name) => {
  if (name === 'index.html' || name === 'assets') return;
  const src = path.join(distDir, name);
  const dest = path.join(publicDir, name);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest);
    console.log('  -', name);
  }
});

console.log('Done. public/ is ready. Zip the project and upload to cPanel.');
console.log('See CPANEL_DEPLOY.md for upload and server setup.');
