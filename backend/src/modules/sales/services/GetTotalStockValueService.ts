import { ISalesRepository } from '../domain/repositories/ISalesRepository';
import SalesRepository from '../infra/typeorm/repositories/SalesRepository';

class GetTotalStockValueService {
  private salesRepository: ISalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute() {
    return this.salesRepository.getTotalStockValue();
  }
}

export default GetTotalStockValueService;
