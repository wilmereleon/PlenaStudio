# Documentación de Diagramas - Plena Studio

Este directorio contiene la documentación completa de la arquitectura del sistema Plena Studio en formato PlantUML.

## 📋 Índice de Diagramas

### 1. **01-componentes-sistema.puml**
- **Descripción**: Arquitectura general del sistema con Docker
- **Contenido**: Containers, servicios, puertos, volúmenes y redes
- **Visualiza**: Frontend, Backend, Base de datos, Nginx, Docker

### 2. **02-endpoints-rest-api.puml** 
- **Descripción**: Documentación completa de la API REST del backend
- **Contenido**: Todos los endpoints, métodos HTTP, parámetros y respuestas
- **Incluye**: Auth, Cart, Catalog, Search, Contact, User endpoints

### 3. **03-componentes-frontend.puml**
- **Descripción**: Arquitectura de componentes del frontend React
- **Contenido**: Pages, Components, Context, Hooks, Services
- **Visualiza**: Flujo de datos, dependencias y estructura modular

### 4. **04-flujo-datos-sistema.puml**
- **Descripción**: Flujo completo de datos entre todos los componentes
- **Contenido**: Secuencia de interacciones Usuario → Frontend → Backend → BD
- **Incluye**: Autenticación, carrito, catálogo, búsqueda, logout

### 5. **05-diagrama-base-datos.puml**
- **Descripción**: Esquema completo de la base de datos
- **Contenido**: Tablas, relaciones, constraints, índices
- **Incluye**: Usuarios, productos, carrito, items del carrito

## 🔧 Cómo Usar los Diagramas

### Visualización Online
1. Copia el contenido de cualquier archivo `.puml`
2. Pégalo en [PlantUML Online](http://www.plantuml.com/plantuml/uml/)
3. Genera el diagrama en formato PNG, SVG o PDF

### Visualización en VS Code
1. Instala la extensión "PlantUML" en VS Code
2. Abre cualquier archivo `.puml`
3. Presiona `Ctrl+Shift+P` → "PlantUML: Preview Current Diagram"
4. O usa `Alt+D` para vista previa

### Exportar Diagramas
```bash
# Instalar PlantUML localmente
java -jar plantuml.jar -tpng *.puml

# O usando la extensión de VS Code
# Ctrl+Shift+P → "PlantUML: Export Current Diagram"
```

## 📁 Estructura de Archivos

```
Diagramas/
├── PUML/                           # Archivos fuente PlantUML
│   ├── 01-componentes-sistema.puml
│   ├── 02-endpoints-rest-api.puml
│   ├── 03-componentes-frontend.puml
│   ├── 04-flujo-datos-sistema.puml
│   ├── 05-diagrama-base-datos.puml
│   └── README.md                   # Este archivo
├── PNG/                            # Exportaciones en PNG (generadas)
└── plena-studio-db-diagrama...pdf  # Diagrama existente
```

## 🎯 Casos de Uso de los Diagramas

### Para Desarrolladores
- **01-componentes-sistema**: Entender la arquitectura Docker
- **03-componentes-frontend**: Navegar el código React
- **05-diagrama-base-datos**: Trabajar con la BD

### Para DevOps
- **01-componentes-sistema**: Deploy y configuración
- **04-flujo-datos-sistema**: Monitoreo y debugging

### Para Documentation
- **02-endpoints-rest-api**: Documentación de API
- **04-flujo-datos-sistema**: Flujos de usuario

### Para Testing
- **04-flujo-datos-sistema**: Casos de prueba E2E
- **05-diagrama-base-datos**: Tests de BD

## 🚀 Comandos Rápidos

### Generar todos los diagramas PNG
```bash
# Desde la carpeta Diagramas/PUML/
java -jar ../../plantuml.jar -tpng *.puml -o ../PNG/
```

### Validar sintaxis PlantUML
```bash
java -jar ../../plantuml.jar -checkonly *.puml
```

## 📝 Convenciones Usadas

### Colores y Temas
- **Tema**: aws-orange (consistente en todos los diagramas)
- **Frontend**: Azul
- **Backend**: Verde
- **Base de Datos**: Naranja
- **Docker**: Azul claro

### Notaciones
- **PK**: Primary Key
- **FK**: Foreign Key
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **JWT**: JSON Web Token

## 🔄 Mantenimiento

### Actualizar Diagramas
1. Modificar archivos `.puml` según cambios en el código
2. Regenerar imágenes PNG
3. Actualizar documentación si es necesario

### Versionado
Los diagramas siguen la versión del proyecto. Cambios significativos en la arquitectura requieren actualización de diagramas.

---

**Última actualización**: $(date)
**Versión del sistema**: 1.0.0
**PlantUML versión**: 1.2024.x
