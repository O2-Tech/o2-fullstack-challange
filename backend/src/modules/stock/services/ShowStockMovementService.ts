import { IStockMovements } from '../domain/models/IStockMovement';
import { IStockRepository } from '../domain/repositories/IStockRepository';
import StockMovementRepository from '../infra/typeorm/repositories/StockMovementRepository';
import AppError from '@shared/errors/AppError';

class ShowStockMovementService {
  private stockRepository: IStockRepository;

  constructor() {
    this.stockRepository = new StockMovementRepository();
  }

  public async execute(id: number): Promise<IStockMovements> {
    const movement = await this.stockRepository.findById(id);

    if (!movement) {
      throw new AppError('Stock movement not found!', 404);
    }

    return movement;
  }
}

export default ShowStockMovementService;
