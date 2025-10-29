# start-with-docker.ps
# Script para iniciar Meraki com PostgreSQL no Docker

Write-Host "🐳 Iniciando Meraki com Docker..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Docker está rodando
try {
    docker ps > $null >&
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker não está rodando!" -ForegroundColor Red
        Write-Host "Abra o Docker Desktop e aguarde inicializar." -ForegroundColor Yellow
        exit 
    }
} catch {
    Write-Host "❌ Docker não encontrado!" -ForegroundColor Red
    Write-Host "Instale o Docker Desktop primeiro." -ForegroundColor Yellow
    exit 
}

Write-Host "✅ Docker está rodando" -ForegroundColor Green
Write-Host ""

# Iniciar ou criar PostgreSQL container
Write-Host "🐘 Verificando PostgreSQL..." -ForegroundColor Cyan
$containerExists = docker ps -a --filter "name=meraki-postgres" --format "{{.Names}}"

if ($containerExists -eq "meraki-postgres") {
    Write-Host "Container existe, iniciando..." -ForegroundColor Yellow
    docker start meraki-postgres
    Write-Host "✅ PostgreSQL iniciado" -ForegroundColor Green
} else {
    Write-Host "Criando novo container PostgreSQL..." -ForegroundColor Yellow
    docker run -d `
        --name meraki-postgres `
        -e POSTGRES_PASSWORD=postgres `
        -e POSTGRES_USER=postgres `
        -e POSTGRES_DB=meraki_db `
        -p 5:5 `
        postgres:
    
    Write-Host "✅ PostgreSQL criado e iniciado" -ForegroundColor Green
    Write-Host "⏳ Aguardando PostgreSQL inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

Write-Host ""

# Verificar se migrations precisam rodar
$serverPath = "src\server\meraki_api_server"
if (Test-Path $serverPath) {
    Write-Host "🔧 Verificando migrations..." -ForegroundColor Cyan
    $currentDir = Get-Location
    Set-Location $serverPath
    
    # Tentar rodar migrations (pode falhar se já rodou antes, ok)
    sqlx migrate run >$null
    
    Set-Location $currentDir
    Write-Host "✅ Banco configurado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Diretório do server não encontrado" -ForegroundColor Yellow
}

Write-Host ""

# Iniciar Backend
Write-Host "🦀 Iniciando Backend (Rust API)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\server\meraki_api_server'; Write-Host '🦀 Rust API Server' -ForegroundColor Cyan; cargo run --release"

Write-Host "⏳ Aguardando backend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Iniciar Frontend
Write-Host "⚛️  Iniciando Frontend (Next.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\client'; Write-Host '⚛️  Next.js Frontend' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ Meraki iniciado com sucesso!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs importantes:" -ForegroundColor Yellow
Write-Host "   🌐 Frontend:       http://localhost:000" -ForegroundColor White
Write-Host "   🔌 API Server:     http://localhost:8080" -ForegroundColor White
Write-Host "   📖 Swagger:        http://localhost:8080/swagger-ui/" -ForegroundColor White
Write-Host "   🐘 PostgreSQL:     localhost:5" -ForegroundColor White
Write-Host ""
Write-Host "📊 Status dos containers:" -ForegroundColor Yellow
docker ps --filter "name=meraki-postgres" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host ""
Write-Host "💡 Comandos úteis:" -ForegroundColor Yellow
Write-Host "   Ver logs do PostgreSQL: docker logs meraki-postgres" -ForegroundColor White
Write-Host "   Parar PostgreSQL:       docker stop meraki-postgres" -ForegroundColor White
Write-Host "   Conectar no banco:      docker exec -it meraki-postgres psql -U postgres -d meraki_db" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Para testar:" -ForegroundColor Cyan
Write-Host "   . Acesse http://localhost:000/signup" -ForegroundColor White
Write-Host "   . Crie uma conta" -ForegroundColor White
Write-Host "   . Faça login" -ForegroundColor White
Write-Host ""
Write-Host "💾 Para parar tudo:" -ForegroundColor Yellow
Write-Host "   . Feche as janelas do PowerShell (Backend e Frontend)" -ForegroundColor White
Write-Host "   . Execute: docker stop meraki-postgres" -ForegroundColor White
Write-Host ""
