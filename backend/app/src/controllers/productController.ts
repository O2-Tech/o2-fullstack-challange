import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../models/db";
import { products, stockMovements } from "../models/schema";
import { productValidationSchema } from "../models/validations";

export const productController = new Elysia({ prefix: "/products" })
  .get("/", async () => {
    try {
      const allProducts = await db.select().from(products);
      return { success: true, data: allProducts };
    } catch (error) {
      return { success: false, error: "Erro ao buscar produtos" };
    }
  })

  .get("/:id", async ({ params: { id } }) => {
    try {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(id)));
      if (!product.length)
        return { success: false, error: "Produto não encontrado" };
      return { success: true, data: product[0] };
    } catch (error) {
      return { success: false, error: "Erro ao buscar produto" };
    }
  })

  .post(
    "/",
    async ({ body }) => {
      try {
        const newProduct = await db
          .insert(products)
          .values({
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();
        return { success: true, data: newProduct[0] };
      } catch (error) {
        return { success: false, error: "Erro ao criar produto" };
      }
    },
    {
      body: productValidationSchema,
    }
  )

  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        const updatedProduct = await db
          .update(products)
          .set({
            ...body,
            updatedAt: new Date(),
          })
          .where(eq(products.id, parseInt(id)))
          .returning();
        if (!updatedProduct.length)
          return { success: false, error: "Produto não encontrado" };
        return { success: true, data: updatedProduct[0] };
      } catch (error) {
        return { success: false, error: "Erro ao atualizar produto" };
      }
    },
    {
      body: productValidationSchema,
    }
  )

  .delete("/:id", async ({ params: { id } }) => {
    try {
      return await db.transaction(async (tx) => {
        // Primeiro deleta todas as movimentações
        await tx
          .delete(stockMovements)
          .where(eq(stockMovements.productId, parseInt(id)));

        // Depois deleta o produto
        const deletedProduct = await tx
          .delete(products)
          .where(eq(products.id, parseInt(id)))
          .returning();

        if (!deletedProduct.length) {
          return { success: false, error: "Produto não encontrado" };
        }

        return {
          success: true,
          data: {
            message: "Produto e suas movimentações deletados com sucesso",
            deletedProduct: deletedProduct[0],
          },
        };
      });
    } catch (error) {
      return { success: false, error: "Erro ao deletar produto" };
    }
  });
