import { Repository, EntityManager } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { StockMovement } from '../entities/StockMovement.entity';
import { IStockRepository } from '@modules/stock/domain/repositories/IStockRepository';
import { IStockMovements } from '@modules/stock/domain/models/IStockMovement';
import { ICreateStockMovement } from '@modules/stock/domain/models/ICreateStockMovement';

export default class StockMovementRepository implements IStockRepository {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = dataSource.getRepository(StockMovement);
  }

  public async findAll(): Promise<IStockMovements[]> {
    const movements = await this.ormRepository
      .createQueryBuilder('stock_movements')
      .leftJoinAndSelect('stock_movements.product', 'product')
      .getMany();

    return movements;
  }

  public async findById(id: number): Promise<IStockMovements | null> {
    return await this.ormRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  public async create(
    { product_id, type, quantity }: ICreateStockMovement,
    entityManager?: EntityManager,
  ): Promise<IStockMovements> {
    const repository = entityManager
      ? entityManager.getRepository(StockMovement)
      : this.ormRepository;

    const movement = repository.create({
      product_id,
      type,
      quantity,
    });

    await repository.save(movement);
    return movement;
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
