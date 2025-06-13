import { Request, Response } from "express";

/**
 * Controlador para el catálogo de productos.
 */
export const catalogController = {
  getAllProducts(req: Request, res: Response) {
    // Simulación de productos
    res.json([
      // { id: 1, nombre: "Producto 1", ... }
    ]);
  },

  getProductById(req: Request, res: Response) {
    const { id } = req.params;
    // Buscar producto por id
    res.json({ id, nombre: "Producto de ejemplo" });
  }
};