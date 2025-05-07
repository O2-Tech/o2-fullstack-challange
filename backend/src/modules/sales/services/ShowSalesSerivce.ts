import AppError from '@shared/errors/AppError';
import { ISalesRepository } from '../domain/repositories/ISalesRepository';
import SalesRepository from '../infra/typeorm/repositories/SalesRepository';

class ShowSaleService {
  private salesRepository: ISalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(id: number) {
    const sale = await this.salesRepository.findById(id);
    if (!sale) {
      throw new AppError('Sale not found', 404);
    }
    return sale;
  }
}

export default ShowSaleService;
