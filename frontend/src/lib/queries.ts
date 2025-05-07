import { api } from "./api";
import {
  Product,
  ProductSchema,
  StockMovement,
  StockMovementSchema,
  StockReport,
  StockReportSchema,
} from "./types";

// Products
export const getProducts = async () => {
  const response = await api.get("products").json();
  return ProductSchema.array().parse(response);
};

export const getProduct = async (id: number) => {
  const response = await api.get(`products/${id}`).json();
  return ProductSchema.parse(response);
};

export const createProduct = async (
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("products", { json: product }).json();
  return ProductSchema.parse(response);
};

export const updateProduct = async (
  id: number,
  product: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await api.put(`products/${id}`, { json: product }).json();
  return ProductSchema.parse(response);
};

export const deleteProduct = async (id: number) => {
  await api.delete(`products/${id}`);
};

// Stock Movements
export const getStockMovements = async () => {
  const response = await api.get("stock-movements").json();
  return StockMovementSchema.array().parse(response);
};

export const createStockMovement = async (
  movement: Omit<StockMovement, "id" | "createdAt">
) => {
  const response = await api.post("stock-movements", { json: movement }).json();
  return StockMovementSchema.parse(response);
};

// Reports
export const getStockReport = async () => {
  const response = await api.get("reports/stock").json();
  return StockReportSchema.parse(response);
};

export const getMovementsByPeriod = async (
  startDate: string,
  endDate: string
) => {
  const response = await api
    .get(`reports/movements?startDate=${startDate}&endDate=${endDate}`)
    .json();
  return StockMovementSchema.array().parse(response);
};
