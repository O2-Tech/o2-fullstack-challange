import { ISalesRepository } from '../domain/repositories/ISalesRepository';
import SalesRepository from '../infra/typeorm/repositories/SalesRepository';

class GetTotalItemsSoldService {
  private salesRepository: ISalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute() {
    return this.salesRepository.getTotalItemsSold();
  }
}

export default GetTotalItemsSoldService;
