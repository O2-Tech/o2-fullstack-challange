import { ISalesRepository } from '../domain/repositories/ISalesRepository';
import SalesRepository from '../infra/typeorm/repositories/SalesRepository';

class ListSalesByPeriodService {
  private salesRepository: ISalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(startDate: string, endDate: string) {
    const startDateFormated = new Date(startDate);
    const endDateFormated = new Date(endDate);

    return this.salesRepository.findByPeriod(
      startDateFormated,
      endDateFormated,
    );
  }
}

export default ListSalesByPeriodService;
