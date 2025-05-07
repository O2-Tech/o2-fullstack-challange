import { Elysia } from "elysia";
import { db } from "../models/db";
import { products } from "../models/schema";
import { eq } from "drizzle-orm";
import { productSchema, type ProductInput } from "../models/validations";

export const productController = new Elysia({ prefix: "/products" })
  .get("/", async () => {
    const allProducts = await db.select().from(products);
    return allProducts;
  })

  .get("/:id", async ({ params: { id } }) => {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)))
      .limit(1);

    if (!product.length) {
      throw new Error("Produto não encontrado");
    }

    return product[0];
  })

  .post("/", async ({ body }) => {
    const validatedData = productSchema.parse(body) as ProductInput;
    const newProduct = await db
      .insert(products)
      .values(validatedData)
      .returning();
    return newProduct[0];
  })

  .put("/:id", async ({ params: { id }, body }) => {
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
  })

  .delete("/:id", async ({ params: { id } }) => {
    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, Number(id)))
      .returning();

    if (!deletedProduct.length) {
      throw new Error("Produto não encontrado");
    }

    return { message: "Produto deletado com sucesso" };
  });
