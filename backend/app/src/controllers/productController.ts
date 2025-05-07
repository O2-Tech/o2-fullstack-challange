import { Elysia, t } from "elysia";
import { db } from "../models/db";
import { products } from "../models/schema";
import { eq } from "drizzle-orm";
import { productSchema, type ProductInput } from "../models/validations";

interface ProductParams {
  id: string;
}

interface ProductBody extends ProductInput {}

export const productController = new Elysia({ prefix: "/products" })
  .get("/", async () => {
    const allProducts = await db.select().from(products);
    return allProducts;
  })

  .get(
    "/:id",
    {
      params: t.Object({
        id: t.String(),
      }),
    },
    async ({ params: { id } }: { params: ProductParams }) => {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, Number(id)))
        .limit(1);

      if (!product.length) {
        throw new Error("Produto não encontrado");
      }

      return product[0];
    }
  )

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

  .put(
    "/:id",
    {
      params: t.Object({
        id: t.String(),
      }),
    },
    async ({
      params: { id },
      body,
    }: {
      params: ProductParams;
      body: ProductBody;
    }) => {
      const validatedData = productSchema.parse(body) as ProductInput;
      const updatedProduct = await db
        .update(products)
        .set(validatedData)
        .where(eq(products.id, Number(id)))
        .returning();

      if (!updatedProduct.length) {
        throw new Error("Produto não encontrado");
      }

      return updatedProduct[0];
    }
  )

  .delete(
    "/:id",
    {
      params: t.Object({
        id: t.String(),
      }),
    },
    async ({ params: { id } }: { params: ProductParams }) => {
      const deletedProduct = await db
        .delete(products)
        .where(eq(products.id, Number(id)))
        .returning();

      if (!deletedProduct.length) {
        throw new Error("Produto não encontrado");
      }

      return { message: "Produto deletado com sucesso" };
    }
  );
