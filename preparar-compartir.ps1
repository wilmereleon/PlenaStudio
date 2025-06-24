# Script para preparar Plena Studio para compartir
# Ejecutar con: .\preparar-compartir.ps1

Write-Host "🐳 Preparando Plena Studio para compartir..." -ForegroundColor Cyan

# Verificar que Docker esté instalado
try {
    docker --version | Out-Null
    Write-Host "✅ Docker encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está instalado. Descárgalo de https://docker.com" -ForegroundColor Red
    exit 1
}

# Verificar que Docker Compose esté disponible
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose no está disponible" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Opciones de compartición:" -ForegroundColor Yellow
Write-Host "1. Crear ZIP para compartir"
Write-Host "2. Subir a Docker Hub"
Write-Host "3. Preparar para GitHub"
Write-Host "4. Solo probar localmente"
Write-Host ""

$opcion = Read-Host "Selecciona una opción (1-4)"

switch ($opcion) {
    "1" {
        Write-Host "📦 Creando ZIP para compartir..." -ForegroundColor Cyan
        
        # Crear carpeta temporal
        $tempDir = "PlenaStudio-Compartir"
        if (Test-Path $tempDir) {
            Remove-Item $tempDir -Recurse -Force
        }
        New-Item -ItemType Directory -Path $tempDir | Out-Null
        
        # Copiar archivos esenciales
        Copy-Item "docker-compose.public.yml" "$tempDir\docker-compose.yml"
        Copy-Item "Dockerfile.frontend" "$tempDir\"
        Copy-Item -Recurse "Backend" "$tempDir\"
        Copy-Item -Recurse "src" "$tempDir\"
        Copy-Item -Recurse "public" "$tempDir\"
        Copy-Item -Recurse "script" "$tempDir\"
        Copy-Item "INSTRUCCIONES-EJECUCION.md" "$tempDir\README.md"
        Copy-Item "package.json" "$tempDir\"
        Copy-Item "tsconfig.json" "$tempDir\"
        Copy-Item "vite.config.mts" "$tempDir\"
        
        # Crear ZIP
        Compress-Archive -Path $tempDir -DestinationPath "PlenaStudio-Docker.zip" -Force
        Remove-Item $tempDir -Recurse -Force
        
        Write-Host "✅ ZIP creado: PlenaStudio-Docker.zip" -ForegroundColor Green
        Write-Host "📤 Puedes compartir este archivo ZIP" -ForegroundColor Yellow
    }
    
    "2" {
        Write-Host "🐳 Preparando para Docker Hub..." -ForegroundColor Cyan
        
        $usuario = Read-Host "Ingresa tu usuario de Docker Hub"
        
        Write-Host "Construyendo imágenes..." -ForegroundColor Yellow
        docker-compose build
        
        Write-Host "Etiquetando imágenes..." -ForegroundColor Yellow
        docker tag "plena-frontend" "$usuario/plena-studio-frontend:latest"
        docker tag "plena-backend" "$usuario/plena-studio-backend:latest"
        
        Write-Host "Para continuar, ejecuta:" -ForegroundColor Green
        Write-Host "docker login" -ForegroundColor White
        Write-Host "docker push $usuario/plena-studio-frontend:latest" -ForegroundColor White
        Write-Host "docker push $usuario/plena-studio-backend:latest" -ForegroundColor White
    }
    
    "3" {
        Write-Host "📂 Preparando para GitHub..." -ForegroundColor Cyan
        
        # Verificar si git está inicializado
        if (Test-Path ".git") {
            Write-Host "✅ Repositorio Git encontrado" -ForegroundColor Green
            
            Write-Host "Archivos importantes para subir:" -ForegroundColor Yellow
            Write-Host "- docker-compose.yml" -ForegroundColor White
            Write-Host "- docker-compose.public.yml" -ForegroundColor White
            Write-Host "- Dockerfile.frontend" -ForegroundColor White
            Write-Host "- Backend/Dockerfile" -ForegroundColor White
            Write-Host "- GUIA-COMPARTIR-DOCKER.md" -ForegroundColor White
            Write-Host "- INSTRUCCIONES-EJECUCION.md" -ForegroundColor White
            
        } else {
            Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
            git init
            git add .
            git commit -m "Initial commit - Plena Studio with Docker"
            
            Write-Host "Para continuar:" -ForegroundColor Green
            Write-Host "1. Crea un repositorio en GitHub" -ForegroundColor White
            Write-Host "2. git remote add origin [URL-del-repositorio]" -ForegroundColor White
            Write-Host "3. git push -u origin main" -ForegroundColor White
        }
    }
    
    "4" {
        Write-Host "🧪 Probando localmente..." -ForegroundColor Cyan
        
        Write-Host "Deteniendo contenedores existentes..." -ForegroundColor Yellow
        docker-compose down
        
        Write-Host "Construyendo y ejecutando..." -ForegroundColor Yellow
        docker-compose up --build -d
        
        Write-Host ""
        Write-Host "✅ Plena Studio ejecutándose!" -ForegroundColor Green
        Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Cyan
        Write-Host "🗄️  Base de datos: localhost:3308" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Para ver logs: docker-compose logs -f" -ForegroundColor Yellow
        Write-Host "Para detener: docker-compose down" -ForegroundColor Yellow
    }
    
    default {
        Write-Host "❌ Opción no válida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📚 Consulta GUIA-COMPARTIR-DOCKER.md para más información" -ForegroundColor Cyan
Write-Host "🎉 ¡Listo!" -ForegroundColor Green
