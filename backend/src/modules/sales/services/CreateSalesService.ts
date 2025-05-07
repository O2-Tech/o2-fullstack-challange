import { ISalesRepository } from '../domain/repositories/ISalesRepository';
import SalesRepository from '../infra/typeorm/repositories/SalesRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Products.entity';
import { SaleItem } from '../infra/typeorm/entities/SalesItem.entity';
import { Sales } from '../infra/typeorm/entities/Sales.entity';
import { ICreateSales } from '../domain/models/ICreateSale';

class CreateSaleService {
  private salesRepository: ISalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute({ sale_date, sale_items }: ICreateSales): Promise<void> {
    await this.salesRepository.executeInTransaction(async entityManager => {
      let total_value = 0;
      const productsToUpdate: Product[] = [];
      const saleItemsToCreate: Omit<
        SaleItem,
        'id' | 'sale' | 'sale_id' | 'product'
      >[] = [];

      const productRepository = entityManager.getRepository(Product);
      const saleRepository = entityManager.getRepository(Sales);
      const saleItemRepository = entityManager.getRepository(SaleItem);

      for (const item of sale_items) {
        const product = await productRepository.findOneBy({
          id: item.product_id,
        });

        if (!product) {
          throw new AppError(`Product ID ${item.product_id} not found`, 404);
        }

        if (product.available_quantity < item.quantity) {
          throw new AppError(
            `Insufficient stock for product ${product.name}`,
            400,
          );
        }

        total_value += item.quantity * item.unit_price;
        product.available_quantity -= item.quantity;
        productsToUpdate.push(product);

        saleItemsToCreate.push({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        });
      }

      await productRepository.save(productsToUpdate);

      const sale = await saleRepository.save({
        sale_date,
        total_value,
      });

      const saleItemsWithSaleId = saleItemsToCreate.map(item => ({
        ...item,
        sale_id: sale.id,
      }));

      await saleItemRepository.save(saleItemsWithSaleId);
    });
  }
}

export default CreateSaleService;
