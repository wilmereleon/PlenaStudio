# 🚀 Plena Studio - Instrucciones de Ejecución

## ⚡ Inicio Rápido (5 minutos)

### Prerrequisitos
✅ Docker Desktop instalado ([Descargar aquí](https://www.docker.com/products/docker-desktop/))

### Ejecución
1. **Descargar** este proyecto completo
2. **Abrir terminal/PowerShell** en la carpeta del proyecto
3. **Ejecutar comando:**
   ```bash
   docker-compose up --build -d
   ```
4. **Esperar** 3-5 minutos (primera ejecución descarga dependencias)
5. **Abrir navegador** en: http://localhost:3000

### 🎯 URLs de Acceso
- **Aplicación Principal:** http://localhost:3000
- **API Backend:** http://localhost:3001
- **Base de Datos:** localhost:3308

### 🛑 Para Detener
```bash
docker-compose down
```

### 🔧 Si hay Problemas
```bash
# Ver qué está pasando:
docker-compose logs -f

# Reiniciar todo:
docker-compose restart

# Limpiar y empezar de nuevo:
docker-compose down -v
docker-compose up --build -d
```

---

## 📱 Funcionalidades para Probar

### 🔐 Autenticación
- Registro de usuarios
- Login/Logout
- Activación de cuenta por email

### 🛒 E-commerce
- Catálogo de productos
- Carrito de compras persistente
- Proceso de checkout

### 👤 Gestión de Usuario
- Perfil de usuario
- Historial de compras
- Favoritos

---

## 🔗 Datos de Prueba

### Usuario de Prueba
- **Email:** demo@plena.com
- **Password:** demo123

### Productos Disponibles
- iPhone 14 Pro
- Samsung Galaxy S24
- Laptop Gaming
- Accesorios varios

---

## 🎓 Información del Proyecto

**Desarrollado por:** Wilmer & Gustavo Adolfo González  
**Metodología:** TSPi (Team Software Process)  
**Tecnologías:** React + TypeScript + Node.js + MySQL + Docker  
**Fecha:** Diciembre 2024

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que Docker Desktop esté ejecutándose
2. Comprueba que los puertos 3000, 3001 y 3308 estén libres
3. Revisa los logs con `docker-compose logs -f`
4. Contacta al equipo de desarrollo

**¡Disfruta explorando Plena Studio! 🎉**
