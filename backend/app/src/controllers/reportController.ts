import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { db } from '../models/db';
import { products, stockMovements } from '../models/schema';

export const reportController = new Elysia({ prefix: '/reports' })
  .get('/stock-status', async () => {
    try {
      const stockStatus = await db
        .select({
          id: products.id,
          name: products.name,
          category: products.category,
          quantity: products.quantity,
          price: products.price,
          totalValue: sql<string>`${products.price} * ${products.quantity}`,
          lastMovement: sql<string>`
            (SELECT created_at 
             FROM stock_movements 
             WHERE product_id = ${products.id} 
             ORDER BY created_at DESC 
             LIMIT 1)
          `,
        })
        .from(products)
        .orderBy(products.category, products.name);

      const groupedByCategory = stockStatus.reduce(
        (acc, item) => {
          const category = item.category;
          if (!acc[category]) {
            acc[category] = {
              items: [],
              totalQuantity: 0,
              totalValue: 0,
            };
          }
          acc[category].items.push(item);
          acc[category].totalQuantity += item.quantity;
          acc[category].totalValue += parseFloat(item.totalValue);
          return acc;
        },
        {} as Record<
          string,
          { items: any[]; totalQuantity: number; totalValue: number }
        >,
      );

      return {
        success: true,
        data: {
          categories: groupedByCategory,
          summary: {
            totalProducts: stockStatus.length,
            totalQuantity: stockStatus.reduce(
              (sum, item) => sum + item.quantity,
              0,
            ),
            totalValue: stockStatus.reduce(
              (sum, item) => sum + parseFloat(item.totalValue),
              0,
            ),
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao gerar relatório de status do estoque',
      };
    }
  })
  .get('/movements', async ({ query }) => {
    try {
      const { startDate, endDate, type, category } = query;

      let conditions = sql`1=1`;

      if (startDate) {
        conditions = sql`${conditions} AND stock_movements.created_at >= ${new Date(startDate)}`;
      }
      if (endDate) {
        conditions = sql`${conditions} AND stock_movements.created_at <= ${new Date(endDate)}`;
      }
      if (type) {
        conditions = sql`${conditions} AND stock_movements.type = ${type}`;
      }
      if (category) {
        conditions = sql`${conditions} AND products.category = ${category}`;
      }

      const movements = await db
        .select({
          id: stockMovements.id,
          productId: stockMovements.productId,
          productName: products.name,
          category: products.category,
          quantity: stockMovements.quantity,
          type: stockMovements.type,
          reason: stockMovements.reason,
          createdAt: stockMovements.createdAt,
          price: products.price,
          totalValue: sql<string>`${products.price} * ${stockMovements.quantity}`,
        })
        .from(stockMovements)
        .leftJoin(products, eq(stockMovements.productId, products.id))
        .where(conditions)
        .orderBy(desc(stockMovements.createdAt));

      const groupedByType = movements.reduce(
        (acc, item) => {
          const type = item.type;
          if (!acc[type]) {
            acc[type] = {
              movements: [],
              totalQuantity: 0,
              totalValue: 0,
            };
          }
          acc[type].movements.push(item);
          acc[type].totalQuantity += item.quantity;
          acc[type].totalValue += parseFloat(item.totalValue);
          return acc;
        },
        {} as Record<
          string,
          { movements: any[]; totalQuantity: number; totalValue: number }
        >,
      );

      return {
        success: true,
        data: {
          types: groupedByType,
          summary: {
            totalMovements: movements.length,
            byType: {
              IN: {
                quantity: movements
                  .filter((m) => m.type === 'IN')
                  .reduce((sum, m) => sum + m.quantity, 0),
                value: movements
                  .filter((m) => m.type === 'IN')
                  .reduce((sum, m) => sum + parseFloat(m.totalValue), 0),
              },
              OUT: {
                quantity: movements
                  .filter((m) => m.type === 'OUT')
                  .reduce((sum, m) => sum + m.quantity, 0),
                value: movements
                  .filter((m) => m.type === 'OUT')
                  .reduce((sum, m) => sum + parseFloat(m.totalValue), 0),
              },
            },
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao gerar relatório de movimentações',
      };
    }
  });
