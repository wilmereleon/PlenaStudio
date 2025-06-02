// src/api/catalog.controller.ts
import { Request, Response } from "express";
import productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};