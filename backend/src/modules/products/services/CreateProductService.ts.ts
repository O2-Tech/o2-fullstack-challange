import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '@modules/products/domain/models/IProducts';

class CreateProductService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(data: ICreateProduct): Promise<IProducts> {
    return await this.productsRepository.create(data);
  }
}

export default CreateProductService;
