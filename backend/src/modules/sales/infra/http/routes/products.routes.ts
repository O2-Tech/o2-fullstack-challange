import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

export default productsRouter;
