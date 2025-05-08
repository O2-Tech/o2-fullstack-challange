import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { db } from '../models/db';
import { products, stockMovements } from '../models/schema';
import { productValidationSchema } from '../models/validations';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const productController = new Elysia({ prefix: '/products' })
  .get('/', async () => {
    try {
      const allProducts = await db.select().from(products);
      await sleep(1000);
      return allProducts.map((product) => ({
        ...product,
        price: parseFloat(product.price),
      }));
    } catch (error) {
      return { error: 'Erro ao buscar produtos' };
    }
  })

  .get('/:id', async ({ params: { id } }) => {
    try {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(id)));
      if (!product.length) return { error: 'Produto não encontrado' };
      return { data: product[0] };
    } catch (error) {
      return { error: 'Erro ao buscar produto' };
    }
  })

  .post(
    '/',
    async ({ body }) => {
      try {
        const newProduct = await db
          .insert(products)
          .values({
            ...body,
            price: body.price.toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();
        return { success: true, data: newProduct[0] };
      } catch (error) {
        return { success: false, error: 'Erro ao criar produto' };
      }
    },
    {
      body: productValidationSchema,
    },
  )

  .put(
    '/:id',
    async ({ params: { id }, body }) => {
      try {
        const updatedProduct = await db
          .update(products)
          .set({
            ...body,
            price: body.price.toString(),
            updatedAt: new Date(),
          })
          .where(eq(products.id, parseInt(id)))
          .returning();
        if (!updatedProduct.length)
          return { success: false, error: 'Produto não encontrado' };
        return { success: true, data: updatedProduct[0] };
      } catch (error) {
        return { success: false, error: 'Erro ao atualizar produto' };
      }
    },
    {
      body: productValidationSchema,
    },
  )

  .delete('/:id', async ({ params: { id } }) => {
    try {
      return await db.transaction(async (tx) => {
        await tx
          .delete(stockMovements)
          .where(eq(stockMovements.productId, parseInt(id)));

        const deletedProduct = await tx
          .delete(products)
          .where(eq(products.id, parseInt(id)))
          .returning();

        if (!deletedProduct.length) {
          return { success: false, error: 'Produto não encontrado' };
        }

        return {
          success: true,
          data: {
            message: 'Produto e suas movimentações deletados com sucesso',
            deletedProduct: deletedProduct[0],
          },
        };
      });
    } catch (error) {
      return { success: false, error: 'Erro ao deletar produto' };
    }
  });
