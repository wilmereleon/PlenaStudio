import { Request, Response } from "express";

/**
 * Controlador para búsqueda de productos.
 */
export const searchController = {
  search(req: Request, res: Response) {
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