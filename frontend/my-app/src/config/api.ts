// Porta padrão do Bun/Elysia
export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  products: {
    list: `${API_BASE_URL}/products`,
    detail: (id: number) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id: number) => `${API_BASE_URL}/products/${id}`,
    delete: (id: number) => `${API_BASE_URL}/products/${id}`,
  },
  stockMovements: {
    list: `${API_BASE_URL}/stock-movements`,
    create: `${API_BASE_URL}/stock-movements`,
  },
  reports: {
    stockValue: `${API_BASE_URL}/reports/stock-value`,
    lowStock: `${API_BASE_URL}/reports/low-stock`,
  },
} as const;
