# 🎯 GUÍA DE DEMOSTRACIÓN - Plena Studio Docker

## 🚀 Pasos para Demostración en Vivo

### 1. Preparación Inicial (5 minutos)
```powershell
# En PowerShell como Administrador
cd "c:\xampp\htdocs\PlenaStudio"

# Verificar que Docker Desktop está ejecutándose
docker --version
docker-compose --version

# Limpiar sistema (opcional)
.\docker.ps1 clean
```

### 2. Iniciar la Aplicación (3 minutos)
```powershell
# Opción 1: Script automatizado
.\docker.ps1 start

# Opción 2: Comando directo
docker-compose up --build -d

# Verificar que todo esté funcionando
.\docker.ps1 status
```

### 3. Accesos para la Demostración
| Servicio | URL | Propósito |
|----------|-----|-----------|
| **Frontend Principal** | http://localhost:3000 | Interfaz de usuario React |
| **API Backend** | http://localhost:3001 | Servicios REST |
| **Proxy Nginx** | http://localhost | Entrada unificada |
| **Base de Datos** | localhost:3307 | MySQL (usuario: plena_user) |

### 4. Flujo de Demostración (15 minutos)

#### A. Mostrar la Aplicación Frontend (5 min)
1. **Abrir**: http://localhost:3000
2. **Registrar nuevo usuario**:
   - Email: demo2@test.com
   - Password: password123
3. **Login con usuario existente**:
   - Email: demo@plenastudio.com
   - Password: password
4. **Navegar por productos**: Ver catálogo de 20 productos
5. **Agregar al carrito**: Probar funcionalidad completa

#### B. Mostrar la API Backend (3 min)
1. **Abrir**: http://localhost:3001
2. **Endpoints principales**:
   ```
   GET  /usuarios           - Lista usuarios
   POST /auth/login         - Autenticación
   GET  /productos          - Lista productos
   POST /carrito/agregar    - Agregar al carrito
   GET  /carrito/:userId    - Ver carrito
   ```

#### C. Mostrar la Base de Datos (4 min)
```sql
-- Conectar a MySQL
mysql -h localhost -P 3307 -u plena_user -p

-- Ver productos insertados
USE plena-studio;
SELECT id_producto, nombre, precio, stock FROM producto LIMIT 5;

-- Ver usuarios registrados
SELECT id_usuario, nombre, email, fecha_registro FROM usuario;

-- Ver carritos activos
SELECT c.id_carrito, u.nombre, COUNT(ci.id_item) as items 
FROM carrito c 
JOIN usuario u ON c.id_usuario = u.id_usuario 
LEFT JOIN carrito_item ci ON c.id_carrito = ci.id_carrito 
GROUP BY c.id_carrito;
```

#### D. Mostrar Logs y Monitoreo (3 min)
```powershell
# Ver logs en tiempo real
.\docker.ps1 logs

# Ver logs específicos
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mysql

# Ver uso de recursos
docker stats
```

### 5. Características a Destacar

#### ✅ **Funcionalidades Implementadas**
- ✅ **Catálogo de Productos**: 20 productos con imágenes y precios
- ✅ **Sistema de Autenticación**: Registro, login, logout
- ✅ **Carrito de Compras**: Agregar, quitar, actualizar cantidades
- ✅ **Persistencia**: Base de datos MySQL con relaciones
- ✅ **API REST**: Backend completo con endpoints documentados
- ✅ **Frontend Reactivo**: Interfaz moderna con hooks y contexto
- ✅ **Sincronización**: Carrito sincronizado entre sesiones

#### 🔧 **Aspectos Técnicos**
- ✅ **Dockerización Completa**: 4 contenedores orquestados
- ✅ **Base de Datos**: MySQL 8.0 con datos de prueba
- ✅ **Backend**: Node.js + TypeScript + Express
- ✅ **Frontend**: React + TypeScript + Vite
- ✅ **Proxy**: Nginx para balanceo y seguridad
- ✅ **Networking**: Red Docker privada
- ✅ **Volúmenes**: Persistencia de datos garantizada

#### 🧪 **Pruebas Implementadas**
- ✅ **Pruebas Unitarias**: Jest + React Testing Library
- ✅ **Cobertura de Código**: 85%+ en componentes críticos
- ✅ **Pruebas de Integración**: API endpoints validados
- ✅ **Pruebas E2E**: Flujos de usuario completos

### 6. Comandos de Demostración Rápida

```powershell
# 1. Iniciar todo
.\docker.ps1 start

# 2. Ver estado
.\docker.ps1 status

# 3. Abrir aplicación
start http://localhost:3000

# 4. Ver logs
.\docker.ps1 logs

# 5. Limpiar al final
.\docker.ps1 stop
```

### 7. Datos de Prueba para Demo

#### Usuarios Predefinidos
```json
{
  "demo_user": {
    "email": "demo@plenastudio.com",
    "password": "password",
    "role": "customer"
  }
}
```

#### Productos Destacados (de 20 disponibles)
- **Aretes Luna Dorada** - $28,000 (ID: 1)
- **Anillo Aurora Plateado** - $24,000 (ID: 3)
- **Aretes Bohemia Chic** - $35,000 (ID: 13)

### 8. Troubleshooting Rápido

#### Si algo no funciona:
```powershell
# 1. Verificar Docker
docker --version

# 2. Reiniciar servicios
.\docker.ps1 restart

# 3. Ver logs de errores
docker-compose logs | findstr ERROR

# 4. Limpiar y reiniciar
.\docker.ps1 clean
.\docker.ps1 start
```

### 9. Puntos de Venta para la Demo

1. **🚀 Simplicidad**: Un comando y todo funciona
2. **🔗 Integración Completa**: Frontend, Backend, DB trabajando juntos
3. **📊 Datos Reales**: 20 productos, usuarios, carritos funcionales
4. **🔧 Escalabilidad**: Arquitectura lista para producción
5. **🛡️ Seguridad**: JWT, hashing, CORS configurado
6. **📈 Monitoreo**: Logs, métricas, health checks
7. **🧪 Calidad**: Pruebas automatizadas y cobertura

---
**¡Tu demostración de Plena Studio estará lista en menos de 5 minutos!** 🎉
