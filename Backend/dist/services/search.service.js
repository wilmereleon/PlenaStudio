"use strict";
/**
 * Servicio para búsqueda de productos en el catálogo.
 * Esta versión usa un catálogo simulado en memoria.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = void 0;
class SearchService {
    constructor() {
        this.products = [
            // Ejemplo de productos simulados
            { id: "1", nombre: "Arete Dorado", descripcion: "Arete elegante", categoria: "Aretes", precio: 50000, stock: 10 },
            { id: "2", nombre: "Anillo Plata", descripcion: "Anillo de plata fina", categoria: "Anillos", precio: 80000, stock: 5 },
            // ...agrega más productos según tu catálogo
        ];
    }
    /**
     * Busca productos por nombre, descripción o categoría.
     * @param query Texto de búsqueda.
     * @returns Lista de productos que coinciden.
     */
    search(query) {
        const q = query.toLowerCase();
        return this.products.filter(p => p.nombre.toLowerCase().includes(q) ||
            p.descripcion.toLowerCase().includes(q) ||
            p.categoria.toLowerCase().includes(q));
    }
    /**
     * Devuelve todos los productos (útil para búsqueda avanzada).
     */
    getAll() {
        return this.products;
    }
}
exports.searchService = new SearchService();
