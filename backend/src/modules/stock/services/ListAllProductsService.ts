import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

class ListAllProductsService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<null> {
    return null;
  }
}

export default ListAllProductsService;
