import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '../domain/models/IProducts';
import AppError from '@shared/errors/AppError';

class ShowProductService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(id: number): Promise<IProducts | null> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
