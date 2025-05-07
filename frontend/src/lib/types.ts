import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const StockMovementSchema = z.object({
  id: z.number(),
  productId: z.number(),
  quantity: z.number(),
  type: z.enum(["IN", "OUT"]),
  date: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const StockReportSchema = z.object({
  totalValue: z.number(),
  totalProducts: z.number(),
  lowStockProducts: z.number(),
  movementsToday: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
export type StockMovement = z.infer<typeof StockMovementSchema>;
export type StockReport = z.infer<typeof StockReportSchema>;
