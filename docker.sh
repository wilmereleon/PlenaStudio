#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Plena Studio - Script de Docker${NC}"
echo "======================================"

# Función para mostrar ayuda
show_help() {
    echo -e "${YELLOW}Uso: $0 [COMANDO]${NC}"
    echo ""
    echo "Comandos disponibles:"
    echo "  start     - Iniciar todos los servicios"
    echo "  stop      - Parar todos los servicios"
    echo "  restart   - Reiniciar todos los servicios"
    echo "  build     - Construir las imágenes"
    echo "  logs      - Ver logs de todos los servicios"
    echo "  clean     - Limpiar contenedores y volúmenes"
    echo "  dev       - Iniciar solo backend y DB (desarrollo)"
    echo "  status    - Ver estado de los contenedores"
    echo "  help      - Mostrar esta ayuda"
}

# Función para verificar si Docker está ejecutándose
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Error: Docker no está ejecutándose${NC}"
        echo "Por favor, inicia Docker Desktop y vuelve a intentar."
        exit 1
    fi
}

# Función para iniciar servicios
start_services() {
    echo -e "${BLUE}🚀 Iniciando servicios de Plena Studio...${NC}"
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicios iniciados correctamente${NC}"
        echo ""
        echo "🌐 Accesos disponibles:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend API: http://localhost:3001"
        echo "   Proxy Nginx: http://localhost"
        echo "   Base de Datos: localhost:3307"
        echo ""
        echo "Para ver los logs: $0 logs"
    else
        echo -e "${RED}❌ Error al iniciar los servicios${NC}"
        exit 1
    fi
}

# Función para parar servicios
stop_services() {
    echo -e "${YELLOW}🛑 Parando servicios de Plena Studio...${NC}"
    docker-compose down
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicios parados correctamente${NC}"
    else
        echo -e "${RED}❌ Error al parar los servicios${NC}"
        exit 1
    fi
}

# Función para reiniciar servicios
restart_services() {
    echo -e "${BLUE}🔄 Reiniciando servicios de Plena Studio...${NC}"
    docker-compose restart
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicios reiniciados correctamente${NC}"
    else
        echo -e "${RED}❌ Error al reiniciar los servicios${NC}"
        exit 1
    fi
}

# Función para construir imágenes
build_images() {
    echo -e "${BLUE}🔨 Construyendo imágenes de Plena Studio...${NC}"
    docker-compose build --no-cache
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Imágenes construidas correctamente${NC}"
    else
        echo -e "${RED}❌ Error al construir las imágenes${NC}"
        exit 1
    fi
}

# Función para ver logs
show_logs() {
    echo -e "${BLUE}📋 Mostrando logs de Plena Studio...${NC}"
    echo "Presiona Ctrl+C para salir"
    docker-compose logs -f
}

# Función para limpiar sistema
clean_system() {
    echo -e "${YELLOW}🧹 Limpiando sistema Docker...${NC}"
    echo "¿Estás seguro? Esto eliminará contenedores, volúmenes e imágenes (y/N):"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        docker-compose down -v
        docker system prune -a -f
        echo -e "${GREEN}✅ Sistema limpiado correctamente${NC}"
    else
        echo "Operación cancelada"
    fi
}

# Función para modo desarrollo
dev_mode() {
    echo -e "${BLUE}💻 Iniciando modo desarrollo (Backend + DB)...${NC}"
    docker-compose -f docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicios de desarrollo iniciados${NC}"
        echo ""
        echo "🌐 Accesos disponibles:"
        echo "   Backend API: http://localhost:3001"
        echo "   Base de Datos: localhost:3307"
        echo ""
        echo "💡 Ejecuta el frontend localmente con: npm run dev"
    else
        echo -e "${RED}❌ Error al iniciar servicios de desarrollo${NC}"
        exit 1
    fi
}

# Función para mostrar estado
show_status() {
    echo -e "${BLUE}📊 Estado de contenedores de Plena Studio:${NC}"
    docker-compose ps
    echo ""
    echo -e "${BLUE}💾 Uso de recursos:${NC}"
    docker stats --no-stream
}

# Verificar Docker antes de ejecutar comandos
check_docker

# Procesar comando
case $1 in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    build)
        build_images
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_system
        ;;
    dev)
        dev_mode
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando no reconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
