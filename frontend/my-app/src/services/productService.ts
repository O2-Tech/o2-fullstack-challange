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

class ProductService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      console.error("Erro na requisição:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });

      // Se tivermos um erro do servidor, tentamos pegar a mensagem
      try {
        const errorData = await response.json();
        console.error("Dados do erro:", errorData);
        throw new Error(errorData.message || "Erro na requisição");
      } catch (e) {
        // Se não conseguirmos parsear o erro, verificamos o status
        if (response.status === 0 || !response.status) {
          throw new Error(
            "Erro de conexão com o servidor. Verifique se o backend está rodando."
          );
        } else if (response.status === 404) {
          throw new Error("Recurso não encontrado");
        } else if (response.status === 500) {
          throw new Error("Erro interno do servidor");
        } else if (response.status === 403 || response.status === 401) {
          throw new Error("Não autorizado");
        }
        throw new Error(
          `Erro ${response.status}: ${response.statusText || "Desconhecido"}`
        );
      }
    }

    try {
      return await response.json();
    } catch (e) {
      console.error("Erro ao parsear resposta:", e);
      throw new Error("Erro ao processar resposta do servidor");
    }
  }

  async listProducts(): Promise<Product[]> {
    console.log("Buscando produtos...");
    try {
      const response = await fetch(API_ENDPOINTS.products.list, {
        method: "GET",
        headers: defaultHeaders,
      });
      console.log("Resposta recebida:", response.status);
      return this.handleResponse<Product[]>(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(API_ENDPOINTS.products.detail(id), {
        method: "GET",
        headers: defaultHeaders,
      });
      return this.handleResponse<Product>(response);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  }

  async createProduct(product: ProductInput): Promise<Product> {
    try {
      const response = await fetch(API_ENDPOINTS.products.create, {
        method: "POST",
        headers: defaultHeaders,

        body: JSON.stringify(product),
      });
      return this.handleResponse<Product>(response);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  }

  async updateProduct(id: number, product: ProductInput): Promise<Product> {
    try {
      const response = await fetch(API_ENDPOINTS.products.update(id), {
        method: "PUT",
        headers: defaultHeaders,
        body: JSON.stringify(product),
      });
      return this.handleResponse<Product>(response);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.products.delete(id), {
        method: "DELETE",
        headers: defaultHeaders,
        credentials: "include",
      });
      return this.handleResponse<void>(response);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  }
}

const listAllProductsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    const response = await fetch(API_ENDPOINTS.products.list, {
      method: "GET",
      headers: defaultHeaders,
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  },
});

export const productService = new ProductService();
