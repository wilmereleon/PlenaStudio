# Bug Fix: CORS Error 405 Method Not Allowed

## Problema Identificado
**Error:** `POST http://localhost:3000/api/auth/register 405 (Not Allowed)`
**Causa:** Configuración incorrecta de CORS y proxy nginx

## Síntomas
- Requests del frontend bloqueados por política CORS
- Error 405 en lugar de procesamiento normal de API
- Registro de usuarios fallaba completamente

## Análisis de la Causa Raíz

### 1. Configuración CORS Limitada
**Archivo:** `Backend/src/app.ts:14-18`
```typescript
// ANTES (PROBLEMÁTICO)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Solo puerto 3000
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Problema:** Frontend corriendo en puerto 80 (nginx) no estaba en la lista de orígenes permitidos.

### 2. Configuración Proxy Nginx Incorrecta
**Archivo:** `nginx.conf:28-29`
```nginx
# ANTES (PROBLEMÁTICO)
location /api/ {
    proxy_pass http://backend/;  # Faltaba /api/ en destino
}
```

**Problema:** nginx enviaba `/auth/register` en lugar de `/api/auth/register` al backend.

### 3. URLs Frontend Inconsistentes
**Archivos múltiples:** RegisterForm.tsx, authService.ts, cartService.ts
```typescript
// ANTES (PROBLEMÁTICO)
fetch('http://localhost:3000/api/auth/register')  // Puerto 3000 directo
```

**Problema:** Frontend intentaba conectar directo al backend en lugar de usar proxy nginx.

## Solución Implementada

### 1. Ampliación de Configuración CORS
**Archivo:** `Backend/src/app.ts:14-20`
```typescript
// DESPUÉS (CORREGIDO)
app.use(cors({
  origin: [
    'http://localhost:3000',    // Backend directo
    'http://127.0.0.1:3000',   // Backend IP
    'http://localhost',        // Frontend nginx (puerto 80) ✅
    'http://localhost:5173',   // Vite dev server
    'http://localhost:4173'    // Vite preview
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. Corrección Proxy Nginx
**Archivo:** `nginx.conf:28-29`
```nginx
# DESPUÉS (CORREGIDO)
location /api/ {
    proxy_pass http://backend/api/;  # Incluye /api/ en destino ✅
}
```

### 3. Actualización URLs Frontend
**Archivos:** RegisterForm.tsx, authService.ts, cartService.ts
```typescript
// DESPUÉS (CORREGIDO)
fetch('http://localhost/api/auth/register')  // Vía nginx proxy ✅
```

## Arquitectura de Red Corregida

```
[Frontend:3000] ←→ [Nginx:80] ←→ [Backend:3001]
     ↓                ↓               ↓
  React App      Proxy Reverso   Express API
  (nginx)         (routing)      (auth/cart)
```

### Flujo de Request Corregido:
1. Frontend envía: `POST http://localhost/api/auth/register`
2. Nginx recibe: `/api/auth/register`
3. Nginx proxy: `http://backend/api/auth/register`
4. Backend procesa: `POST /api/auth/register`
5. Respuesta exitosa: `200/201`

## Archivos Modificados

| Archivo | Cambio | Líneas |
|---------|--------|--------|
| `Backend/src/app.ts` | Ampliación orígenes CORS | 14-20 |
| `nginx.conf` | Corrección proxy_pass | 29 |
| `src/components/RegisterForm.tsx` | URL via nginx | 73 |
| `src/services/authService.ts` | URL via nginx | 177 |
| `src/services/cartService.ts` | URL via nginx | 8 |

## Pruebas de Validación

### Test via cURL:
```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"test","email":"test@test.com","password":"123456"}'

# Resultado esperado:
# {"id":2,"nombre":"test","email":"test@test.com"}
```

### Test Frontend:
1. Acceder a `http://localhost/register`
2. Completar formulario de registro
3. Verificar en Developer Tools → Network: 
   - Request URL: `http://localhost/api/auth/register`
   - Status: `201 Created`
   - Sin errores CORS

## Impacto
- ✅ Registro de usuarios funcional
- ✅ Login de usuarios funcional  
- ✅ Todas las APIs funcionando via nginx proxy
- ✅ Arquitectura de producción lista

## Lecciones Aprendidas
1. **CORS:** Siempre incluir todos los orígenes desde donde se accederá la API
2. **Nginx Proxy:** Verificar que paths coincidan entre location y proxy_pass
3. **URLs Frontend:** Usar proxy reverso en lugar de conexiones directas
4. **Testing:** Probar arquitectura completa, no solo componentes individuales

---
**Fecha:** 2024-12-27  
**Estado:** ✅ RESUELTO  
**Prioridad:** Alta  
**Tiempo de Resolución:** ~2 horas