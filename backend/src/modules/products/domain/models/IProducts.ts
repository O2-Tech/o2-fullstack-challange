import { SaleItem } from '@modules/sales/infra/typeorm/entities/SalesItem.entity';
import { StockMovement } from '@modules/stock/infra/typeorm/entities/StockMovement.entity';

interface IProducts {
  id: number;
  name: string;
  description?: string;
  available_quantity: number;
  unit_price: number;
  category?: string;
  created_at: Date;

  stock_movements?: StockMovement[];
  sale_items?: SaleItem[];
}

export { IProducts };
