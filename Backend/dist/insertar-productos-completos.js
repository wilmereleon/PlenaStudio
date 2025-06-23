"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosCompletos = void 0;
exports.insertarProductosCompletos = insertarProductosCompletos;
const db_1 = require("./db");
// Productos del contexto completos
const productosCompletos = [
    { id_producto: 1, nombre: "Aretes Luna Dorada", descripcion: "Aretes elegantes con diseño de luna en acabado dorado que aportan un toque celestial a cualquier outfit", precio: 28000, imagen_url: "earring01.jpeg", stock: 50 },
    { id_producto: 2, nombre: "Aretes Flor de Cristal", descripcion: "Delicados aretes en forma de flor con cristales brillantes que capturan la luz de manera hermosa", precio: 32000, imagen_url: "earring04.jpeg", stock: 45 },
    { id_producto: 3, nombre: "Anillo Aurora Plateado", descripcion: "Anillo de plata con diseño aurora que refleja múltiples tonalidades según la luz", precio: 24000, imagen_url: "ring01.jpeg", stock: 35 },
    { id_producto: 4, nombre: "Anillo Esencia Minimalista", descripcion: "Anillo de diseño minimalista que combina elegancia y simplicidad en una pieza atemporal", precio: 22000, imagen_url: "ring02.jpeg", stock: 40 },
    { id_producto: 5, nombre: "Anillo Corazón de Plata", descripcion: "Romántico anillo en forma de corazón elaborado en plata fina para ocasiones especiales", precio: 26000, imagen_url: "ring03.jpeg", stock: 30 },
    { id_producto: 6, nombre: "Aretes Gota de Luz", descripcion: "Aretes en forma de gota que brillan como pequeñas luces colgantes con movimiento natural", precio: 30000, imagen_url: "womenEarring0.jpeg", stock: 55 },
    { id_producto: 7, nombre: "Aretes Perla Elegante", descripcion: "Sofisticados aretes con perlas naturales que aportan clase y distinción a cualquier look", precio: 34000, imagen_url: "womenEarring01.jpeg", stock: 25 },
    { id_producto: 8, nombre: "Aretes Hoja Tropical", descripcion: "Aretes inspirados en la naturaleza con diseño de hojas tropicales en tonos verdes", precio: 29000, imagen_url: "womenEarring02.jpeg", stock: 42 },
    { id_producto: 9, nombre: "Aretes Estrella de Mar", descripcion: "Únicos aretes con forma de estrella de mar que evocan la belleza del océano", precio: 31000, imagen_url: "womenEarring03.jpeg", stock: 38 },
    { id_producto: 10, nombre: "Aretes Círculo Moderno", descripcion: "Aretes de diseño geométrico circular con acabado moderno y contemporáneo", precio: 27000, imagen_url: "womenEarring04.jpeg", stock: 48 },
    { id_producto: 11, nombre: "Aretes Rosa Pastel", descripcion: "Delicados aretes en tonos rosa pastel perfectos para looks románticos y femeninos", precio: 33000, imagen_url: "womenEarring05.jpeg", stock: 33 },
    { id_producto: 12, nombre: "Aretes Sol Naciente", descripcion: "Aretes inspirados en el sol naciente con rayos dorados que irradian energía positiva", precio: 28000, imagen_url: "womenEarring06.jpeg", stock: 41 },
    { id_producto: 13, nombre: "Aretes Bohemia Chic", descripcion: "Aretes de estilo bohemio con detalles étnicos que aportan un toque alternativo y chic", precio: 35000, imagen_url: "womenEarring07.jpeg", stock: 28 },
    { id_producto: 14, nombre: "Aretes Lluvia de Plata", descripcion: "Elegantes aretes que simulan gotas de lluvia en plata con movimiento fluido y natural", precio: 32000, imagen_url: "womenEarring08.jpeg", stock: 36 },
    { id_producto: 15, nombre: "Aretes Vintage Coral", descripcion: "Aretes de estilo vintage en tonos coral que combinan nostalgia con elegancia contemporánea", precio: 30000, imagen_url: "womenEarring09.jpeg", stock: 32 },
    { id_producto: 16, nombre: "Aretes Esfera Dorada", descripcion: "Aretes esféricos con acabado dorado que aportan volumen y sofisticación al rostro", precio: 29000, imagen_url: "womenEarring10.jpeg", stock: 44 },
    { id_producto: 17, nombre: "Aretes Minimal Oro", descripcion: "Aretes de líneas minimalistas en oro que complementan cualquier estilo con discreta elegancia", precio: 26000, imagen_url: "womenEarring11.jpeg", stock: 52 },
    { id_producto: 18, nombre: "Aretes Fantasía Azul", descripcion: "Aretes en tonos azul fantasía con detalles que evocan la profundidad del mar", precio: 31000, imagen_url: "womenEarring12.jpeg", stock: 29 },
    { id_producto: 19, nombre: "Aretes Encanto Natural", descripcion: "Aretes con elementos naturales que conectan con la esencia orgánica y auténtica", precio: 27000, imagen_url: "womenEarring13.jpeg", stock: 46 },
    { id_producto: 20, nombre: "Aretes Fiesta de Color", descripcion: "Vibrantes aretes multicolor perfectos para eventos especiales y celebraciones", precio: 34000, imagen_url: "womenEarring14.jpeg", stock: 31 }
];
exports.productosCompletos = productosCompletos;
async function insertarProductosCompletos() {
    try {
        console.log("🛍️ INSERTANDO CATÁLOGO COMPLETO DE PRODUCTOS");
        console.log("==============================================");
        let productosInsertados = 0;
        let productosActualizados = 0;
        let errores = 0;
        for (const producto of productosCompletos) {
            try {
                // Intentar insertar el producto
                await db_1.db.query(`INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen_url, stock, fecha_creacion) 
           VALUES (?, ?, ?, ?, ?, ?, NOW())`, [
                    producto.id_producto,
                    producto.nombre,
                    producto.descripcion,
                    producto.precio,
                    producto.imagen_url,
                    producto.stock
                ]);
                console.log(`✅ Insertado: ${producto.nombre} (ID: ${producto.id_producto})`);
                productosInsertados++;
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    // Si ya existe, actualizarlo
                    try {
                        await db_1.db.query(`UPDATE producto 
               SET nombre = ?, descripcion = ?, precio = ?, imagen_url = ?, stock = ?
               WHERE id_producto = ?`, [
                            producto.nombre,
                            producto.descripcion,
                            producto.precio,
                            producto.imagen_url,
                            producto.stock,
                            producto.id_producto
                        ]);
                        console.log(`🔄 Actualizado: ${producto.nombre} (ID: ${producto.id_producto})`);
                        productosActualizados++;
                    }
                    catch (updateError) {
                        console.log(`❌ Error actualizando ${producto.nombre}:`, updateError);
                        errores++;
                    }
                }
                else {
                    console.log(`❌ Error insertando ${producto.nombre}:`, error.message);
                    errores++;
                }
            }
        }
        // Estadísticas finales
        console.log("\n📊 RESUMEN DE INSERCIÓN:");
        console.log(`✅ Productos insertados: ${productosInsertados}`);
        console.log(`🔄 Productos actualizados: ${productosActualizados}`);
        console.log(`❌ Errores: ${errores}`);
        console.log(`📦 Total procesados: ${productosCompletos.length}`);
        // Verificar total en la base de datos
        const [totalResult] = await db_1.db.query("SELECT COUNT(*) as total FROM producto");
        const totalEnBD = totalResult[0].total;
        console.log(`🗄️ Total en base de datos: ${totalEnBD}`);
        // Mostrar resumen por categorías de precio
        console.log("\n💰 RESUMEN POR CATEGORÍAS DE PRECIO:");
        const [categorias] = await db_1.db.query(`
      SELECT 
        CASE 
          WHEN precio < 25000 THEN 'Económico (< $25,000)'
          WHEN precio BETWEEN 25000 AND 30000 THEN 'Medio ($25,000 - $30,000)'
          WHEN precio > 30000 THEN 'Premium (> $30,000)'
        END AS categoria_precio,
        COUNT(*) as cantidad,
        MIN(precio) as precio_minimo,
        MAX(precio) as precio_maximo,
        ROUND(AVG(precio), 0) as precio_promedio
      FROM producto 
      GROUP BY 
        CASE 
          WHEN precio < 25000 THEN 'Económico (< $25,000)'
          WHEN precio BETWEEN 25000 AND 30000 THEN 'Medio ($25,000 - $30,000)'
          WHEN precio > 30000 THEN 'Premium (> $30,000)'
        END
      ORDER BY precio_minimo
    `);
        console.table(categorias);
        // Mostrar algunos productos de ejemplo
        console.log("\n🎯 PRODUCTOS DE EJEMPLO:");
        const [ejemplos] = await db_1.db.query(`
      SELECT id_producto, nombre, precio, stock 
      FROM producto 
      ORDER BY precio DESC 
      LIMIT 5
    `);
        console.table(ejemplos);
        console.log("\n✅ ¡PROCESO COMPLETADO EXITOSAMENTE!");
    }
    catch (error) {
        console.error("❌ Error general en la inserción:", error);
    }
    finally {
        process.exit(0);
    }
}
// Ejecutar solo si se llama directamente
if (require.main === module) {
    insertarProductosCompletos();
}
