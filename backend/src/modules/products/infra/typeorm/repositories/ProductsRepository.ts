import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Products from '../entities/Products.entity';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Products>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Products);
  }
}
