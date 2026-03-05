# Agatas SQL Cech – start dev environment (PowerShell)
# Usage: .\scripts\start-dev.ps1   (from repo root)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

Write-Host "== Agatas SQL Cech – dev startup ==" -ForegroundColor Cyan

# 1. Postgres
Write-Host "`n[1/5] Postgres..."
$pg = docker compose ps postgres 2>$null
if ($pg -match "Up") {
    Write-Host "      Postgres already running."
} else {
    Write-Host "      Starting Postgres..."
    docker compose up -d postgres
}

# 2. Wait for Postgres
Write-Host "`n[2/5] Waiting for Postgres..."
$max = 15
for ($i = 1; $i -le $max; $i++) {
    $ok = docker compose exec -T postgres pg_isready -U cech -d cech 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "      Postgres is ready."
        break
    }
    if ($i -eq $max) {
        Write-Host "      ERROR: Postgres did not become ready in time." -ForegroundColor Red
        exit 1
    }
    Start-Sleep -Seconds 1
}

# 3. Server .env
Write-Host "`n[3/5] Server env..."
$envPath = Join-Path $Root "server\.env"
$examplePath = Join-Path $Root "server\.env.example"
if (-not (Test-Path $envPath)) {
    if (Test-Path $examplePath) {
        Copy-Item $examplePath $envPath
        Write-Host "      Created server/.env from .env.example."
    } else {
        Write-Host "      WARNING: server/.env not found." -ForegroundColor Yellow
    }
} else {
    Write-Host "      server/.env present."
}

# 4. Dependencies
Write-Host "`n[4/5] Dependencies..."
npm install

# 5. Start server in background, then client
Write-Host "`n[5/5] Starting API and Client..."
Write-Host "      API: http://localhost:3001"
Write-Host "      Client: http://localhost:5173"
Write-Host ""

$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:Root\server
    node --watch src/index.js
}

# Wait for API
Write-Host "      Waiting for API..."
$apiUp = $false
for ($i = 1; $i -le 15; $i++) {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($r.StatusCode -eq 200) { $apiUp = $true; break }
    } catch {}
    Start-Sleep -Seconds 1
}
if ($apiUp) { Write-Host "      API is up." } else { Write-Host "      WARNING: API did not respond in time." -ForegroundColor Yellow }

Write-Host "`n      Starting Vite (client). Open http://localhost:5173`n"
Set-Location (Join-Path $Root "client")
try {
    npm run dev
} finally {
    Stop-Job $serverJob -ErrorAction SilentlyContinue
    Remove-Job $serverJob -ErrorAction SilentlyContinue
}
