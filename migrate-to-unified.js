#!/usr/bin/env node

/**
 * Migration Script
 * Moves files from medigo-client and medigo-server to unified structure
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const clientDir = path.join(rootDir, 'medigo-client');
const serverDir = path.join(rootDir, 'medigo-server');
const srcDir = path.join(rootDir, 'src');
const newServerDir = path.join(rootDir, 'server');
const publicDir = path.join(rootDir, 'public');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source not found: ${src}`);
    return;
  }

  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      if (file === 'node_modules' || file === 'dist' || file === '.env') {
        return; // Skip these
      }
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('🚀 Starting migration to unified structure...\n');

// Create directories
[srcDir, newServerDir, publicDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  }
});

// Move frontend source
if (fs.existsSync(clientDir)) {
  console.log('\n📦 Moving frontend files...');
  const clientSrc = path.join(clientDir, 'src');
  if (fs.existsSync(clientSrc)) {
    copyRecursive(clientSrc, srcDir);
    console.log('✅ Frontend source moved to src/');
  }
  
  // Move public folder
  const clientPublic = path.join(clientDir, 'public');
  if (fs.existsSync(clientPublic)) {
    copyRecursive(clientPublic, publicDir);
    console.log('✅ Public assets moved to public/');
  }
}

// Move backend files
if (fs.existsSync(serverDir)) {
  console.log('\n📦 Moving backend files...');
  copyRecursive(serverDir, newServerDir);
  console.log('✅ Backend files moved to server/');
}

console.log('\n✨ Migration complete!');
console.log('\n📝 Next steps:');
console.log('   1. Run: node sync-env.js');
console.log('   2. Run: npm install');
console.log('   3. Test: npm run dev');
console.log('\n⚠️  Note: Old folders (medigo-client, medigo-server) are kept for safety.');
console.log('   You can delete them after verifying everything works.');
