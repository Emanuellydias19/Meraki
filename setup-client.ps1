# setup-client.ps
# Script para instalar todas as dependências do cliente

Write-Host "📦 Instalando dependências do Meraki Client..." -ForegroundColor Cyan
Write-Host ""

$clientPath = "src\client"

if (-not (Test-Path $clientPath)) {
    Write-Host "❌ Diretório $clientPath não encontrado!" -ForegroundColor Red
    exit 
}

cd $clientPath

Write-Host "🔍 Verificando package.json..." -ForegroundColor Yellow

if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado!" -ForegroundColor Red
    exit 
}

Write-Host "✅ package.json encontrado" -ForegroundColor Green
Write-Host ""

# Verificar se npm está disponível
try {
    $npmVersion = npm --version
    Write-Host "✅ npm versão $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado! Instale Node.js primeiro." -ForegroundColor Red
    exit 
}

Write-Host ""
Write-Host "📦 Instalando dependências básicas..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "🔗 Instalando pacotes Solana/Web..." -ForegroundColor Cyan
npm install @solana/web.js @coral-xyz/anchor

Write-Host ""
Write-Host "👛 Instalando wallet adapters..." -ForegroundColor Cyan
npm install @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets

Write-Host ""
Write-Host "✅ Todas as dependências instaladas!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host "   . Configure o arquivo .env.local" -ForegroundColor White
Write-Host "   . Execute: npm run dev" -ForegroundColor White
Write-Host "   . Acesse: http://localhost:000" -ForegroundColor White
Write-Host ""
