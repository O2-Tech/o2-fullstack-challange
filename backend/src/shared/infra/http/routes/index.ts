import { Router, Request, Response } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/status', (request: Request, response: Response) => {
  return response.status(200).json({
    message: 'Welcome to o2-challange',
    version: 'v1.0.0',
    status: 'Server is ok.',
  });
});

export default routes;
