# 🚀 SCRIPT DE DESPLIEGUE - PLENA
# Prepara el proyecto para despliegue en Surge y Vercel

Write-Host "🎨 Preparando Plena para despliegue..." -ForegroundColor Green

# Crear directorio de despliegue
Write-Host "📁 Creando directorio de despliegue..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "deploy"

# Construir el proyecto
Write-Host "📦 Construyendo el proyecto..." -ForegroundColor Yellow
npm run build

# Verificar si existe la carpeta build
if (Test-Path "build") {
    Write-Host "📁 Copiando archivos de build..." -ForegroundColor Yellow
    Copy-Item -Path "build\*" -Destination "deploy\" -Recurse -Force
} else {
    Write-Host "⚠️  No se encontró carpeta build, copiando archivos fuente..." -ForegroundColor Yellow
    Copy-Item -Path "src\*" -Destination "deploy\" -Recurse -Force
    Copy-Item -Path "public\*" -Destination "deploy\" -Recurse -Force
}

# Copiar archivos adicionales
Write-Host "📁 Copiando archivos adicionales..." -ForegroundColor Yellow
Copy-Item -Path "figma-landing-prototype.html" -Destination "deploy\" -ErrorAction SilentlyContinue
Copy-Item -Path "navegacion-premium.html" -Destination "deploy\" -ErrorAction SilentlyContinue
Copy-Item -Path "galeria-lupa-premium.html" -Destination "deploy\" -ErrorAction SilentlyContinue

# Crear archivo _redirects para Netlify/Vercel
Write-Host "🔄 Configurando redirects..." -ForegroundColor Yellow
$redirectsContent = @"
# Redirects para SPA
/* /index.html 200

# Redirects personalizados
/figma /figma-landing-prototype.html 200
/navegacion /navegacion-premium.html 200
/galeria /galeria-lupa-premium.html 200
"@
$redirectsContent | Out-File -FilePath "deploy\_redirects" -Encoding UTF8

# Crear vercel.json
Write-Host "⚙️ Configurando Vercel..." -ForegroundColor Yellow
$vercelConfig = @"
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/figma",
      "dest": "/figma-landing-prototype.html"
    },
    {
      "src": "/navegacion",
      "dest": "/navegacion-premium.html"
    },
    {
      "src": "/galeria",
      "dest": "/galeria-lupa-premium.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
"@
$vercelConfig | Out-File -FilePath "deploy\vercel.json" -Encoding UTF8

# Crear package.json para deployment
Write-Host "📋 Creando package.json de despliegue..." -ForegroundColor Yellow
$packageJson = @"
{
  "name": "plena-frontend",
  "version": "1.0.0",
  "description": "Plena - Joyería Premium",
  "main": "index.html",
  "scripts": {
    "start": "serve -s .",
    "surge": "surge . --domain plena-premium.surge.sh"
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
"@
$packageJson | Out-File -FilePath "deploy\package.json" -Encoding UTF8

Write-Host "✅ Proyecto preparado para despliegue!" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Archivos generados en ./deploy/" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Para desplegar:" -ForegroundColor Yellow
Write-Host "  Surge:  cd deploy; npm install; npm run surge" -ForegroundColor White
Write-Host "  Vercel: cd deploy; vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs esperadas:" -ForegroundColor Yellow
Write-Host "  Surge:  https://plena-premium.surge.sh" -ForegroundColor White
Write-Host "  Vercel: https://plena-premium.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Navegación: /navegacion-despliegue.html" -ForegroundColor Cyan
