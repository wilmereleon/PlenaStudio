-- =====================================================
-- SCRIPT DE INICIALIZACIÓN COMPLETA - PLENA STUDIO
-- =====================================================
-- Este script se ejecuta automáticamente al crear el contenedor de MySQL

-- Usar la base de datos
USE `plena-studio`;

-- Crear tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    email_verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(255),
    fecha_verificacion DATETIME,
    ultimo_acceso DATETIME
);

-- Crear tabla de productos si no existe
CREATE TABLE IF NOT EXISTS producto (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(500),
    stock INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de carrito si no existe
CREATE TABLE IF NOT EXISTS carrito (
    id_carrito INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Crear tabla de items del carrito si no existe
CREATE TABLE IF NOT EXISTS carrito_item (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
    UNIQUE KEY unique_carrito_producto (id_carrito, id_producto)
);

-- Insertar productos del catálogo completo
INSERT IGNORE INTO producto (id_producto, nombre, descripcion, precio, imagen_url, stock, fecha_creacion) VALUES 
(1, 'Aretes Luna Dorada', 'Aretes elegantes con diseño de luna en acabado dorado que aportan un toque celestial a cualquier outfit', 28000, 'earring01.jpeg', 50, NOW()),
(2, 'Aretes Flor de Cristal', 'Delicados aretes en forma de flor con cristales brillantes que capturan la luz de manera hermosa', 32000, 'earring04.jpeg', 45, NOW()),
(3, 'Anillo Aurora Plateado', 'Anillo de plata con diseño aurora que refleja múltiples tonalidades según la luz', 24000, 'ring01.jpeg', 35, NOW()),
(4, 'Anillo Esencia Minimalista', 'Anillo de diseño minimalista que combina elegancia y simplicidad en una pieza atemporal', 22000, 'ring02.jpeg', 40, NOW()),
(5, 'Anillo Corazón de Plata', 'Romántico anillo en forma de corazón elaborado en plata fina para ocasiones especiales', 26000, 'ring03.jpeg', 30, NOW()),
(6, 'Aretes Gota de Luz', 'Aretes en forma de gota que brillan como pequeñas luces colgantes con movimiento natural', 30000, 'womenEarring0.jpeg', 55, NOW()),
(7, 'Aretes Perla Elegante', 'Sofisticados aretes con perlas naturales que aportan clase y distinción a cualquier look', 34000, 'womenEarring01.jpeg', 25, NOW()),
(8, 'Aretes Hoja Tropical', 'Aretes inspirados en la naturaleza con diseño de hojas tropicales en tonos verdes', 29000, 'womenEarring02.jpeg', 42, NOW()),
(9, 'Aretes Estrella de Mar', 'Únicos aretes con forma de estrella de mar que evocan la belleza del océano', 31000, 'womenEarring03.jpeg', 38, NOW()),
(10, 'Aretes Círculo Moderno', 'Aretes de diseño geométrico circular con acabado moderno y contemporáneo', 27000, 'womenEarring04.jpeg', 48, NOW()),
(11, 'Aretes Rosa Pastel', 'Delicados aretes en tonos rosa pastel perfectos para looks románticos y femeninos', 33000, 'womenEarring05.jpeg', 33, NOW()),
(12, 'Aretes Sol Naciente', 'Aretes inspirados en el sol naciente con rayos dorados que irradian energía positiva', 28000, 'womenEarring06.jpeg', 41, NOW()),
(13, 'Aretes Bohemia Chic', 'Aretes de estilo bohemio con detalles étnicos que aportan un toque alternativo y chic', 35000, 'womenEarring07.jpeg', 28, NOW()),
(14, 'Aretes Lluvia de Plata', 'Elegantes aretes que simulan gotas de lluvia en plata con movimiento fluido y natural', 32000, 'womenEarring08.jpeg', 36, NOW()),
(15, 'Aretes Vintage Coral', 'Aretes de estilo vintage en tonos coral que combinan nostalgia con elegancia contemporánea', 30000, 'womenEarring09.jpeg', 32, NOW()),
(16, 'Aretes Esfera Dorada', 'Aretes esféricos con acabado dorado que aportan volumen y sofisticación al rostro', 29000, 'womenEarring10.jpeg', 44, NOW()),
(17, 'Aretes Minimal Oro', 'Aretes de líneas minimalistas en oro que complementan cualquier estilo con discreta elegancia', 26000, 'womenEarring11.jpeg', 52, NOW()),
(18, 'Aretes Fantasía Azul', 'Aretes en tonos azul fantasía con detalles que evocan la profundidad del mar', 31000, 'womenEarring12.jpeg', 29, NOW()),
(19, 'Aretes Encanto Natural', 'Aretes con elementos naturales que conectan con la esencia orgánica y auténtica', 27000, 'womenEarring13.jpeg', 46, NOW()),
(20, 'Aretes Fiesta de Color', 'Vibrantes aretes multicolor perfectos para eventos especiales y celebraciones', 34000, 'womenEarring14.jpeg', 31, NOW());

-- Crear usuario de prueba
INSERT IGNORE INTO usuario (id_usuario, nombre, email, password_hash, telefono, direccion, email_verificado) VALUES 
(1, 'Usuario Demo', 'demo@plenastudio.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1234567890', 'Dirección de prueba 123', TRUE);

-- Mostrar resumen de inicialización
SELECT 'Inicialización completada' as Status;
SELECT COUNT(*) as 'Total productos' FROM producto;
SELECT COUNT(*) as 'Total usuarios' FROM usuario;
