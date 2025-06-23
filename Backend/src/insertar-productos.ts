import { db } from "./db";

async function insertarProductos() {
  try {
    console.log("🛍️ Insertando productos de prueba...");
    
    const productos = [
      { id_producto: 1, nombre: "Aretes Luna Dorada", precio: 28000, imagen_url: "earring01.jpeg" },
      { id_producto: 2, nombre: "Aretes Flor de Cristal", precio: 32000, imagen_url: "earring04.jpeg" },
      { id_producto: 3, nombre: "Anillo Aurora Plateado", precio: 24000, imagen_url: "ring01.jpeg" },
      { id_producto: 4, nombre: "Anillo Esencia Minimalista", precio: 22000, imagen_url: "ring02.jpeg" },
      { id_producto: 5, nombre: "Collar Estrella Brillante", precio: 45000, imagen_url: "necklace01.jpeg" },
      { id_producto: 6, nombre: "Collar Luna Creciente", precio: 38000, imagen_url: "necklace02.jpeg" },
      { id_producto: 7, nombre: "Pulsera Infinito Dorado", precio: 35000, imagen_url: "bracelet01.jpeg" },
      { id_producto: 8, nombre: "Pulsera Perlas Elegantes", precio: 40000, imagen_url: "bracelet02.jpeg" },
      { id_producto: 9, nombre: "Anillo Vintage Rosa", precio: 28000, imagen_url: "girlRing01.jpeg" },
      { id_producto: 10, nombre: "Aretes Geométricos", precio: 26000, imagen_url: "womenEarring01.jpeg" }
    ];
      for (const producto of productos) {
      try {
        await db.query(
          "INSERT INTO producto (id_producto, nombre, precio, imagen_url, descripcion, stock) VALUES (?, ?, ?, ?, ?, ?)",
          [producto.id_producto, producto.nombre, producto.precio, producto.imagen_url, producto.nombre, 100]
        );
        console.log(`✅ Producto insertado: ${producto.nombre}`);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️ Producto ya existe: ${producto.nombre}`);
        } else {
          console.log(`❌ Error insertando ${producto.nombre}:`, error.message);
        }
      }
    }
    
    // Verificar productos insertados
    const [productos_insertados] = await db.query("SELECT COUNT(*) as total FROM producto");
    console.log(`\n📊 Total de productos en BD: ${(productos_insertados as any[])[0].total}`);
    
  } catch (error) {
    console.error("❌ Error general:", error);
  } finally {
    process.exit(0);
  }
}

insertarProductos();
