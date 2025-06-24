# 🐳 Guía para Compartir Plena Studio con Docker

## 📋 Tabla de Contenidos
1. [Opciones de Compartición](#opciones-de-compartición)
2. [Método 1: Docker Hub (Recomendado)](#método-1-docker-hub-recomendado)
3. [Método 2: GitHub con Docker Compose](#método-2-github-con-docker-compose)
4. [Método 3: Archivo ZIP con Instrucciones](#método-3-archivo-zip-con-instrucciones)
5. [Método 4: Servicios en la Nube](#método-4-servicios-en-la-nube)
6. [Instrucciones para el Usuario Final](#instrucciones-para-el-usuario-final)

---

## 🎯 Opciones de Compartición

### ✅ Opción Recomendada: Docker Hub + GitHub
- **Ventajas**: Fácil distribución, actualizaciones automáticas, control de versiones
- **Ideal para**: Demostraciones profesionales, portafolios, revisiones externas

### 🔄 Opción Alternativa: ZIP con Docker
- **Ventajas**: No requiere cuentas externas, control total
- **Ideal para**: Revisiones internas, entornos corporativos restringidos

---

## 🚀 Método 1: Docker Hub (Recomendado)

### Paso 1: Crear cuenta en Docker Hub
1. Ir a [hub.docker.com](https://hub.docker.com)
2. Crear cuenta gratuita
3. Verificar email

### Paso 2: Preparar las imágenes
```powershell
# 1. Construir las imágenes localmente
docker-compose build

# 2. Etiquetar las imágenes para Docker Hub
docker tag plena-frontend tu-usuario/plena-studio-frontend:latest
docker tag plena-backend tu-usuario/plena-studio-backend:latest

# 3. Hacer login en Docker Hub
docker login

# 4. Subir las imágenes
docker push tu-usuario/plena-studio-frontend:latest
docker push tu-usuario/plena-studio-backend:latest
```

### Paso 3: Crear docker-compose público
Crear archivo `docker-compose.public.yml`:
```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: plena-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: plena-studio
      MYSQL_USER: plena_user
      MYSQL_PASSWORD: plena_password
    ports:
      - "3308:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - plena-network

  backend:
    image: tu-usuario/plena-studio-backend:latest
    container_name: plena-backend
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_USER=plena_user
      - DB_PASSWORD=plena_password
      - DB_NAME=plena-studio
      - JWT_SECRET=demo-jwt-key-change-in-production
      - PORT=3001
    ports:
      - "3001:3001"
    depends_on:
      - mysql
    networks:
      - plena-network

  frontend:
    image: tu-usuario/plena-studio-frontend:latest
    container_name: plena-frontend
    environment:
      - VITE_API_URL=http://localhost:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - plena-network

volumes:
  mysql_data:

networks:
  plena-network:
    driver: bridge
```

---

## 📂 Método 2: GitHub con Docker Compose

### Paso 1: Crear repositorio público
1. Ir a [github.com](https://github.com)
2. Crear nuevo repositorio público
3. Subir el código completo

### Paso 2: Crear instrucciones de instalación
```markdown
## 🚀 Instalación y Ejecución

### Prerrequisitos
- Docker Desktop instalado
- Git instalado

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/plena-studio.git
   cd plena-studio
   ```

2. Ejecutar con Docker:
   ```bash
   docker-compose up --build -d
   ```

3. Acceder a la aplicación:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Base de datos: localhost:3308
```

---

## 📦 Método 3: Archivo ZIP con Instrucciones

### Contenido del ZIP
```
PlenaStudio-Docker/
├── docker-compose.yml
├── Dockerfile.frontend
├── Backend/
│   └── Dockerfile
├── src/
├── public/
├── script/
├── README-EJECUTAR.md
└── INSTRUCCIONES-DOCKER.txt
```

### Crear README-EJECUTAR.md
```markdown
# 🎯 Plena Studio - Ejecución con Docker

## ⚡ Inicio Rápido
1. Asegúrate de tener Docker Desktop instalado
2. Abre una terminal/PowerShell en esta carpeta
3. Ejecuta: `docker-compose up --build -d`
4. Espera a que descargue e instale todo (primera vez: 5-10 minutos)
5. Abre tu navegador en: http://localhost:3000

## 🛑 Para Detener
```bash
docker-compose down
```

## 🔧 Solución de Problemas
- Si hay error de puerto ocupado, cambia los puertos en docker-compose.yml
- Si no carga la página, espera unos minutos más
- Para ver logs: `docker-compose logs -f`
```

---

## ☁️ Método 4: Servicios en la Nube

### Opción A: Railway.app
1. Conectar GitHub a Railway
2. Desplegar automáticamente
3. Compartir URL pública

### Opción B: Render.com
1. Fork del repositorio
2. Conectar a Render
3. Configurar servicios web

### Opción C: Digital Ocean App Platform
1. Conectar repositorio
2. Configurar app spec
3. Desplegar con un clic

---

## 👥 Instrucciones para el Usuario Final

### Si recibes Docker Hub
```bash
# 1. Descargar archivo docker-compose.public.yml
# 2. Ejecutar en la carpeta del archivo:
docker-compose -f docker-compose.public.yml up -d

# 3. Acceder a:
# - Aplicación: http://localhost:3000
# - API: http://localhost:3001
```

### Si recibes GitHub
```bash
# 1. Clonar repositorio:
git clone [URL-del-repositorio]
cd plena-studio

# 2. Ejecutar:
docker-compose up --build -d

# 3. Acceder a http://localhost:3000
```

### Si recibes ZIP
```bash
# 1. Extraer ZIP
# 2. Abrir terminal en la carpeta
# 3. Ejecutar:
docker-compose up --build -d

# 4. Acceder a http://localhost:3000
```

---

## 🔐 Consideraciones de Seguridad

### Para Demostraciones
- ✅ Usar contraseñas de demo simples
- ✅ JWT_SECRET genérico para demos
- ✅ Puertos estándar (3000, 3001, 3308)

### Para Producción
- ❌ Cambiar todas las credenciales
- ❌ Usar variables de entorno seguras
- ❌ Configurar HTTPS con certificados

---

## 📊 URLs de Acceso

| Servicio | URL Local | Descripción |
|----------|-----------|-------------|
| Frontend | http://localhost:3000 | Aplicación React |
| Backend API | http://localhost:3001 | API Node.js |
| Nginx | http://localhost:80 | Proxy reverso |
| MySQL | localhost:3308 | Base de datos |

---

## 🆘 Comandos Útiles de Docker

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Detener y limpiar todo
docker-compose down -v

# Reconstruir desde cero
docker-compose up --build --force-recreate -d
```

---

## 📞 Soporte

Para problemas o dudas:
1. Revisar logs con `docker-compose logs -f`
2. Verificar que Docker Desktop esté ejecutándose
3. Comprobar que los puertos no estén ocupados
4. Contactar al equipo de desarrollo

---

**Creado por:** Wilmer & Gustavo Adolfo González  
**Proyecto:** Plena Studio TSPi  
**Fecha:** Diciembre 2024
