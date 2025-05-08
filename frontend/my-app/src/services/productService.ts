import { queryOptions } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../config/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type ProductInput = Omit<Product, "id">;

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const listProductsOptions = queryOptions<Product[]>({
  queryKey: ["products"],
  queryFn: async () => {
    console.log("Buscando produtos com queryOptions...");
    try {
      const response = await fetch(API_ENDPOINTS.products.list, {
        method: "GET",
        headers: defaultHeaders,
      });
      console.log("Resposta recebida (listProducts):", response.status);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar produtos (listProducts):", error);
      throw error;
    }
  },
});

export const productOptions = (id: number) =>
  queryOptions<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      try {
        const response = await fetch(API_ENDPOINTS.products.detail(id), {
          method: "GET",
          headers: defaultHeaders,
        });
        return await response.json();
      } catch (error) {
        console.error(`Erro ao buscar produto ${id}:`, error);
        throw error;
      }
    },
  });

export const createProductFn = async (
  product: ProductInput
): Promise<Product> => {
  try {
    const response = await fetch(API_ENDPOINTS.products.create, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

export const updateProductFn = async ({
  id,
  product,
}: {
  id: number;
  product: ProductInput;
}): Promise<Product> => {
  try {
    const response = await fetch(API_ENDPOINTS.products.update(id), {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(product),
    });
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    throw error;
  }
};

export const deleteProductFn = async (id: number): Promise<void> => {
  try {
    const response = await fetch(API_ENDPOINTS.products.delete(id), {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(`Erro ao deletar produto ${id}:`, error);
    throw error;
  }
};
