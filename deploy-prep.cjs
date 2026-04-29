/**
 * deploy-prep.cjs
 * Runs after `npm run build` to finalize the dist/ folder for cPanel deployment.
 * Copies .htaccess, logo, favicon into dist/ and prints a deployment summary.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('e:/Web App source code/Medigo health web app');
const DIST = path.join(ROOT, 'dist');

const filesToCopy = [
  { src: path.join(ROOT, '.htaccess'),        dest: path.join(DIST, '.htaccess') },
  { src: path.join(ROOT, 'public', 'logo.png'),    dest: path.join(DIST, 'logo.png') },
  { src: path.join(ROOT, 'public', 'favicon.svg'), dest: path.join(DIST, 'favicon.svg') },
];

console.log('\n── Medigo cPanel Deploy Prep ──────────────────────────');

// Copy files
for (const { src, dest } of filesToCopy) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✔  Copied  ${path.basename(src)}  →  dist/`);
  } else {
    console.warn(`  ⚠  Skipped ${path.basename(src)} (not found)`);
  }
}

// Print dist summary
console.log('\n── Build Output ────────────────────────────────────────');
function printTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir).filter(e => e !== 'README_DEPLOY.md');
  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    const fullPath = path.join(dir, entry);
    const isDir = fs.statSync(fullPath).isDirectory();
    const size = isDir ? '' : ` (${(fs.statSync(fullPath).size / 1024).toFixed(1)} KB)`;
    console.log(`${prefix}${isLast ? '└──' : '├──'} ${entry}${size}`);
    if (isDir) printTree(fullPath, prefix + (isLast ? '    ' : '│   '));
  });
}
printTree(DIST);

console.log('\n── Deploy Instructions ─────────────────────────────────');
console.log('  1. Open cPanel File Manager → public_html');
console.log('  2. Enable "Show Hidden Files" in Settings');
console.log('  3. Delete ALL existing files in public_html');
console.log('  4. Upload everything inside dist/ to public_html');
console.log('  5. Visit your domain — done ✔');
console.log('────────────────────────────────────────────────────────\n');
