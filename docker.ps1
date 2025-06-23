# Script PowerShell para gestionar Docker en Plena Studio
param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

# Colores para PowerShell
function Write-ColorOutput($ForegroundColor, $Message) {
    Write-Host $Message -ForegroundColor $ForegroundColor
}

function Write-Info($Message) {
    Write-ColorOutput "Cyan" "🐳 $Message"
}

function Write-Success($Message) {
    Write-ColorOutput "Green" "✅ $Message"
}

function Write-Warning($Message) {
    Write-ColorOutput "Yellow" "⚠️  $Message"
}

function Write-Error($Message) {
    Write-ColorOutput "Red" "❌ $Message"
}

# Función para mostrar ayuda
function Show-Help {
    Write-Info "Plena Studio - Script de Docker"
    Write-Host "======================================"
    Write-Host ""
    Write-Warning "Uso: .\docker.ps1 [COMANDO]"
    Write-Host ""
    Write-Host "Comandos disponibles:"
    Write-Host "  start     - Iniciar todos los servicios"
    Write-Host "  stop      - Parar todos los servicios"
    Write-Host "  restart   - Reiniciar todos los servicios"
    Write-Host "  build     - Construir las imágenes"
    Write-Host "  logs      - Ver logs de todos los servicios"
    Write-Host "  clean     - Limpiar contenedores y volúmenes"
    Write-Host "  dev       - Iniciar solo backend y DB (desarrollo)"
    Write-Host "  status    - Ver estado de los contenedores"
    Write-Host "  help      - Mostrar esta ayuda"
}

# Función para verificar si Docker está ejecutándose
function Test-Docker {
    try {
        docker info | Out-Null
        return $true
    }
    catch {
        Write-Error "Docker no está ejecutándose"
        Write-Host "Por favor, inicia Docker Desktop y vuelve a intentar."
        exit 1
    }
}

# Función para iniciar servicios
function Start-Services {
    Write-Info "Iniciando servicios de Plena Studio..."
    
    try {
        docker-compose up -d
        
        Write-Success "Servicios iniciados correctamente"
        Write-Host ""
        Write-Host "🌐 Accesos disponibles:"
        Write-Host "   Frontend: http://localhost:3000"
        Write-Host "   Backend API: http://localhost:3001"
        Write-Host "   Proxy Nginx: http://localhost"
        Write-Host "   Base de Datos: localhost:3307"
        Write-Host ""
        Write-Host "Para ver los logs: .\docker.ps1 logs"
    }
    catch {
        Write-Error "Error al iniciar los servicios"
        exit 1
    }
}

# Función para parar servicios
function Stop-Services {
    Write-Warning "Parando servicios de Plena Studio..."
    
    try {
        docker-compose down
        Write-Success "Servicios parados correctamente"
    }
    catch {
        Write-Error "Error al parar los servicios"
        exit 1
    }
}

# Función para reiniciar servicios
function Restart-Services {
    Write-Info "Reiniciando servicios de Plena Studio..."
    
    try {
        docker-compose restart
        Write-Success "Servicios reiniciados correctamente"
    }
    catch {
        Write-Error "Error al reiniciar los servicios"
        exit 1
    }
}

# Función para construir imágenes
function Build-Images {
    Write-Info "Construyendo imágenes de Plena Studio..."
    
    try {
        docker-compose build --no-cache
        Write-Success "Imágenes construidas correctamente"
    }
    catch {
        Write-Error "Error al construir las imágenes"
        exit 1
    }
}

# Función para ver logs
function Show-Logs {
    Write-Info "Mostrando logs de Plena Studio..."
    Write-Host "Presiona Ctrl+C para salir"
    docker-compose logs -f
}

# Función para limpiar sistema
function Clean-System {
    Write-Warning "Limpiando sistema Docker..."
    $response = Read-Host "¿Estás seguro? Esto eliminará contenedores, volúmenes e imágenes (y/N)"
    
    if ($response -match "^[yY]") {
        try {
            docker-compose down -v
            docker system prune -a -f
            Write-Success "Sistema limpiado correctamente"
        }
        catch {
            Write-Error "Error al limpiar el sistema"
            exit 1
        }
    }
    else {
        Write-Host "Operación cancelada"
    }
}

# Función para modo desarrollo
function Start-DevMode {
    Write-Info "Iniciando modo desarrollo (Backend + DB)..."
    
    try {
        docker-compose -f docker-compose.dev.yml up -d
        
        Write-Success "Servicios de desarrollo iniciados"
        Write-Host ""
        Write-Host "🌐 Accesos disponibles:"
        Write-Host "   Backend API: http://localhost:3001"
        Write-Host "   Base de Datos: localhost:3307"
        Write-Host ""
        Write-Host "💡 Ejecuta el frontend localmente con: npm run dev"
    }
    catch {
        Write-Error "Error al iniciar servicios de desarrollo"
        exit 1
    }
}

# Función para mostrar estado
function Show-Status {
    Write-Info "Estado de contenedores de Plena Studio:"
    docker-compose ps
    Write-Host ""
    Write-Info "Uso de recursos:"
    docker stats --no-stream
}

# Verificar Docker antes de ejecutar comandos
Test-Docker

# Procesar comando
switch ($Command.ToLower()) {
    "start" {
        Start-Services
    }
    "stop" {
        Stop-Services
    }
    "restart" {
        Restart-Services
    }
    "build" {
        Build-Images
    }
    "logs" {
        Show-Logs
    }
    "clean" {
        Clean-System
    }
    "dev" {
        Start-DevMode
    }
    "status" {
        Show-Status
    }
    "help" {
        Show-Help
    }
    default {
        Write-Error "Comando no reconocido: $Command"
        Write-Host ""
        Show-Help
        exit 1
    }
}
