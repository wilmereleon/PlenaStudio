// src/services/product.service.ts
import productRepository from "../repositories/product.repository";

const getAllProducts = async () => {
  return await productRepository.findAll();
};

export default { getAllProducts };