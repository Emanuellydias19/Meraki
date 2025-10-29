# setup-dependencies.ps1
# Script para instalar todas as dependências do projeto

Write-Host "📦 Instalando Dependências do Meraki..." -ForegroundColor Cyan
Write-Host ""

$srcPath = "src"
$currentDir = Get-Location

# Verificar se estamos na raiz do projeto
if (-not (Test-Path $srcPath)) {
    Write-Host "❌ Diretório 'src' não encontrado!" -ForegroundColor Red
    Write-Host "Execute este script da raiz do projeto Meraki." -ForegroundColor Yellow
    exit 1
}

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "Instale Node.js primeiro: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Instalando dependências do Frontend..." -ForegroundColor Cyan
Write-Host ""

Set-Location $srcPath

# Verificar package.json
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado!" -ForegroundColor Red
    Set-Location $currentDir
    exit 1
}

# Instalar dependências
Write-Host "Executando npm install..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências do Frontend instaladas!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    Set-Location $currentDir
    exit 1
}

Write-Host ""
Write-Host "🔍 Verificando dependências Solana..." -ForegroundColor Cyan

# Verificar se pacotes Solana foram instalados
$packages = @(
    "@solana/web3.js",
    "@coral-xyz/anchor",
    "@solana/wallet-adapter-react"
)

$allInstalled = $true
foreach ($pkg in $packages) {
    try {
        $result = npm list $pkg 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ $pkg" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $pkg não instalado" -ForegroundColor Red
            $allInstalled = $false
        }
    } catch {
        Write-Host "  ❌ $pkg não instalado" -ForegroundColor Red
        $allInstalled = $false
    }
}

Write-Host ""

if ($allInstalled) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "✅ Todas as dependências instaladas!" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
} else {
    Write-Host "⚠️  Algumas dependências podem estar faltando" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📊 Estatísticas:" -ForegroundColor Yellow
$nodeModulesSize = (Get-ChildItem -Path "node_modules" -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "  📁 node_modules: $([math]::Round($nodeModulesSize, 2)) MB" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Verificar erros TypeScript:" -ForegroundColor White
Write-Host "     cd src && npx tsc --noEmit" -ForegroundColor Cyan
Write-Host ""
Write-Host "  2. Iniciar desenvolvimento:" -ForegroundColor White
Write-Host "     npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "  3. Ou use o script completo:" -ForegroundColor White
Write-Host "     powershell -ExecutionPolicy Bypass -File start-with-docker.ps1" -ForegroundColor Cyan
Write-Host ""

Set-Location $currentDir
