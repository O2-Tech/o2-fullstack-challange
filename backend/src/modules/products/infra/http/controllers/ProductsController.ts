import { Request, Response } from 'express';
import ListAllProductsService from '@modules/products/services/ListAllProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ShowProductService from '@modules/products/services/ShowProductService.ts';
import CreateProductService from '@modules/products/services/CreateProductService.ts';

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = new ListAllProductsService();
    const products = await service.execute();
    return res.json({ success: true, products });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new ShowProductService();
    const product = await service.execute(Number(id));

    return res.json({ success: true, product });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, available_quantity, unit_price, category } =
      req.body;

    const service = new CreateProductService();
    const product = await service.execute({
      name,
      description,
      available_quantity,
      unit_price,
      category,
    });

    return res.json({ success: true, product });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, available_quantity, unit_price, category } =
      req.body;

    const idAsNumber = Number(id);

    const service = new UpdateProductService();
    const product = await service.execute({
      id: idAsNumber,
      name,
      description,
      available_quantity,
      unit_price,
      category,
    });

    return res.json({ success: true, product });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new DeleteProductService();
    await service.execute(Number(id));
    return res.json({ success: true });
  }
}
