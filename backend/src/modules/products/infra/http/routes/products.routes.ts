import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(255).required(),
      description: Joi.string().required().allow(null, ''),
      available_quantity: Joi.number().integer().min(0).required(),
      unit_price: Joi.number().precision(2).positive().required(),
      category: Joi.string().max(100).required().allow(null, ''),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().max(255).optional(),
      description: Joi.string().optional().allow(null, ''),
      available_quantity: Joi.number().optional().min(0).required(),
      unit_price: Joi.number().precision(2).positive().optional(),
      category: Joi.string().max(100).optional().allow(null, ''),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/delete/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
