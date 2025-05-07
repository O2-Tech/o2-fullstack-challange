import { Request, Response } from 'express';
import ListAllStockMovementsService from '@modules/stock/services/ListAllStockMovementsService';
import ShowStockMovementService from '@modules/stock/services/ShowStockMovementService';
import CreateStockMovementService from '@modules/stock/services/CreateStockMovementService';

export default class StockMovementController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = new ListAllStockMovementsService();
    const movements = await service.execute();

    return res.json({ success: true, movements });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new ShowStockMovementService();
    const movement = await service.execute(Number(id));

    return res.json({ success: true, movement });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { product_id, type, quantity } = req.body;

    const service = new CreateStockMovementService();
    await service.execute({ product_id, type, quantity });

    return res
      .status(201)
      .json({ success: true, message: 'Stock movement created successfully' });
  }
}
