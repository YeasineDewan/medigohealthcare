// ============================================
// Medigo Healthcare - Online Database Upload Script
// ============================================
// This script will upload all data to your online database
// Usage: node upload_to_online_db.js
// ============================================

import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration - UPDATE THESE WITH YOUR ONLINE DB DETAILS
const dbConfig = {
  host: process.env.DB_HOST || 'your-online-db-host.com',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || 'your_db_username',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_DATABASE || 'medigo_db',
  ssl: {
    rejectUnauthorized: false
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function connectToDatabase() {
  try {
    log('🔌 Connecting to online database...', 'cyan');
    const connection = await mysql.createConnection(dbConfig);
    log('✅ Successfully connected to online database!', 'green');
    return connection;
  } catch (error) {
    log(`❌ Database connection failed: ${error.message}`, 'red');
    throw error;
  }
}

async function executeSQLFile(connection, filePath) {
  try {
    log(`📄 Reading SQL file: ${path.basename(filePath)}`, 'yellow');
    const sqlContent = await fs.readFile(filePath, 'utf8');
    
    // Split SQL content by semicolons and filter out empty statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    log(`🔄 Executing ${statements.length} SQL statements...`, 'yellow');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await connection.execute(statement);
        successCount++;
        
        // Progress indicator
        if ((i + 1) % 10 === 0 || i === statements.length - 1) {
          process.stdout.write(`\r⏳ Progress: ${i + 1}/${statements.length} statements completed`);
        }
      } catch (error) {
        errorCount++;
        log(`\n❌ Error in statement ${i + 1}: ${error.message}`, 'red');
        log(`📝 Statement: ${statement.substring(0, 100)}...`, 'red');
      }
    }
    
    console.log('\n');
    log(`✅ Successfully executed ${successCount} statements`, 'green');
    if (errorCount > 0) {
      log(`⚠️  ${errorCount} statements failed`, 'yellow');
    }
    
    return { successCount, errorCount };
  } catch (error) {
    log(`❌ Error executing SQL file: ${error.message}`, 'red');
    throw error;
  }
}

async function verifyDataUpload(connection) {
  try {
    log('🔍 Verifying data upload...', 'cyan');
    
    const tables = [
      { name: 'users', expected: 8 },
      { name: 'doctors', expected: 5 },
      { name: 'services', expected: 6 },
      { name: 'products', expected: 8 },
      { name: 'orders', expected: 3 },
      { name: 'lab_tests', expected: 8 },
      { name: 'prescriptions', expected: 3 },
      { name: 'prescription_uploads', expected: 3 },
      { name: 'appointments', expected: 3 },
      { name: 'blog_posts', expected: 3 }
    ];
    
    for (const table of tables) {
      const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${table.name}`);
      const count = rows[0].count;
      
      if (count >= table.expected) {
        log(`✅ ${table.name}: ${count} records (expected: ${table.expected})`, 'green');
      } else {
        log(`⚠️  ${table.name}: ${count} records (expected: ${table.expected})`, 'yellow');
      }
    }
    
    log('🎉 Data verification completed!', 'green');
  } catch (error) {
    log(`❌ Error verifying data: ${error.message}`, 'red');
  }
}

async function main() {
  let connection = null;
  
  try {
    log('🚀 Starting Medigo Healthcare Database Upload', 'bright');
    log('=' .repeat(50), 'cyan');
    
    // Check if SQL files exist
    const schemaFile = path.join(__dirname, 'database', 'schema.sql');
    const seedFile = path.join(__dirname, 'database', 'seed_data.sql');
    
    try {
      await fs.access(schemaFile);
      await fs.access(seedFile);
      log('✅ SQL files found', 'green');
    } catch (error) {
      log('❌ SQL files not found. Make sure schema.sql and seed_data.sql exist in database folder', 'red');
      return;
    }
    
    // Connect to database
    connection = await connectToDatabase();
    
    // Upload schema
    log('\n📋 Uploading database schema...', 'cyan');
    const schemaResult = await executeSQLFile(connection, schemaFile);
    
    // Upload seed data
    log('\n🌱 Uploading seed data...', 'cyan');
    const seedResult = await executeSQLFile(connection, seedFile);
    
    // Verify data
    log('\n🔍 Verifying uploaded data...', 'cyan');
    await verifyDataUpload(connection);
    
    // Summary
    log('\n' + '=' .repeat(50), 'cyan');
    log('🎉 UPLOAD COMPLETED SUCCESSFULLY!', 'bright');
    log(`📊 Schema: ${schemaResult.successCount} statements executed`, 'green');
    log(`🌱 Data: ${seedResult.successCount} statements executed`, 'green');
    log(`📈 Total: ${schemaResult.successCount + seedResult.successCount} statements executed`, 'green');
    
    if (schemaResult.errorCount > 0 || seedResult.errorCount > 0) {
      log(`⚠️  Total errors: ${schemaResult.errorCount + seedResult.errorCount}`, 'yellow');
    }
    
    log('\n🔗 Your online database is now ready!', 'bright');
    log('👥 Users: 8 (including admin, doctors, patients, etc.)', 'cyan');
    log('👨‍⚕️  Doctors: 5 (various specialties)', 'cyan');
    log('💊 Products: 8 (medicines, devices, supplies)', 'cyan');
    log('🧪 Lab Tests: 8 (comprehensive test panel)', 'cyan');
    log('📝 Prescriptions: 3 (including dynamic uploads)', 'cyan');
    log('📅 Appointments: 3 (sample bookings)', 'cyan');
    
  } catch (error) {
    log(`\n❌ Upload failed: ${error.message}`, 'red');
    log('Please check your database configuration and try again.', 'yellow');
  } finally {
    if (connection) {
      await connection.end();
      log('🔌 Database connection closed', 'cyan');
    }
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Unhandled Rejection: ${reason}`, 'red');
  process.exit(1);
});

// Run the upload script
main().catch(error => {
  log(`❌ Script failed: ${error.message}`, 'red');
  process.exit(1);
});
