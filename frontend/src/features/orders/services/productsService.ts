// src/features/orders/services/productsService.ts
import { api } from "../../../core/api";
import { Product } from "../types/products";

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products/");
    return response.data;
  },
};
