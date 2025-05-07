import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "../models/db";
import { products, stockMovements } from "../models/schema";
import { productSchema, type ProductInput } from "../models/validations";

export const productController = new Elysia({ prefix: "/products" })
  .get("/", async () => {
    try {
      const allProducts = await db.select().from(products);
      return allProducts;
    } catch (error: any) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
  })

  .get("/:id", async ({ params }) => {
    try {
      if (!params.id || isNaN(Number(params.id))) {
        throw new Error("ID inválido");
      }

      const productId = Number(params.id);
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!product.length) {
        throw new Error("Produto não encontrado");
      }

      return product[0];
    } catch (error: any) {
      throw new Error(`Erro ao buscar produto: ${error.message}`);
    }
  })

  .post("/", async ({ body }) => {
    try {
      const validatedData = productSchema.parse(body) as ProductInput;
      const newProduct = await db
        .insert(products)
        .values(validatedData)
        .returning();
      return newProduct[0];
    } catch (error: any) {
      throw new Error(`Erro ao criar produto: ${error.message}`);
    }
  })

  .put("/:id", async ({ params, body }) => {
    try {
      if (!params.id || isNaN(Number(params.id))) {
        throw new Error("ID inválido");
      }

      const productId = Number(params.id);
      const validatedData = productSchema.parse(body) as ProductInput;
      const updatedProduct = await db
        .update(products)
        .set(validatedData)
        .where(eq(products.id, productId))
        .returning();

      if (!updatedProduct.length) {
        throw new Error("Produto não encontrado");
      }

      return updatedProduct[0];
    } catch (error: any) {
      throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }
  })

  .delete("/:id", async ({ params }) => {
    try {
      if (!params.id || isNaN(Number(params.id))) {
        throw new Error("ID inválido");
      }

      const productId = Number(params.id);

      return await db.transaction(async (tx) => {
        // Verifica se o produto existe
        const product = await tx
          .select()
          .from(products)
          .where(eq(products.id, productId))
          .limit(1);

        if (!product.length) {
          throw new Error("Produto não encontrado");
        }

        // Primeiro deleta todas as movimentações
        await tx
          .delete(stockMovements)
          .where(eq(stockMovements.productId, productId));

        // Depois deleta o produto
        await tx.delete(products).where(eq(products.id, productId));

        return {
          message: "Produto e suas movimentações deletados com sucesso",
          deletedProduct: product[0],
        };
      });
    } catch (error: any) {
      throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
  });
