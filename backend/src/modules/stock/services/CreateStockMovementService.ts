import { IStockRepository } from '../domain/repositories/IStockRepository';
import StockMovementRepository from '../infra/typeorm/repositories/StockMovementRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Products.entity';

interface IRequest {
  product_id: number;
  type: 'in' | 'out';
  quantity: number;
}

class CreateStockMovementService {
  private stockRepository: IStockRepository;
  private productsRepository: IProductsRepository;

  constructor() {
    this.stockRepository = new StockMovementRepository();
    this.productsRepository = new ProductsRepository();
  }

  public async execute({
    product_id,
    type,
    quantity,
  }: IRequest): Promise<void> {
    const product = await this.productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    if (type === 'out' && product.available_quantity < quantity) {
      throw new AppError('Not enough stock available!', 400);
    }

    await this.stockRepository.executeInTransaction(async entityManager => {
      await this.stockRepository.create(
        { product_id, type, quantity },
        entityManager,
      );

      const updatedQuantity =
        type === 'in'
          ? product.available_quantity + quantity
          : product.available_quantity - quantity;

      const productRepositoryInTransaction =
        entityManager.getRepository(Product);
      await productRepositoryInTransaction.update(
        { id: product_id },
        { available_quantity: updatedQuantity },
      );
    });
  }
}

export default CreateStockMovementService;
