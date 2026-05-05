/**
 * deploy-prep.cjs
 * Finalize dist/ for cPanel deployment with validation and deploy docs.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const DIST_INDEX = path.join(DIST, 'index.html');

function exists(filePath) {
  return fs.existsSync(filePath);
}

function copyFirstMatch(options, destination) {
  const source = options.find(exists);
  if (!source) {
    return null;
  }
  fs.copyFileSync(source, destination);
  return source;
}

function ensureDistExists() {
  if (!exists(DIST)) {
    throw new Error('dist/ not found. Run vite build before deploy-prep.');
  }
  if (!exists(DIST_INDEX)) {
    throw new Error('dist/index.html not found. Build output is incomplete.');
  }
}

function validateBuiltIndex() {
  const html = fs.readFileSync(DIST_INDEX, 'utf8');
  if (html.includes('/src/main.js')) {
    throw new Error('dist/index.html still references /src/main.js. Production build is invalid.');
  }
  if (!html.includes('/assets/js/')) {
    throw new Error('dist/index.html does not reference built JS assets.');
  }
}

function printTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir).filter((e) => e !== 'README_DEPLOY.md');
  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    const fullPath = path.join(dir, entry);
    const isDir = fs.statSync(fullPath).isDirectory();
    const size = isDir ? '' : ` (${(fs.statSync(fullPath).size / 1024).toFixed(1)} KB)`;
    console.log(`${prefix}${isLast ? '└──' : '├──'} ${entry}${size}`);
    if (isDir) {
      printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

function writeDeployReadme() {
  const readmePath = path.join(DIST, 'README_DEPLOY.md');
  const content = [
    '# Medigo cPanel Deployment',
    '',
    '1. Open cPanel File Manager and go to `public_html`.',
    '2. Enable "Show Hidden Files".',
    '3. Remove old files from `public_html`.',
    '4. Upload all files from this `dist/` folder (including `.htaccess`).',
    '5. Clear browser cache and open your domain.',
    '',
    'Do not upload project source files like `src/` or root `index.html`.',
    '',
  ].join('\n');
  fs.writeFileSync(readmePath, content, 'utf8');
}

console.log('\n── Medigo cPanel Deploy Prep ──────────────────────────');

ensureDistExists();
validateBuiltIndex();

const copiedHtaccess = copyFirstMatch(
  [path.join(ROOT, 'public', '.htaccess'), path.join(ROOT, '.htaccess')],
  path.join(DIST, '.htaccess'),
);
const copiedLogo = copyFirstMatch(
  [path.join(ROOT, 'public', 'logo.png')],
  path.join(DIST, 'logo.png'),
);
const copiedFavicon = copyFirstMatch(
  [path.join(ROOT, 'public', 'favicon.svg')],
  path.join(DIST, 'favicon.svg'),
);

if (copiedHtaccess) {
  console.log(`  ✔  Copied  ${path.relative(ROOT, copiedHtaccess)}  →  dist/.htaccess`);
} else {
  console.warn('  ⚠  .htaccess not found in public/ or project root');
}

if (copiedLogo) {
  console.log(`  ✔  Copied  ${path.relative(ROOT, copiedLogo)}  →  dist/logo.png`);
} else {
  console.warn('  ⚠  logo.png not found in public/');
}

if (copiedFavicon) {
  console.log(`  ✔  Copied  ${path.relative(ROOT, copiedFavicon)}  →  dist/favicon.svg`);
} else {
  console.warn('  ⚠  favicon.svg not found in public/');
}

writeDeployReadme();
console.log('  ✔  Generated dist/README_DEPLOY.md');

console.log('\n── Build Output ────────────────────────────────────────');
printTree(DIST);

console.log('\n── Deploy Instructions ─────────────────────────────────');
console.log('  1. Run: npm run package:cpanel');
console.log('  2. Upload cpanel-deploy.zip contents to public_html');
console.log('  3. Ensure .htaccess is present after upload');
console.log('  4. Hard refresh browser (Ctrl+F5)');
console.log('────────────────────────────────────────────────────────\n');
