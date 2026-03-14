# Permanent SSL Fix - Run as Administrator
Write-Host "🔧 Starting Permanent SSL Fix..." -ForegroundColor Green

# Step 1: Install PHP with SSL support
Write-Host "📦 Installing PHP with SSL support..." -ForegroundColor Yellow
choco install php -y --params "/InstallCurl:/InstallOpenssl"

# Step 2: Download CA bundle
Write-Host "📥 Downloading CA bundle..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://curl.se/ca/cacert.pem" -OutFile "C:\cacert.pem"

# Step 3: Set environment variables (Machine level)
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("SSL_CERT_FILE", "C:\cacert.pem", "Machine")
[Environment]::SetEnvironmentVariable("CURL_CA_BUNDLE", "C:\cacert.pem", "Machine")

# Step 4: Find PHP installation
$phpPath = (Get-Command php).Source | Split-Path
$phpIni = "$phpPath\php.ini"

# Step 5: Update php.ini
Write-Host "⚙️  Updating PHP configuration..." -ForegroundColor Yellow
if (Test-Path $phpIni) {
    $content = Get-Content $phpIni
    
    # Add SSL configuration
    if ($content -notmatch 'openssl.cafile') {
        Add-Content $phpIni "openssl.cafile = C:\cacert.pem"
    }
    if ($content -notmatch 'extension_dir') {
        Add-Content $phpIni "extension_dir = `"ext`""
    }
    if ($content -notmatch 'extension=openssl') {
        Add-Content $phpIni "extension=openssl"
    }
    if ($content -notmatch 'extension=curl') {
        Add-Content $phpIni "extension=curl"
    }
}

Write-Host "✅ SSL Fix Complete!" -ForegroundColor Green
Write-Host "🔄 Please restart PowerShell and test with:" -ForegroundColor Cyan
Write-Host "php -r 'echo file_get_contents(`"https://repo.packagist.org/packages.json`") ? `"SSL OK`" : `"SSL FAILED`";'" -ForegroundColor White
