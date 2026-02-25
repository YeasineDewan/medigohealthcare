#!/usr/bin/env node

/**
 * Sync Environment Variables Script
 * Reads from root .env and syncs to frontend and backend .env files
 * Updated for unified structure
 */

const fs = require('fs');
const path = require('path');

const rootEnvPath = path.join(__dirname, '.env');
const frontendEnvPath = path.join(__dirname, 'src', '.env');
const backendEnvPath = path.join(__dirname, 'server', '.env');

// Read root .env file
function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: ${filePath} not found!`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const env = {};
  
  lines.forEach(line => {
    line = line.trim();
    // Skip comments and empty lines
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      env[key.trim()] = value.trim();
    }
  });
  
  return env;
}

// Generate frontend .env content
function generateFrontendEnv(env) {
  const lines = [
    '# Frontend Environment Variables',
    '# Auto-generated from root .env file',
    '# Do not edit manually - edit root .env instead',
    '',
    `VITE_API_URL=${env.VITE_API_URL || ''}`,
    `VITE_FRONTEND_URL=${env.VITE_FRONTEND_URL || 'http://localhost:5173'}`,
    `VITE_APP_NAME=${env.VITE_APP_NAME || env.APP_NAME || '"Medigo Healthcare"'}`,
    `VITE_STATS_PATIENTS=${env.VITE_STATS_PATIENTS || '2M+'}`,
    `VITE_STATS_DOCTORS=${env.VITE_STATS_DOCTORS || '500+'}`,
    `VITE_STATS_APPOINTMENTS=${env.VITE_STATS_APPOINTMENTS || '50K+'}`,
    `VITE_CONTACT_PHONE=${env.VITE_CONTACT_PHONE || '+880 1234-567890'}`,
    `VITE_CONTACT_EMAIL=${env.VITE_CONTACT_EMAIL || 'info@medigo.com'}`,
    `VITE_CONTACT_ADDRESS=${env.VITE_CONTACT_ADDRESS || 'Dhaka, Bangladesh'}`,
    `VITE_PORT=${env.VITE_PORT || '5173'}`,
  ];
  
  return lines.join('\n');
}

// Generate backend .env content
function generateBackendEnv(env) {
  const lines = [
    '# Backend Environment Variables',
    '# Auto-generated from root .env file',
    '# Do not edit manually - edit root .env instead',
    '',
    `APP_NAME=${env.APP_NAME || '"Medigo Healthcare"'}`,
    `APP_ENV=${env.APP_ENV || 'production'}`,
    `APP_KEY=${env.APP_KEY || ''}`,
    `APP_DEBUG=${env.APP_DEBUG || 'false'}`,
    `APP_URL=${env.APP_URL || 'http://localhost:8000'}`,
    '',
    `LOG_CHANNEL=${env.LOG_CHANNEL || 'stack'}`,
    `LOG_LEVEL=${env.LOG_LEVEL || 'error'}`,
    '',
    `DB_CONNECTION=${env.DB_CONNECTION || 'mysql'}`,
    `DB_HOST=${env.DB_HOST || '127.0.0.1'}`,
    `DB_PORT=${env.DB_PORT || '3306'}`,
    `DB_DATABASE=${env.DB_DATABASE || 'medigo_db'}`,
    `DB_USERNAME=${env.DB_USERNAME || 'medigo_user'}`,
    `DB_PASSWORD=${env.DB_PASSWORD || ''}`,
    '',
    `BROADCAST_DRIVER=${env.BROADCAST_DRIVER || 'log'}`,
    `CACHE_DRIVER=${env.CACHE_DRIVER || 'file'}`,
    `QUEUE_CONNECTION=${env.QUEUE_CONNECTION || 'sync'}`,
    `SESSION_DRIVER=${env.SESSION_DRIVER || 'file'}`,
    `SESSION_LIFETIME=${env.SESSION_LIFETIME || '120'}`,
    '',
    `MEMCACHED_HOST=${env.MEMCACHED_HOST || '127.0.0.1'}`,
    '',
    `REDIS_HOST=${env.REDIS_HOST || '127.0.0.1'}`,
    `REDIS_PASSWORD=${env.REDIS_PASSWORD || 'null'}`,
    `REDIS_PORT=${env.REDIS_PORT || '6379'}`,
    '',
    `MAIL_MAILER=${env.MAIL_MAILER || 'smtp'}`,
    `MAIL_HOST=${env.MAIL_HOST || 'mailhog'}`,
    `MAIL_PORT=${env.MAIL_PORT || '1025'}`,
    `MAIL_USERNAME=${env.MAIL_USERNAME || 'null'}`,
    `MAIL_PASSWORD=${env.MAIL_PASSWORD || 'null'}`,
    `MAIL_ENCRYPTION=${env.MAIL_ENCRYPTION || 'null'}`,
    `MAIL_FROM_ADDRESS=${env.MAIL_FROM_ADDRESS || 'noreply@medigo.com'}`,
    `MAIL_FROM_NAME=${env.MAIL_FROM_NAME || '"${APP_NAME}"'}`,
    '',
    `AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID || ''}`,
    `AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY || ''}`,
    `AWS_DEFAULT_REGION=${env.AWS_DEFAULT_REGION || 'us-east-1'}`,
    `AWS_BUCKET=${env.AWS_BUCKET || ''}`,
    '',
    `PUSHER_APP_ID=${env.PUSHER_APP_ID || ''}`,
    `PUSHER_APP_KEY=${env.PUSHER_APP_KEY || ''}`,
    `PUSHER_APP_SECRET=${env.PUSHER_APP_SECRET || ''}`,
    `PUSHER_APP_CLUSTER=${env.PUSHER_APP_CLUSTER || 'mt1'}`,
    '',
    `MIX_PUSHER_APP_KEY="${env.PUSHER_APP_KEY || ''}"`,
    `MIX_PUSHER_APP_CLUSTER="${env.PUSHER_APP_CLUSTER || 'mt1'}"`,
    '',
    `FRONTEND_URL=${env.FRONTEND_URL || env.VITE_FRONTEND_URL || 'http://localhost:5173'}`,
    '',
    `MERCHANT_USERNAME=${env.MERCHANT_USERNAME || '"sp_sandbox"'}`,
    `MERCHANT_PASSWORD=${env.MERCHANT_PASSWORD || '"pyyk97hu&6u6"'}`,
    `MERCHANT_PREFIX=${env.MERCHANT_PREFIX || '"NOK"'}`,
    `MERCHANT_RETURN_URL=${env.MERCHANT_RETURN_URL || '"https://your-domain.com/success-url"'}`,
    `MERCHANT_CANCEL_URL=${env.MERCHANT_CANCEL_URL || '"https://your-domain.com/cancel-url"'}`,
    `ENGINE_URL=${env.ENGINE_URL || '"https://sandbox.shurjopayment.com"'}`,
    '',
    `SMS_API_KEY=${env.SMS_API_KEY || 'T9tOidqZZ4DwqxgCjYU0'}`,
  ];
  
  return lines.join('\n');
}

// Main execution
try {
  console.log('🔄 Syncing environment variables from root .env...\n');
  
  const env = readEnvFile(rootEnvPath);
  
  // Ensure directories exist
  const srcDir = path.join(__dirname, 'src');
  const serverDir = path.join(__dirname, 'server');
  
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir, { recursive: true });
  }
  
  // Generate and write frontend .env
  const frontendContent = generateFrontendEnv(env);
  fs.writeFileSync(frontendEnvPath, frontendContent, 'utf-8');
  console.log('✅ Frontend .env synced:', frontendEnvPath);
  
  // Generate and write backend .env
  const backendContent = generateBackendEnv(env);
  fs.writeFileSync(backendEnvPath, backendContent, 'utf-8');
  console.log('✅ Backend .env synced:', backendEnvPath);
  
  console.log('\n✨ Done! Both frontend and backend are now configured.');
  console.log('\n📝 To update configuration:');
  console.log('   1. Edit the root .env file');
  console.log('   2. Run: node sync-env.cjs');
  console.log('\n🔗 Connection:');
  console.log(`   Frontend: ${env.VITE_FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`   Backend:  ${env.APP_URL || 'http://localhost:8000'}`);
  console.log(`   API URL:  ${env.VITE_API_URL || 'http://localhost:8000/api/v1'}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
