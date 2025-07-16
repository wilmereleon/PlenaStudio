#!/bin/bash

# 🚀 SCRIPT DE DESPLIEGUE - PLENA
# Prepara el proyecto para despliegue en Surge y Vercel

echo "🎨 Preparando Plena para despliegue..."

# Crear directorio de despliegue
mkdir -p deploy

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
npm run build

# Copiar archivos necesarios para despliegue
echo "📁 Copiando archivos..."
cp -r build/* deploy/
cp figma-landing-prototype.html deploy/
cp navegacion-premium.html deploy/
cp galeria-lupa-premium.html deploy/

# Crear archivo _redirects para Netlify/Vercel
echo "🔄 Configurando redirects..."
cat > deploy/_redirects << 'EOF'
# Redirects para SPA
/* /index.html 200

# Redirects personalizados
/figma /figma-landing-prototype.html 200
/navegacion /navegacion-premium.html 200
/galeria /galeria-lupa-premium.html 200
EOF

# Crear vercel.json
echo "⚙️ Configurando Vercel..."
cat > deploy/vercel.json << 'EOF'
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
EOF

# Crear package.json para deployment
echo "📋 Creando package.json de despliegue..."
cat > deploy/package.json << 'EOF'
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
EOF

# Crear página de navegación con botones de despliegue
echo "🌐 Creando página de navegación..."
cat > deploy/navegacion-despliegue.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plena - Navegación de Despliegues</title>
    <style>
        :root {
            --color-jewel-gold: #D4AF37;
            --color-deep-emerald: #0F5132;
            --color-sage: #87A96B;
            --color-pearl-white: #F8F9FA;
            --color-rose-gold: #E8B4A0;
            --color-charcoal: #2C3E50;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--color-pearl-white) 0%, var(--color-rose-gold) 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            max-width: 800px;
            padding: 2rem;
            text-align: center;
        }
        
        .logo {
            font-size: 3rem;
            font-weight: 700;
            color: var(--color-jewel-gold);
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: var(--color-deep-emerald);
            margin-bottom: 3rem;
            font-weight: 300;
        }
        
        .deployment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .deployment-card {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .deployment-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            border-color: var(--color-jewel-gold);
        }
        
        .deployment-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .deployment-title {
            font-size: 1.5rem;
            color: var(--color-charcoal);
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .deployment-description {
            color: var(--color-deep-emerald);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .deployment-button {
            display: inline-block;
            background: var(--color-jewel-gold);
            color: white;
            padding: 0.8rem 2rem;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }
        
        .deployment-button:hover {
            background: var(--color-deep-emerald);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(15, 81, 50, 0.3);
        }
        
        .navigation-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .nav-link {
            background: rgba(255,255,255,0.9);
            color: var(--color-charcoal);
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 20px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .nav-link:hover {
            background: var(--color-sage);
            color: white;
            border-color: var(--color-deep-emerald);
        }
        
        .status-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--color-sage);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .deployment-grid {
                grid-template-columns: 1fr;
            }
            
            .logo {
                font-size: 2rem;
            }
            
            .subtitle {
                font-size: 1rem;
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="status-badge">🚀 LIVE</div>
        
        <h1 class="logo">💎 Plena</h1>
        <p class="subtitle">Joyería Premium - Navegación de Despliegues</p>
        
        <div class="deployment-grid">
            <div class="deployment-card">
                <div class="deployment-icon">🌊</div>
                <h3 class="deployment-title">Surge.sh</h3>
                <p class="deployment-description">Despliegue rápido y sencillo para desarrollo y testing</p>
                <a href="https://plena-premium.surge.sh" class="deployment-button" target="_blank">Ver en Surge</a>
            </div>
            
            <div class="deployment-card">
                <div class="deployment-icon">▲</div>
                <h3 class="deployment-title">Vercel</h3>
                <p class="deployment-description">Despliegue premium con CDN global y optimizaciones automáticas</p>
                <a href="https://plena-premium.vercel.app" class="deployment-button" target="_blank">Ver en Vercel</a>
            </div>
        </div>
        
        <div class="navigation-links">
            <a href="/index.html" class="nav-link">🏠 Inicio</a>
            <a href="/figma-landing-prototype.html" class="nav-link">🎨 Prototipo Figma</a>
            <a href="/navegacion-premium.html" class="nav-link">🎯 Navegación Premium</a>
            <a href="/galeria-lupa-premium.html" class="nav-link">🔍 Galería con Lupa</a>
        </div>
    </div>
</body>
</html>
EOF

echo "✅ Proyecto preparado para despliegue!"
echo ""
echo "📂 Archivos generados en ./deploy/"
echo ""
echo "🚀 Para desplegar:"
echo "  Surge:  cd deploy && npm install && npm run surge"
echo "  Vercel: cd deploy && vercel --prod"
echo ""
echo "🌐 URLs esperadas:"
echo "  Surge:  https://plena-premium.surge.sh"
echo "  Vercel: https://plena-premium.vercel.app"
echo ""
echo "🔗 Navegación: /navegacion-despliegue.html"
