# Test SSL Fix
Write-Host "🧪 Testing SSL Configuration..." -ForegroundColor Yellow

# Test basic SSL connection
try {
    $result = php -r "echo file_get_contents('https://repo.packagist.org/packages.json') ? 'SSL_OK' : 'SSL_FAILED';"
    if ($result -eq 'SSL_OK') {
        Write-Host "✅ SSL Test PASSED!" -ForegroundColor Green
        Write-Host "🚀 You can now run composer install" -ForegroundColor Cyan
    } else {
        Write-Host "❌ SSL Test FAILED" -ForegroundColor Red
        Write-Host "🔧 Additional configuration may be needed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ SSL Test FAILED with error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Show PHP SSL info
Write-Host "`n📋 PHP SSL Configuration:" -ForegroundColor Cyan
php -r "echo 'OpenSSL CA File: ' . (ini_get('openssl.cafile') ?: 'not set') . PHP_EOL;"
php -r "echo 'OpenSSL CA Path: ' . (ini_get('openssl.capath') ?: 'not set') . PHP_EOL;"
php -r "echo 'OpenSSL loaded: ' . (extension_loaded('openssl') ? 'YES' : 'NO') . PHP_EOL;"
