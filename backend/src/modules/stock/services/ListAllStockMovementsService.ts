import { IStockMovements } from '../domain/models/IStockMovement';
import { IStockRepository } from '../domain/repositories/IStockRepository';
import StockMovementRepository from '../infra/typeorm/repositories/StockMovementRepository';
import AppError from '@shared/errors/AppError';

class ListAllStockMovementsService {
  private stockRepository: IStockRepository;

  constructor() {
    this.stockRepository = new StockMovementRepository();
  }

  public async execute(): Promise<IStockMovements[]> {
    const movements = await this.stockRepository.findAll();

    if (movements.length === 0) {
      throw new AppError('There are no stock movements available!', 400);
    }

    return movements;
  }
}

export default ListAllStockMovementsService;
