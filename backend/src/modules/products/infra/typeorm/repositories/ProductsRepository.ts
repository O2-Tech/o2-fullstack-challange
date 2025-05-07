import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Products from '../entities/Products.entity';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Products>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Products);
  }

  public async findAll(): Promise<Products[]> {
    return await this.ormRepository.find({
      relations: ['stock_movements', 'sale_items'],
    });
  }

  public async findOne(id: number): Promise<Products | null> {
    return await this.ormRepository.findOne({
      where: { id },
      relations: ['stock_movements', 'sale_items'],
    });
  }

  public async create(data: ICreateProduct): Promise<Products> {
    const product = this.ormRepository.create(data);
    return await this.ormRepository.save(product);
  }

  public async update(data: IUpdateProduct): Promise<Products | null> {
    const product = await this.findOne(data.id);
    if (!product) return null;

    Object.assign(product, data);
    return await this.ormRepository.save(product);
  }

  public async save(product: Products): Promise<Products> {
    return await this.ormRepository.save(product);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
