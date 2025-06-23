# 🔍 DIAGNÓSTICO DEL PROBLEMA "Usuario no encontrado"

## 📋 SITUACIÓN ACTUAL

**Problema reportado:** Al insertar un nuevo registro de usuario, posteriormente aparece "usuario no encontrado" cuando se intenta hacer login.

## 🧪 PRUEBAS DE DIAGNÓSTICO

### **Paso 1: Acceder a la página de pruebas**
1. Ve a: `http://localhost:5174/auth-test`
2. Esta página permite probar directamente las funciones de localStorage

### **Paso 2: Probar registro directo**
1. Haz clic en "1️⃣ Registro Directo"
2. Revisa la consola del navegador para logs detallados
3. Verifica si el usuario se guarda correctamente

### **Paso 3: Probar login directo**
1. Haz clic en "2️⃣ Login Directo"
2. Revisa si encuentra el usuario que acabas de registrar
3. Verifica si la contraseña coincide

### **Paso 4: Diagnóstico avanzado**
1. Ve a: `http://localhost:5174/auth-debug`
2. Esta página usa el authService completo
3. Prueba el flujo completo de registro → login

## 🔍 POSIBLES CAUSAS DEL PROBLEMA

### **1. Problema de Timing**
- El usuario se registra correctamente
- Pero cuando se intenta login inmediatamente después, no se encuentra
- **Solución:** Verificar si hay algún delay en la persistencia

### **2. Problema de Instancia**
- Diferentes instancias del authService
- Una instancia registra, otra busca
- **Solución:** Usar singleton correctamente

### **3. Problema de localStorage**
- Los datos no se guardan correctamente
- Se sobrescriben por alguna función de inicialización
- **Solución:** Verificar que initializeDefaultUsers() no borre usuarios nuevos

### **4. Problema de Serialización**
- Error al convertir a/desde JSON
- Corrupción de datos en localStorage
- **Solución:** Verificar JSON.parse/stringify

## 🛠️ DEBUGGING PASO A PASO

### **Método 1: Browser DevTools**
```javascript
// Abrir consola del navegador y ejecutar:

// Ver usuarios en localStorage
localStorage.getItem('plena_users')

// Limpiar localStorage
localStorage.removeItem('plena_users')

// Verificar si hay conflictos
Object.keys(localStorage).filter(key => key.includes('plena'))
```

### **Método 2: Logs del AuthService**
Los siguientes logs aparecerán en la consola:

```
🔧 AuthService inicializado con baseUrl: ...
📝 DEBUG getStoredUsers - Total usuarios: X
📝 DEBUG REGISTRO - Usuarios existentes: X
📝 DEBUG REGISTRO - Nuevo usuario creado: {...}
📝 DEBUG REGISTRO - Usuario guardado en localStorage
✅ DEBUG REGISTRO - Verificación SYNC de guardado: true/false
✅ DEBUG REGISTRO - Verificación ASYNC de guardado: true/false
```

### **Método 3: Test Manual**
1. Abre herramientas de desarrollo (F12)
2. Ve a la pestaña "Application" > "Local Storage"
3. Busca la clave `plena_users`
4. Verifica que contiene los usuarios registrados

## 📝 LOGS ESPERADOS (FUNCIONAMIENTO NORMAL)

### **Durante el Registro:**
```
🔧 Ejecutando registro local para: test123@example.com
📝 DEBUG REGISTRO - Usuarios existentes: 5
📝 DEBUG REGISTRO - Emails existentes: [admin@plenastudio.co, ...]
📝 DEBUG REGISTRO - Nuevo usuario creado: {id: "6", email: "test123@example.com", ...}
📝 DEBUG REGISTRO - Usuario guardado en localStorage
📝 DEBUG REGISTRO - Total usuarios después del registro: 6
✅ DEBUG REGISTRO - Verificación SYNC de guardado: true
✅ DEBUG REGISTRO - Verificación ASYNC de guardado: true
✅ Registro local exitoso para: test123@example.com
```

### **Durante el Login:**
```
🔧 Ejecutando login local para: test123@example.com
📝 DEBUG getStoredUsers - Total usuarios: 6
📝 DEBUG getStoredUsers - Emails: [admin@plenastudio.co, ..., test123@example.com]
📝 DEBUG - Usuarios disponibles: 6
📝 DEBUG - Emails disponibles: [admin@plenastudio.co, ..., test123@example.com]
📝 DEBUG - Buscando email: test123@example.com
✅ Login local exitoso para: test123@example.com
```

## 🚨 LOGS DE ERROR (PROBLEMA DETECTADO)

### **Si el registro falla:**
```
❌ DEBUG REGISTRO - Verificación SYNC de guardado: false
❌ PROBLEMA: Usuario no se guardó correctamente en localStorage
```

### **Si el login falla:**
```
📝 DEBUG - Usuarios disponibles: 5
📝 DEBUG - Emails disponibles: [admin@plenastudio.co, ...] // SIN el nuevo usuario
❌ DEBUG - Usuario no encontrado en la lista
❌ Usuario no encontrado
```

## 🔧 SOLUCIONES POSIBLES

### **Si el problema es de timing:**
```javascript
// Agregar delay antes del login
setTimeout(() => {
  authService.login(credentials);
}, 500);
```

### **Si el problema es de inicialización:**
```javascript
// Verificar que initializeDefaultUsers() no sobrescriba
if (existingUsers.length === 0) { // Solo si NO hay usuarios
  // Crear usuarios por defecto
}
```

### **Si el problema es de instancia:**
```javascript
// Forzar refresh de la instancia
delete authService._cachedUsers; // Si existe
authService.refreshUsers(); // Si existe
```

## ✅ PASOS PARA RESOLVER

1. **Ejecutar pruebas:** Ve a `/auth-test` y `/auth-debug`
2. **Revisar logs:** Abre consola del navegador
3. **Identificar fallo:** Busca logs de error específicos
4. **Aplicar solución:** Según el tipo de problema detectado
5. **Verificar:** Confirmar que registro + login funciona

## 📞 SOPORTE

Si el problema persiste después de seguir estos pasos:

1. Copia todos los logs de la consola
2. Incluye los pasos exactos que seguiste
3. Menciona en qué navegador ocurre
4. Indica si sucede en modo incógnito también

---

**Última actualización:** 23 de junio de 2025
**Estado:** Diagnóstico en progreso
**Prioridad:** Alta - Funcionalidad crítica afectada
