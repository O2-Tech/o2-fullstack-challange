import { IProducts } from '@modules/products/domain/models/IProducts';
import { ISales } from './ISales';

interface ISaleItems {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;

  sale?: ISales;
  product?: IProducts;
}

export { ISaleItems };
