import { ICreateSales } from '@modules/sales/domain/models/ICreateSale';
import CreateSaleService from '@modules/sales/services/CreateSalesService';
import GetMostSoldProductsService from '@modules/sales/services/GetMostSoldProductsService';
import GetTotalItemsSoldService from '@modules/sales/services/GetTotalItemsSoldService';
import GetTotalStockValueService from '@modules/sales/services/GetTotalStockValueService';
import ListSalesService from '@modules/sales/services/ListAllSalesService';
import ListSalesByPeriodService from '@modules/sales/services/ListSalesByPeriodService';
import ShowSaleService from '@modules/sales/services/ShowSalesSerivce';
import { Request, Response } from 'express';

export default class SalesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const saleData: ICreateSales = req.body;
    const createSaleService = new CreateSaleService();
    await createSaleService.execute(saleData);
    return res
      .status(201)
      .json({ success: true, message: 'Venda criada com sucesso.' });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listSalesService = new ListSalesService();
    const sales = await listSalesService.execute();
    return res.json({ success: true, sales });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showSaleService = new ShowSaleService();
    const sale = await showSaleService.execute(Number(id));
    return res.json({ success: true, sale });
  }

  public async findByPeriod(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate } = req.body;
    const listSalesByPeriodService = new ListSalesByPeriodService();
    const sales = await listSalesByPeriodService.execute(startDate, endDate);
    return res.json({ success: true, sales });
  }

  public async getTotalStockValue(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const getTotalStockValueService = new GetTotalStockValueService();
    const totalStockValue = await getTotalStockValueService.execute();
    return res.json({ success: true, totalStockValue });
  }

  public async getTotalItemsSold(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const getTotalItemsSoldService = new GetTotalItemsSoldService();
    const totalItemsSold = await getTotalItemsSoldService.execute();
    return res.json({ success: true, totalItemsSold });
  }

  public async getMostSoldProducts(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const getMostSoldProductsService = new GetMostSoldProductsService();
    const mostSoldProducts = await getMostSoldProductsService.execute();
    return res.json({ success: true, mostSoldProducts });
  }
}
