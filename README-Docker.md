# 🐳 Plena Studio - Configuración Docker

Esta configuración permite ejecutar todo el proyecto Plena Studio en contenedores Docker para facilitar la demostración y desarrollo.

## 📋 Requisitos Previos

- Docker Desktop instalado
- Docker Compose v2.0+
- Al menos 4GB de RAM disponible
- Puertos 80, 3000, 3001, 3307 disponibles

## 🚀 Inicio Rápido

### 1. Clonar y preparar el proyecto
```bash
# Navegar al directorio del proyecto
cd PlenaStudio

# Construir y ejecutar todos los servicios
docker-compose up --build
```

### 2. Acceder a la aplicación
- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Proxy Nginx**: http://localhost
- **Base de Datos**: localhost:3307

### 3. Credenciales por defecto
- **Usuario Demo**: demo@plenastudio.com
- **Password**: password (hash: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi)
- **MySQL Root**: root/root
- **MySQL User**: plena_user/plena_password

## 🔧 Servicios Incluidos

### 📊 Base de Datos (MySQL 8.0)
- **Puerto**: 3307 (externo) → 3306 (interno)
- **Volumen persistente**: mysql_data
- **Inicialización automática**: Scripts en `/script`
- **Health Check**: Verificación de conexión automática

### 🔗 Backend (Node.js + TypeScript)
- **Puerto**: 3001
- **Variables de entorno**: `.env.docker`
- **Hot reload**: Activado en desarrollo
- **Dependencias**: Auto-instalación al construir

### ⚛️ Frontend (React + Vite)
- **Puerto**: 3000
- **Nginx**: Servidor web optimizado
- **Build optimizado**: Para producción
- **Proxy API**: Configurado automáticamente

### 🔄 Nginx (Proxy Reverso)
- **Puerto**: 80
- **Funciones**: 
  - Balanceador de carga
  - Proxy reverso
  - Configuración CORS
  - Headers de seguridad

## 🛠️ Comandos Útiles

### Gestión de Contenedores
```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Reconstruir servicios
docker-compose up --build

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mysql
```

### Acceso a Contenedores
```bash
# Acceder al contenedor del backend
docker exec -it plena-backend bash

# Acceder al contenedor de MySQL
docker exec -it plena-mysql mysql -u root -p

# Acceder al contenedor del frontend
docker exec -it plena-frontend sh
```

### Base de Datos
```bash
# Conectar a MySQL desde host
mysql -h localhost -P 3307 -u plena_user -p

# Ejecutar script SQL
docker exec -i plena-mysql mysql -u root -p plena-studio < script/nuevo-script.sql

# Backup de la base de datos
docker exec plena-mysql mysqldump -u root -p plena-studio > backup.sql

# Restaurar backup
docker exec -i plena-mysql mysql -u root -p plena-studio < backup.sql
```

## 🔍 Verificación del Sistema

### 1. Verificar estado de contenedores
```bash
docker-compose ps
```

### 2. Verificar logs
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de errores
docker-compose logs | grep ERROR
```

### 3. Verificar conectividad
```bash
# Test del backend
curl http://localhost:3001/health

# Test del frontend
curl http://localhost:3000

# Test de la base de datos
docker exec plena-mysql mysqladmin ping -h localhost
```

## 🏗️ Estructura de Archivos Docker

```
PlenaStudio/
├── docker-compose.yml          # Orquestación principal
├── Dockerfile.frontend         # Build del frontend
├── Backend/
│   ├── Dockerfile             # Build del backend
│   ├── .env.docker           # Variables de entorno
│   └── .dockerignore         # Archivos excluidos
├── nginx.conf                 # Configuración proxy
├── nginx-frontend.conf        # Configuración frontend
├── script/
│   └── 01-init-database.sql  # Inicialización DB
└── .dockerignore             # Archivos excluidos globales
```

## 🔒 Configuración de Seguridad

### Variables de Entorno Importantes
```env
# Cambiar en producción
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
MYSQL_ROOT_PASSWORD=root
MYSQL_PASSWORD=plena_password
```

### Headers de Seguridad (Nginx)
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer-when-downgrade

## 🐛 Resolución de Problemas

### Problemas Comunes

#### Puerto ya en uso
```bash
# Verificar qué proceso usa el puerto
netstat -tulpn | grep :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Cambiar puerto externo
```

#### Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs [servicio]

# Reconstruir contenedor específico
docker-compose up --build [servicio]
```

#### Base de datos no conecta
```bash
# Verificar health check
docker-compose ps

# Reiniciar solo MySQL
docker-compose restart mysql

# Ver logs de MySQL
docker-compose logs mysql
```

#### Permisos de archivos
```bash
# En Linux/Mac, ajustar permisos
sudo chown -R $USER:$USER .

# En Windows, verificar compartir unidades en Docker Desktop
```

## 📈 Monitoreo

### Métricas de Contenedores
```bash
# Ver uso de recursos
docker stats

# Ver información detallada
docker system df
docker system info
```

### Logs Estructurados
- **Frontend**: `/var/log/nginx/`
- **Backend**: `console.log` (stdout)
- **MySQL**: `/var/log/mysql/`

## 🚀 Deploy a Producción

### Cambios Necesarios
1. Cambiar variables de entorno sensibles
2. Usar imagen optimizada de producción
3. Configurar HTTPS en Nginx
4. Implementar backup automático de DB
5. Configurar monitoring y alertas

### Ejemplo de Producción
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    environment:
      - NODE_ENV=production
      - VITE_API_URL=https://api.plenastudio.com
```

## 📞 Soporte

Si encuentras problemas:
1. Verifica los logs: `docker-compose logs`
2. Reinicia los servicios: `docker-compose restart`
3. Reconstruye las imágenes: `docker-compose up --build`
4. Limpia el sistema: `docker system prune -a`

---
**¡Tu aplicación Plena Studio estará disponible en http://localhost!** 🎉
