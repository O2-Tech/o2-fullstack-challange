import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SalesController from '../controllers/SalesController';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      sale_date: Joi.date().required(),
      sale_items: Joi.array()
        .items(
          Joi.object().keys({
            product_id: Joi.number().integer().positive().required(),
            quantity: Joi.number().integer().positive().required(),
            unit_price: Joi.number().precision(2).positive().required(),
          }),
        )
        .required(),
    }),
  }),
  salesController.create,
);

salesRouter.get('/', salesController.index);

salesRouter.get(
  '/show/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  salesController.show,
);

salesRouter.get(
  '/period',
  celebrate({
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  salesController.findByPeriod,
);

salesRouter.get('/total-stock-value', salesController.getTotalStockValue);

salesRouter.get('/total-items-sold', salesController.getTotalItemsSold);

salesRouter.get('/most-sold-products', salesController.getMostSoldProducts);

export default salesRouter;
