import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

class DeleteProductService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(id: number): Promise<void> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    await this.productsRepository.delete(product.id);
  }
}

export default DeleteProductService;
