import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StockMovementController from '@modules/stock/infra/http/controllers/StockMovementController';

const stockRouter = Router();
const stockController = new StockMovementController();

stockRouter.get('/', stockController.index);

stockRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  stockController.show,
);

stockRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.number().integer().positive().required(),
      type: Joi.string().valid('in', 'out').required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  stockController.create,
);

export default stockRouter;
