import { IProducts } from '@modules/products/domain/models/IProducts';

interface IStockMovements {
  id: number;
  product_id: number;
  type: 'in' | 'out';
  quantity: number;
  movement_date: Date;
  product?: IProducts;
}

export { IStockMovements };
