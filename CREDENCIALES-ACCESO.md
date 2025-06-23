# 🔑 CREDENCIALES DE ACCESO - PLENA STUDIO

## 📋 USUARIOS PREDEFINIDOS PARA PRUEBAS

### ✅ Funciona en TODOS los entornos (localhost, Surge, Vercel)

#### 👤 **Usuario Administrador**
- **Email:** `admin@plenastudio.co`
- **Password:** `admin123`
- **Rol:** Administrador
- **Descripción:** Usuario con permisos completos

#### 👤 **Usuario Demo Principal**
- **Email:** `demo@plenastudio.com` 
- **Password:** `password`
- **Rol:** Usuario estándar
- **Descripción:** Usuario principal para demostraciones

#### 👤 **Usuario Demo Alternativo**
- **Email:** `usuario@demo.com`
- **Password:** `demo123`
- **Rol:** Usuario estándar
- **Descripción:** Usuario alternativo para pruebas

#### 👤 **Usuario de Pruebas**
- **Email:** `test@test.com`
- **Password:** `test123`
- **Rol:** Usuario de pruebas
- **Descripción:** Usuario específico para testing

#### 👤 **Usuario Ejemplo**
- **Email:** `ana@example.com`
- **Password:** `ana123`
- **Rol:** Usuario estándar
- **Descripción:** Usuario ejemplo adicional

---

## 🔧 CÓMO FUNCIONA EL SISTEMA

### 🌐 **En Producción (Surge/Vercel)**
- ✅ **Sin backend:** Sistema de autenticación local usando localStorage
- ✅ **Usuarios predefinidos:** Cargados automáticamente al primer uso
- ✅ **Persistencia:** Los datos se mantienen en el navegador del usuario
- ✅ **Seguridad:** Contraseñas hasheadas con salt

### 🖥️ **En Desarrollo (localhost)**
- ✅ **Con backend:** Sistema de autenticación completo con base de datos
- ✅ **Fallback automático:** Si el backend no está disponible, usa el sistema local
- ✅ **Sincronización:** Datos del carrito se sincronizan entre sistemas

---

## 🧪 INSTRUCCIONES DE PRUEBA

### **Paso 1: Acceder al sistema**
1. Ve a la página de login
2. Usa cualquiera de las credenciales listadas arriba
3. El sistema detectará automáticamente si hay backend disponible

### **Paso 2: Probar funcionalidades**
1. **Agregar productos al carrito** antes del login
2. **Hacer login** con cualquier usuario
3. **Verificar** que el carrito se mantiene tras el login
4. **Probar logout** y confirmar que el carrito se limpia

### **Paso 3: Validar en diferentes entornos**
- ✅ **localhost:3000** - Con backend
- ✅ **[tu-app].surge.sh** - Solo frontend
- ✅ **[tu-app].vercel.app** - Solo frontend

---

## 🚨 NOTAS IMPORTANTES

### ⚠️ **Para Entornos de Producción Real**
- Estas credenciales son **SOLO PARA DEMO**
- En producción real, implementar sistema de registro completo
- Usar hash de contraseñas más robusto (bcrypt, etc.)
- Implementar validación de email y 2FA

### 🔐 **Seguridad en Demo**
- Las contraseñas están hasheadas con salt fijo
- Los datos se almacenan en localStorage del navegador
- No se envían credenciales a servidores externos
- Sistema de bloqueo temporal tras intentos fallidos (5 intentos = 30 min bloqueo)

---

## 🎯 CASOS DE USO

### **Para Desarrolladores:**
```javascript
// Login programático
const credentials = {
  email: 'demo@plenastudio.com',
  password: 'password'
};

const result = await authService.login(credentials);
console.log('Usuario autenticado:', result.user);
```

### **Para QA/Testing:**
- Usar diferentes usuarios para simular escenarios
- Probar bloqueo de cuenta con intentos fallidos
- Validar persistencia del carrito en diferentes usuarios

### **Para Demos/Presentaciones:**
- Usuario principal: `demo@plenastudio.com` / `password`
- Fácil de recordar y demostrar
- Funciona en cualquier entorno sin configuración

---

## ✅ ESTADO ACTUAL

**Implementación:** ✅ Completada
**Testing:** ✅ Validado
**Documentación:** ✅ Actualizada
**Deploy:** ✅ Listo para producción

**Última actualización:** 23 de junio de 2025
