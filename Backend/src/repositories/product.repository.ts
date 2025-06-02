// src/repositories/product.repository.ts
import { Product } from "../models/product.model";
import db from "../db"; // tu conexión a MySQL

const findAll = async (): Promise<Product[]> => {
  const [rows] = await db.query("SELECT * FROM product");
  return rows as Product[];
};

export default { findAll };