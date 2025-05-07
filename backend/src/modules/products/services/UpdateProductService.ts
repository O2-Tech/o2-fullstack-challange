import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '../domain/models/IProducts';
import AppError from '@shared/errors/AppError';

class UpdateProductService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(data: IUpdateProduct): Promise<IProducts | null> {
    const product = await this.productsRepository.findOne(data.id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    return await this.productsRepository.update(data);
  }
}

export default UpdateProductService;
