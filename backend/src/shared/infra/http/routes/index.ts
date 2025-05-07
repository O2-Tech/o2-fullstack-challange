import { Router, Request, Response } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import stockRouter from '@modules/stock/infra/http/routes/stockMovement.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/stocks', stockRouter);
routes.use('/sales', salesRouter);

routes.get('/status', (request: Request, response: Response) => {
  return response.status(200).json({
    message: 'Welcome to o2-challange',
    version: 'v1.0.0',
    status: 'Server is ok.',
  });
});

export default routes;
