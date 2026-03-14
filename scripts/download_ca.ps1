# Download CA bundle as Administrator
Write-Host "📥 Downloading CA bundle..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://curl.se/ca/cacert.pem" -OutFile "C:\cacert.pem" -UseBasicParsing
Write-Host "✅ CA bundle downloaded to C:\cacert.pem" -ForegroundColor Green

# Set environment variables
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("SSL_CERT_FILE", "C:\cacert.pem", "Machine")
[Environment]::SetEnvironmentVariable("CURL_CA_BUNDLE", "C:\cacert.pem", "Machine")
Write-Host "✅ Environment variables set" -ForegroundColor Green

# Update PHP configuration
Write-Host "⚙️  Updating PHP configuration..." -ForegroundColor Yellow
$phpPath = (Get-Command php).Source | Split-Path
$phpIni = "$phpPath\php.ini"

if (-not (Test-Path $phpIni)) {
    Copy-Item "$phpPath\php.ini-production" $phpIni
}

Add-Content $phpIni "openssl.cafile = C:\cacert.pem"
Add-Content $phpIni "extension_dir = `"ext`""
Add-Content $phpIni "extension=openssl"
Add-Content $phpIni "extension=curl"
Write-Host "✅ PHP configuration updated" -ForegroundColor Green

Write-Host "🎉 SSL fix complete! Please restart PowerShell." -ForegroundColor Green
