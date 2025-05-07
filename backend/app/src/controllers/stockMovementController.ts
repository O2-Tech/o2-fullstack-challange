import { Elysia } from "elysia";
import { db } from "../models/db";
import { stockMovements, products } from "../models/schema";
import { eq } from "drizzle-orm";
import {
  stockMovementSchema,
  type StockMovementInput,
} from "../models/validations";

export const stockMovementController = new Elysia({
  prefix: "/stock-movements",
})
  .get("/", async () => {
    const allMovements = await db.select().from(stockMovements);
    return allMovements;
  })

  .get("/:id", async ({ params: { id } }) => {
    const movement = await db
      .select()
      .from(stockMovements)
      .where(eq(stockMovements.id, Number(id)))
      .limit(1);

    if (!movement.length) {
      throw new Error("Movimentação não encontrada");
    }

    return movement[0];
  })

  .post("/", async ({ body }) => {
    const validatedData = stockMovementSchema.parse(body) as StockMovementInput;

    return await db.transaction(async (tx) => {
      const newMovement = await tx
        .insert(stockMovements)
        .values(validatedData)
        .returning();

      const product = await tx
        .select()
        .from(products)
        .where(eq(products.id, validatedData.productId))
        .limit(1);

      if (!product.length) {
        throw new Error("Produto não encontrado");
      }

      const currentQuantity = product[0].quantity;
      const newQuantity =
        validatedData.type === "entrada"
          ? currentQuantity + validatedData.quantity
          : currentQuantity - validatedData.quantity;

      if (newQuantity < 0) {
        throw new Error("Quantidade insuficiente em estoque");
      }

      await tx
        .update(products)
        .set({ quantity: newQuantity })
        .where(eq(products.id, validatedData.productId));

      return newMovement[0];
    });
  });
