# start-all.ps
# Script para iniciar todos os componentes do Meraki

Write-Host "🚀 Iniciando Meraki..." -ForegroundColor Cyan
Write-Host ""

# Verificar se PostgreSQL está rodando
$pgRunning = Get-Process -Name postgres -ErrorAction SilentlyContinue
if (-not $pgRunning) {
    Write-Host "❌ PostgreSQL não está rodando!" -ForegroundColor Red
    Write-Host "Inicie o PostgreSQL primeiro." -ForegroundColor Yellow
    exit 
}

Write-Host "✅ PostgreSQL rodando" -ForegroundColor Green
Write-Host ""

# Verificar se os diretórios existem
if (-not (Test-Path "src\server\meraki_api_server")) {
    Write-Host "❌ Diretório do server não encontrado!" -ForegroundColor Red
    exit 
}

if (-not (Test-Path "src\client")) {
    Write-Host "❌ Diretório do client não encontrado!" -ForegroundColor Red
    exit 
}

# Iniciar Server (API Rust) em nova janela
Write-Host "🦀 Iniciando Server (Rust API) na porta 8080..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\server\meraki_api_server'; Write-Host '🦀 Rust API Server' -ForegroundColor Cyan; cargo run --release"

Write-Host "⏳ Aguardando server inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Iniciar Client (Next.js) em nova janela
Write-Host "⚛️  Iniciando Client (Next.js) na porta 000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\client'; Write-Host '⚛️  Next.js Frontend' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✅ Tudo iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs importantes:" -ForegroundColor Yellow
Write-Host "   🌐 Frontend:     http://localhost:000" -ForegroundColor White
Write-Host "   🔌 API Server:   http://localhost:8080" -ForegroundColor White
Write-Host "   📖 Swagger UI:   http://localhost:8080/swagger-ui/" -ForegroundColor White
Write-Host ""
Write-Host "💡 Para parar tudo, feche as janelas do PowerShell abertas." -ForegroundColor Cyan
Write-Host ""
