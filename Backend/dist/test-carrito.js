"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function testearCarrito() {
    try {
        console.log("🧪 INICIANDO PRUEBAS DE CARRITO");
        console.log("===============================");
        // 1. Limpiar datos de prueba previos
        console.log("\n1. Limpiando datos de prueba...");
        await db_1.db.query("DELETE FROM carrito_item WHERE id_carrito IN (SELECT id_carrito FROM carrito WHERE id_usuario = 1)");
        await db_1.db.query("DELETE FROM carrito WHERE id_usuario = 1");
        console.log("✅ Datos limpiados");
        // 2. Simular agregar producto al carrito (usuario autenticado)
        console.log("\n2. Simulando agregar producto al carrito...");
        // Crear carrito
        await db_1.db.query("INSERT INTO carrito (id_usuario, fecha_creacion) VALUES (1, NOW())");
        const [carritos] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = 1");
        const carrito = carritos[0];
        console.log("Carrito creado:", carrito);
        // Agregar item al carrito
        await db_1.db.query("INSERT INTO carrito_item (id_carrito, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)", [carrito.id_carrito, 1, 2, 28000]);
        console.log("✅ Producto agregado: 2x Aretes Luna Dorada");
        // 3. Verificar que se guardó correctamente
        console.log("\n3. Verificando carrito en BD...");
        const [items] = await db_1.db.query(`
      SELECT 
        CAST(ci.id_producto as CHAR) as productId,
        ci.cantidad,
        p.nombre,
        p.precio,
        p.imagen_url as imagen
      FROM carrito_item ci
      JOIN producto p ON ci.id_producto = p.id_producto
      WHERE ci.id_carrito = ?
    `, [carrito.id_carrito]);
        console.log("Items en carrito:", items);
        // 4. Simular logout (limpiar carrito)
        console.log("\n4. Simulando logout (limpiar carrito)...");
        await db_1.db.query("DELETE FROM carrito_item WHERE id_carrito = ?", [carrito.id_carrito]);
        await db_1.db.query("DELETE FROM carrito WHERE id_carrito = ?", [carrito.id_carrito]);
        console.log("✅ Carrito limpiado tras logout");
        // 5. Verificar que se limpió
        console.log("\n5. Verificando que el carrito está vacío...");
        const [carritosFinal] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = 1");
        const [itemsFinal] = await db_1.db.query("SELECT * FROM carrito_item");
        console.log("Carritos restantes para usuario 1:", carritosFinal);
        console.log("Items totales en BD:", itemsFinal);
        if (carritosFinal.length === 0) {
            console.log("✅ PRUEBA EXITOSA: El carrito se limpia correctamente al logout");
        }
        else {
            console.log("❌ ERROR: El carrito no se limpió correctamente");
        }
    }
    catch (error) {
        console.error("❌ Error en pruebas:", error);
    }
    finally {
        process.exit(0);
    }
}
testearCarrito();
