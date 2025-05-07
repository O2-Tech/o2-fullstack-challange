import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '@modules/products/domain/models/IProducts';
import AppError from '@shared/errors/AppError';

class ListAllProductsService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<IProducts[]> {
    const products = await this.productsRepository.findAll();

    if (products.length === 0) {
      throw new AppError('There are no products available!', 400);
    }

    return products;
  }
}

export default ListAllProductsService;
