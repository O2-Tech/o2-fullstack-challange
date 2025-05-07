import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "../models/db";
import { products, stockMovements } from "../models/schema";
import { stockMovementSchema } from "../models/validations";

export const stockMovementController = new Elysia({
  prefix: "/stock-movements",
})
  .get("/", async () => {
    try {
      const allMovements = await db.select().from(stockMovements);
      return allMovements;
    } catch (error: any) {
      throw new Error(`Erro ao buscar movimentações: ${error.message}`);
    }
  })

  .get("/:id", async ({ params }) => {
    try {
      if (!params.id || isNaN(Number(params.id))) {
        throw new Error("ID inválido");
      }

      const movementId = Number(params.id);
      const movement = await db
        .select()
        .from(stockMovements)
        .where(eq(stockMovements.id, movementId))
        .limit(1);

      if (!movement.length) {
        throw new Error("Movimentação não encontrada");
      }

      return movement[0];
    } catch (error: any) {
      throw new Error(`Erro ao buscar movimentação: ${error.message}`);
    }
  })

  .post("/", async ({ body }) => {
    try {
      const validatedData = stockMovementSchema.safeParse(body);

      if (!validatedData.success) {
        throw new Error(`Erro de validação: ${validatedData.error.message}`);
      }

      return await db.transaction(async (tx) => {
        const newMovement = await tx
          .insert(stockMovements)
          .values(validatedData.data)
          .returning();

        const product = await tx
          .select()
          .from(products)
          .where(eq(products.id, validatedData.data.productId))
          .limit(1);

        if (!product.length) {
          throw new Error("Produto não encontrado");
        }

        const currentQuantity = product[0].quantity;
        const newQuantity =
          validatedData.data.type === "entrada"
            ? currentQuantity + validatedData.data.quantity
            : currentQuantity - validatedData.data.quantity;

        if (newQuantity < 0) {
          throw new Error("Quantidade insuficiente em estoque");
        }

        await tx
          .update(products)
          .set({ quantity: newQuantity })
          .where(eq(products.id, validatedData.data.productId));

        return newMovement[0];
      });
    } catch (error: any) {
      throw new Error(`Erro ao criar movimentação: ${error.message}`);
    }
  });
