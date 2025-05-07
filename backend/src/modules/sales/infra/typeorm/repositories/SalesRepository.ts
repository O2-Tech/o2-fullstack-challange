import { Repository, Between, EntityManager } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { SaleItem } from '../entities/SalesItem.entity';
import { ISalesRepository } from '@modules/sales/domain/repositories/ISalesRepository';
import { ISales } from '@modules/sales/domain/models/ISales';
import { Sales } from '../entities/Sales.entity';
import { ICreateSales } from '@modules/sales/domain/models/ICreateSale';

export default class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sales>;
  private saleItemRepository: Repository<SaleItem>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Sales);
    this.saleItemRepository = dataSource.getRepository(SaleItem);
  }

  public async create(
    data: ICreateSales,
    entityManager?: EntityManager,
  ): Promise<ISales> {
    const repository = entityManager
      ? entityManager.getRepository(Sales)
      : this.ormRepository;

    const sale = repository.create(data);

    await repository.save(sale);
    return sale;
  }

  public async findAll(): Promise<ISales[]> {
    return this.ormRepository.find({
      relations: ['sale_items', 'sale_items'],
    });
  }

  public async findById(id: number): Promise<ISales | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['sale_items'],
    });
  }

  public async findByPeriod(startDate: Date, endDate: Date): Promise<ISales[]> {
    return this.ormRepository.find({
      where: {
        sale_date: Between(startDate, endDate),
      },
      relations: ['sale_items'],
    });
  }

  public async getTotalStockValue(): Promise<number> {
    const sales = await this.saleItemRepository
      .createQueryBuilder('sale_items')
      .select('SUM(sale_items.unit_price * sale_items.quantity)', 'total')
      .getRawOne();

    return Number(sales.total) || 0;
  }

  public async getTotalItemsSold(): Promise<number> {
    const result = await this.saleItemRepository
      .createQueryBuilder('sale_items')
      .select('SUM(sale_items.quantity)', 'total')
      .getRawOne();

    return Number(result.total) || 0;
  }

  public async getMostSoldProducts(): Promise<
    {
      product_id: number;
      name: string;
      total_sold: number;
    }[]
  > {
    const result = await this.saleItemRepository
      .createQueryBuilder('item')
      .select('item.product_id', 'product_id')
      .addSelect('p.name', 'name')
      .addSelect('SUM(item.quantity)', 'total_sold')
      .innerJoin('products', 'p', 'p.id = item.product_id')
      .groupBy('item.product_id')
      .addGroupBy('p.name')
      .orderBy('total_sold', 'DESC')
      .limit(3)
      .getRawMany();

    return result;
  }

  public async executeInTransaction<T>(
    // eslint-disable-next-line no-unused-vars
    callback: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await dataSource.transaction(async entityManager => {
      return await callback(entityManager);
    });
  }
}
