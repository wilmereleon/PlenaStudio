"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = void 0;
/**
 * Controlador para búsqueda de productos.
 */
exports.searchController = {
    search(req, res) {
        const { q } = req.query;
        // Simulación de búsqueda
        res.json({
            results: [
            // { id: 1, nombre: "Producto que coincide", ... }
            ],
            query: q
        });
    }
};
