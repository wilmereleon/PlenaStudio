# Dockerfile para Backend Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo dev)
RUN npm ci

# Instalar TypeScript y ts-node globalmente
RUN npm install -g typescript ts-node

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3001

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar permisos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Comando por defecto
CMD ["npm", "run", "start:dev"]
