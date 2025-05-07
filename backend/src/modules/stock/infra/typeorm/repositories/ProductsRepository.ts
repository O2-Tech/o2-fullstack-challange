import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { StockMovement } from '../entities/StockMovement.entity';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = dataSource.getRepository(StockMovement);
  }
}
