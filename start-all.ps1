Write-Host "Iniciando todos os serviços do Meraki..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Verificando PostgreSQL..." -ForegroundColor Yellow
$pgRunning = Get-Process -Name "postgres" -ErrorAction SilentlyContinue
if (-not $pgRunning) {
    Write-Host "PostgreSQL não está rodando!" -ForegroundColor Red
    Write-Host "Inicie o PostgreSQL manualmente ou use start-with-docker.ps1" -ForegroundColor Yellow
    exit 1
}
Write-Host "PostgreSQL rodando" -ForegroundColor Green
Write-Host ""

$serverPath = "src\server\meraki_api_server"
if (Test-Path $serverPath) {
    Write-Host "Verificando migrations..." -ForegroundColor Cyan
    $currentDir = Get-Location
    Set-Location $serverPath
    
    sqlx migrate run 2>$null
    
    Set-Location $currentDir
    Write-Host "Banco configurado" -ForegroundColor Green
} else {
    Write-Host "Diretório do server não encontrado" -ForegroundColor Yellow
}

Write-Host ""

Write-Host "Iniciando Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\server\meraki_api_server'; cargo run --release"

Write-Host "Aguardando backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Iniciando Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\src\client'; npm run dev"

Write-Host ""
Write-Host "Serviços iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "URLs:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   API:      http://localhost:8080" -ForegroundColor White
Write-Host ""