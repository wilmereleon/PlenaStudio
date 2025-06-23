"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogController = void 0;
/**
 * Controlador para el catálogo de productos.
 */
exports.catalogController = {
    getAllProducts(req, res) {
        // Simulación de productos
        res.json([
        // { id: 1, nombre: "Producto 1", ... }
        ]);
    },
    getProductById(req, res) {
        const { id } = req.params;
        // Buscar producto por id
        res.json({ id, nombre: "Producto de ejemplo" });
    }
};
