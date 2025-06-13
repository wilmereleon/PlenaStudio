/**
 * Servicio para búsqueda de productos en el catálogo.
 * Esta versión usa un catálogo simulado en memoria.
 */

type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
};

class SearchService {
  private products: Product[] = [
    // Ejemplo de productos simulados
    { id: "1", nombre: "Arete Dorado", descripcion: "Arete elegante", categoria: "Aretes", precio: 50000, stock: 10 },
    { id: "2", nombre: "Anillo Plata", descripcion: "Anillo de plata fina", categoria: "Anillos", precio: 80000, stock: 5 },
    // ...agrega más productos según tu catálogo
  ];

  /**
   * Busca productos por nombre, descripción o categoría.
   * @param query Texto de búsqueda.
   * @returns Lista de productos que coinciden.
   */
  search(query: string): Product[] {
    const q = query.toLowerCase();
    return this.products.filter(
      p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
    );
  }

  /**
   * Devuelve todos los productos (útil para búsqueda avanzada).
   */
  getAll(): Product[] {
    return this.products;
  }
}

export const searchService = new SearchService();