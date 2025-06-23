-- =====================================================
-- SCRIPT DE INSERCIÓN DE PRODUCTOS - PLENA STUDIO
-- =====================================================
-- Insertar todos los productos del catálogo en la base de datos
-- Fecha: Diciembre 2024

USE `plena-studio`;

-- Limpiar productos existentes (opcional)
-- DELETE FROM carrito_item; -- Limpiar items de carrito primero (FK constraint)
-- DELETE FROM producto;

-- Insertar productos del catálogo completo
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen_url, stock, fecha_creacion) VALUES 
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

-- Verificar inserción
SELECT COUNT(*) as 'Total de productos insertados' FROM producto;

-- Mostrar resumen de productos por rango de precio
SELECT 
    CASE 
        WHEN precio < 25000 THEN 'Económico (< $25,000)'
        WHEN precio BETWEEN 25000 AND 30000 THEN 'Medio ($25,000 - $30,000)'
        WHEN precio > 30000 THEN 'Premium (> $30,000)'
    END AS categoria_precio,
    COUNT(*) as cantidad,
    MIN(precio) as precio_minimo,
    MAX(precio) as precio_maximo,
    AVG(precio) as precio_promedio
FROM producto 
GROUP BY 
    CASE 
        WHEN precio < 25000 THEN 'Económico (< $25,000)'
        WHEN precio BETWEEN 25000 AND 30000 THEN 'Medio ($25,000 - $30,000)'
        WHEN precio > 30000 THEN 'Premium (> $30,000)'
    END
ORDER BY precio_minimo;

-- Mostrar todos los productos insertados
SELECT id_producto, nombre, precio, stock, imagen_url FROM producto ORDER BY id_producto;
