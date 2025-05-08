import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "../models/db";
import { products, stockMovements } from "../models/schema";
import { stockMovementValidationSchema } from "../models/validations";

export const stockMovementController = new Elysia({
  prefix: "/stock-movements",
})
  .get("/", async () => {
    try {
      const movements = await db
        .select({
          id: stockMovements.id,
          productId: stockMovements.productId,
          quantity: stockMovements.quantity,
          type: stockMovements.type,
          reason: stockMovements.reason,
          createdAt: stockMovements.createdAt,
          productName: products.name,
        })
        .from(stockMovements)
        .leftJoin(products, eq(stockMovements.productId, products.id))
        .orderBy(stockMovements.createdAt);

      return { success: true, data: movements };
    } catch (error) {
      return { success: false, error: "Erro ao buscar movimentações" };
    }
  })
  .post(
    "/",
    async ({ body }) => {
      try {
        return await db.transaction(async (tx) => {
          const product = await tx
            .select()
            .from(products)
            .where(eq(products.id, body.productId))
            .limit(1);

          if (!product.length) {
            return { success: false, error: "Produto não encontrado" };
          }

          const currentQuantity = product[0].quantity;
          const movement = body.type === "IN" ? body.quantity : -body.quantity;
          const newQuantity = currentQuantity + movement;

          if (newQuantity < 0) {
            return {
              success: false,
              error: "Quantidade insuficiente em estoque",
            };
          }

          await tx
            .update(products)
            .set({
              quantity: newQuantity,
              updatedAt: new Date(),
            })
            .where(eq(products.id, body.productId));

          const newMovement = await tx
            .insert(stockMovements)
            .values({
              ...body,
              createdAt: new Date(),
            })
            .returning();

          return {
            success: true,
            data: {
              movement: newMovement[0],
              newQuantity,
            },
          };
        });
      } catch (error) {
        return { success: false, error: "Erro ao registrar movimentação" };
      }
    },
    {
      body: stockMovementValidationSchema,
    }
  )
  .get("/:id", async ({ params: { id } }) => {
    try {
      const movement = await db
        .select({
          id: stockMovements.id,
          productId: stockMovements.productId,
          quantity: stockMovements.quantity,
          type: stockMovements.type,
          reason: stockMovements.reason,
          createdAt: stockMovements.createdAt,
          productName: products.name,
        })
        .from(stockMovements)
        .leftJoin(products, eq(stockMovements.productId, products.id))
        .where(eq(stockMovements.id, parseInt(id)))
        .limit(1);

      if (!movement.length) {
        return { success: false, error: "Movimentação não encontrada" };
      }

      return { success: true, data: movement[0] };
    } catch (error) {
      return { success: false, error: "Erro ao buscar movimentação" };
    }
  });
