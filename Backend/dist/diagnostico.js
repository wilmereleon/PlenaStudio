"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function diagnosticoDB() {
    try {
        console.log("🔍 Diagnóstico de Base de Datos");
        console.log("================================");
        // 1. Probar conexión
        console.log("1. Probando conexión...");
        const connection = await db_1.db.getConnection();
        console.log("✅ Conexión exitosa");
        connection.release();
        // 2. Verificar si las tablas existen
        console.log("\n2. Verificando tablas...");
        const [tables] = await db_1.db.query("SHOW TABLES");
        console.log("Tablas encontradas:", tables);
        // 3. Verificar estructura de tabla carrito
        console.log("\n3. Estructura de tabla carrito:");
        try {
            const [carritoSchema] = await db_1.db.query("DESCRIBE carrito");
            console.log(carritoSchema);
        }
        catch (error) {
            console.log("❌ Tabla carrito no encontrada");
        }
        // 4. Verificar estructura de tabla carrito_item
        console.log("\n4. Estructura de tabla carrito_item:");
        try {
            const [carritoItemSchema] = await db_1.db.query("DESCRIBE carrito_item");
            console.log(carritoItemSchema);
        }
        catch (error) {
            console.log("❌ Tabla carrito_item no encontrada");
        }
        // 5. Verificar usuarios existentes
        console.log("\n5. Usuarios existentes:");
        try {
            const [usuarios] = await db_1.db.query("SELECT id_usuario, email FROM usuario LIMIT 5");
            console.log(usuarios);
        }
        catch (error) {
            console.log("❌ Tabla usuario no encontrada");
        }
        // 6. Verificar productos existentes
        console.log("\n6. Productos existentes:");
        try {
            const [productos] = await db_1.db.query("SELECT id_producto, nombre, precio FROM producto LIMIT 5");
            console.log(productos);
        }
        catch (error) {
            console.log("❌ Tabla producto no encontrada");
        }
        // 7. Verificar carritos existentes
        console.log("\n7. Carritos existentes:");
        try {
            const [carritos] = await db_1.db.query("SELECT * FROM carrito");
            console.log(carritos);
        }
        catch (error) {
            console.log("❌ Error al consultar carritos:", error);
        }
        // 8. Verificar items de carrito existentes
        console.log("\n8. Items de carrito existentes:");
        try {
            const [items] = await db_1.db.query("SELECT * FROM carrito_item");
            console.log(items);
        }
        catch (error) {
            console.log("❌ Error al consultar items de carrito:", error);
        }
    }
    catch (error) {
        console.error("❌ Error en diagnóstico:", error);
    }
    finally {
        process.exit(0);
    }
}
diagnosticoDB();
