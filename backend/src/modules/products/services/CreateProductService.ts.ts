import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '../domain/models/IProducts';

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
