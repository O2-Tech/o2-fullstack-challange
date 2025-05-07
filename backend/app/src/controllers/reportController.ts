import { Elysia } from "elysia";
import { db } from "../models/db";
import { products, stockMovements } from "../models/schema";
import { eq, sql, desc, and, gte, lte } from "drizzle-orm";
import { z } from "zod";

const dateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const reportController = new Elysia({ prefix: "/reports" })
  // Valor total em estoque
  .get("/total-stock-value", async () => {
    try {
      const result = await db
        .select({
          totalValue: sql<string>`CAST(SUM(quantity * CAST(price AS decimal)) AS TEXT)`,
          totalItems: sql<number>`SUM(quantity)`,
        })
        .from(products);

      return {
        totalValue: Number(result[0].totalValue || 0),
        totalItems: result[0].totalItems || 0,
      };
    } catch (error: any) {
      throw new Error(
        `Erro ao calcular valor total em estoque: ${error.message}`
      );
    }
  })

  // Movimentações por período
  .get("/movements-by-period/:startDate/:endDate", async ({ params }) => {
    try {
      const { startDate, endDate } = params;

      const movements = await db
        .select({
          id: stockMovements.id,
          productId: stockMovements.productId,
          quantity: stockMovements.quantity,
          type: stockMovements.type,
          description: stockMovements.description,
          createdAt: stockMovements.createdAt,
          productName: products.name,
          productPrice: products.price,
        })
        .from(stockMovements)
        .leftJoin(products, eq(stockMovements.productId, products.id))
        .where(
          and(
            gte(stockMovements.createdAt, new Date(startDate)),
            lte(stockMovements.createdAt, new Date(endDate))
          )
        )
        .orderBy(desc(stockMovements.createdAt));

      return {
        startDate,
        endDate,
        total: movements.length,
        movements,
      };
    } catch (error: any) {
      throw new Error(
        `Erro ao buscar movimentações por período: ${error.message}`
      );
    }
  })

  // Produtos mais movimentados
  .get("/most-moved-products", async () => {
    try {
      const result = await db
        .select({
          productId: stockMovements.productId,
          productName: products.name,
          totalMovements: sql<number>`COUNT(${stockMovements.id})`,
          totalQuantity: sql<number>`SUM(CASE WHEN ${stockMovements.type} = 'entrada' THEN ${stockMovements.quantity} ELSE -${stockMovements.quantity} END)`,
        })
        .from(stockMovements)
        .leftJoin(products, eq(stockMovements.productId, products.id))
        .groupBy(stockMovements.productId, products.name)
        .orderBy(desc(sql<number>`COUNT(${stockMovements.id})`))
        .limit(10);

      return result;
    } catch (error: any) {
      throw new Error(
        `Erro ao buscar produtos mais movimentados: ${error.message}`
      );
    }
  });
